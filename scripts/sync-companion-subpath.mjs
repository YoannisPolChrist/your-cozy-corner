import fs from "node:fs/promises";
import path from "node:path";
import { existsSync } from "node:fs";
import { execSync } from "node:child_process";

const repoRoot = process.cwd();
const destination = path.join(repoRoot, "dist", "Prozessbegleitung");

const companionCandidates = [
  process.env.COMPANION_APP_PATH,
  "C:\\Users\\psjoh\\Desktop\\Personal\\Coding\\Apps\\kind-minds-companion-main",
  "C:\\Users\\psjoh\\Desktop\\Personal\\Coding\\Apps\\kind-minds-companion-gitpush-0322",
].filter(Boolean);

function resolveCompanionRoot() {
  const companionRoot = companionCandidates.find((candidate) =>
    existsSync(path.join(candidate, "package.json"))
  );

  if (!companionRoot) {
    throw new Error("Companion app not found. Set COMPANION_APP_PATH to the kind-minds-companion repo.");
  }

  return companionRoot;
}

async function copyDirectory(source, target) {
  await fs.mkdir(target, { recursive: true });
  const entries = await fs.readdir(source, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(sourcePath, targetPath);
      continue;
    }

    await fs.copyFile(sourcePath, targetPath);
  }
}

async function main() {
  const companionRoot = resolveCompanionRoot();
  execSync("npm run build", { cwd: companionRoot, stdio: "inherit" });

  const companionDist = path.join(companionRoot, "dist", "Prozessbegleitung");
  if (!existsSync(path.join(companionDist, "index.html"))) {
    throw new Error(`Companion build missing at ${companionDist}`);
  }

  await fs.rm(destination, { recursive: true, force: true });
  await copyDirectory(companionDist, destination);
  console.log(`Synced companion app from ${companionRoot} to ${destination}`);
}

void main();
