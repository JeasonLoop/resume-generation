import { spawnSync } from "node:child_process";

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

