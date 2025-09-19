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

    let menuData = { menuEntries: [] };
    for (const page of pageStructureBlueprint.pages) {
        if (page.showInMainMenu) {
            menuData.menuEntries.push({ label: page.name, link: page.path })
        }
    }
    log.info(menuData, "Main menu items extracted from pages.");

    const menuPath = path.join(sourceDataDir, pageStructureBlueprint.layoutElements.mainMenu);
    const layoutPath = path.join(sourceDataDir, pageStructureBlueprint.layoutElements.mainLayout)
    const [layoutTpl, menuTpl] = await Promise.all([
        fs.readFile(layoutPath, "utf8"),
        fs.readFile(menuPath, "utf8"),
    ]);

    for (const page of pageStructureBlueprint.pages) {
        log.info(page);
        const contentData = {
            ...menuData,
            mainContent: '<h1>placeholder</h1>',
        }
        const html = Mustache.render(
            layoutTpl, contentData,
            {
                mainMenu: menuTpl,
            }
        )
        log.info("Here:" + html);
    }
}
main().catch((err) => {
    log.error(err.toString());
    process.exitCode = 1;
});
