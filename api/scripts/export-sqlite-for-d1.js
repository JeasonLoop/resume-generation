import fs from "fs/promises";
import path from "path";
import sqlite3 from "sqlite3";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDb = process.env.DATABASE_PATH || path.join(__dirname, "../../database.sqlite");
const outputPath = process.env.EXPORT_SQL_PATH || path.join(__dirname, "../../api-worker/migrations/9000_import_from_sqlite.sql");

const db = new sqlite3.Database(sourceDb);

const TABLES = [
  "users",
  "templates",
  "resumes",
  "resume_versions",
  "token_blacklist",
  "verification_codes",
];

const queryAll = (sql) =>
  new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });

const escapeValue = (value) => {
  if (value === null || value === undefined) return "NULL";
  if (typeof value === "number") return `${value}`;
  if (typeof value === "boolean") return value ? "1" : "0";
  return `'${String(value).replace(/'/g, "''")}'`;
};

const buildInsert = (table, row) => {
  const columns = Object.keys(row);
  const values = columns.map((column) => escapeValue(row[column]));
  return `INSERT INTO ${table} (${columns.join(", ")}) VALUES (${values.join(", ")});`;
};

const normalizeRowsForForeignKeys = (tableRows) => {
  const users = tableRows.users ?? [];
  const templates = tableRows.templates ?? [];
  const resumes = tableRows.resumes ?? [];
  const resumeVersions = tableRows.resume_versions ?? [];

  const userIds = new Set(users.map((row) => row.id));
  const templateIds = new Set(templates.map((row) => row.id));

  const validResumes = resumes.filter((row) => {
    const hasUser = userIds.has(row.user_id);
    const hasTemplate = row.template_id === null || row.template_id === undefined || templateIds.has(row.template_id);
    return hasUser && hasTemplate;
  });
  const resumeIds = new Set(validResumes.map((row) => row.id));

  const validResumeVersions = resumeVersions.filter((row) => {
    const hasResume = resumeIds.has(row.resume_id);
    const hasTemplate = row.template_id === null || row.template_id === undefined || templateIds.has(row.template_id);
    return hasResume && hasTemplate;
  });

  const droppedResumes = resumes.length - validResumes.length;
  const droppedVersions = resumeVersions.length - validResumeVersions.length;
  if (droppedResumes > 0 || droppedVersions > 0) {
    console.warn(`[export:d1] Filtered orphan records: resumes=${droppedResumes}, resume_versions=${droppedVersions}`);
  }

  return {
    ...tableRows,
    resumes: validResumes,
    resume_versions: validResumeVersions,
  };
};

const main = async () => {
  try {
    const lines = [
      "-- Auto-generated from SQLite by api/scripts/export-sqlite-for-d1.js",
      "-- Import command example:",
      "-- wrangler d1 execute resume_generation --remote --file ./migrations/9000_import_from_sqlite.sql",
      "",
    ];

    const rawTableRows = {};
    for (const table of TABLES) {
      let rows = [];
      try {
        rows = await queryAll(`SELECT * FROM ${table}`);
      } catch {
        rows = [];
      }
      rawTableRows[table] = rows;
    }

    const tableRows = normalizeRowsForForeignKeys(rawTableRows);

    for (const table of TABLES) {
      const rows = tableRows[table] ?? [];
      if (rows.length === 0) continue;

      lines.push(`-- ${table}: ${rows.length} rows`);
      for (const row of rows) {
        lines.push(buildInsert(table, row));
      }
      lines.push("");
    }

    lines.push("");

    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, lines.join("\n"), "utf-8");

    console.log(`Export completed: ${outputPath}`);
  } catch (error) {
    console.error("Export failed:", error);
    process.exitCode = 1;
  } finally {
    db.close();
  }
};

main();
