import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

const loadEnvFile = (filePath, { override = false } = {}) => {
  if (!existsSync(filePath)) return;

  const content = readFileSync(filePath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const equalIndex = trimmed.indexOf("=");
    if (equalIndex === -1) continue;

    const key = trimmed.slice(0, equalIndex).trim();
    let value = trimmed.slice(equalIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (override || !process.env[key]) {
      process.env[key] = value;
    }
  }
};

loadEnvFile(".env");
loadEnvFile(".env.production", { override: true });

const defaultProjectName = "resume-generation-web";
const projectName = process.env.CF_PAGES_PROJECT_NAME || defaultProjectName;
if (!process.env.CF_PAGES_PROJECT_NAME) {
  console.log(`CF_PAGES_PROJECT_NAME not set, using default: ${defaultProjectName}`);
}

const run = (command, args) => {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: true,
    env: process.env,
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
};

run("npm", ["run", "build"]);
run("npx", ["wrangler", "pages", "deploy", "dist", "--project-name", projectName]);

