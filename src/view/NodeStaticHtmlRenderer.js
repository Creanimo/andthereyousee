import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Mustache from "mustache";
import {
  Roarr as log,
} from 'roarr';

async function main() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const sourceDataDir = path.join(__dirname, "..", "data");
    const outDir = path.join(__dirname, "..", "..", "dist");

    const pageStructureBlueprintPath = path.join(sourceDataDir, "pageStructure.json");    
    const pageStructureBlueprintData = await fs.readFile(pageStructureBlueprintPath, "utf8");
    const pageStructureBlueprint = JSON.parse(pageStructureBlueprintData)
    log.info(pageStructureBlueprint);
}
main().catch((err) => {
  log.error(err);
  process.exitCode = 1;
});
