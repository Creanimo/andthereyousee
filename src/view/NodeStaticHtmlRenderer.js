import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Mustache from "mustache";
import Layout from "./Layout";

async function main() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const sourceDataDir = path.join(__dirname, "..", "data");
    const outDir = path.join(__dirname, "..", "..", "dist");

    const
    
}
