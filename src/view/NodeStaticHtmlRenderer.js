import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Mustache from "mustache";
import {
    Roarr as log,
} from 'roarr';

async function main() {
    log.debug("Constructing base paths...");
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const sourceDataDir = path.join(__dirname, "..", "data");
    const outDir = path.join(__dirname, "..", "..", "dist");

    log.debug(`Attempting to clean output directory: ${outDir}`);
    try {
        await fs.rm(outDir, { recursive: true, force: true });
        log.info("Output directory cleaned successfully.");
    } catch (error) {
        if (error.code === 'ENOENT') {
            log.info("Output directory did not exist, no cleanup needed.");
        } else {
            log.error(`Failed to clean output directory: ${error.message}`);
        }
    }

    log.info("Creating output directory...")
    await fs.mkdir(outDir, { recursive: true });

    log.info("Moving mustache templates to ./dist, so the client can later use them too.")
    try {
        await fs.cp(path.join(sourceDataDir, "templates/"), path.join(outDir, "templates/"), { recursive: true });
        log.info("Mustache templates copied successfully.");
    } catch (error) {
        log.error(`Failed to copy templates: ${error.message}`);
        process.exit(1);
    }

    log.info("Opening pageStructure.json...")
    const pageStructureBlueprintPath = path.join(sourceDataDir, "pageStructure.json");
    const pageStructureBlueprintData = await fs.readFile(pageStructureBlueprintPath, "utf8");
    const pageStructureBlueprint = JSON.parse(pageStructureBlueprintData)

    log.debug("Checking json structure...");
    if (
        !pageStructureBlueprint.layoutElements
        || !pageStructureBlueprint.layoutElements.mainMenu
        || !pageStructureBlueprint.layoutElements.mainLayout
        || !pageStructureBlueprint.pages
    ) {
        log.error("Missing important keys in pageStructure.json. Please check if 'layoutElements' and 'pages' are set.")
        process.exit(1);
    }

    log.info("Constructing main menu data...")
    let menuData = { menuEntries: [] };
    for (const page of pageStructureBlueprint.pages) {
        if (page.showInMainMenu) {
            menuData.menuEntries.push({ label: page.name, link: page.path })
        }
    }
    log.debug(menuData, "Main menu items collected:");

    log.info("Opening mainMenu and mainLayout templates...")
    const menuPath = path.join(sourceDataDir, pageStructureBlueprint.layoutElements.mainMenu);
    const layoutPath = path.join(sourceDataDir, pageStructureBlueprint.layoutElements.mainLayout)
    const [layoutTpl, menuTpl] = await Promise.all([
        fs.readFile(layoutPath, "utf8"),
        fs.readFile(menuPath, "utf8")
    ]);

    for (const page of pageStructureBlueprint.pages) {
        log.info("Rendering page '" + page.name + "'...");
        const mainTplPath = path.join(sourceDataDir, page.template);
        const mainTpl = await fs.readFile(mainTplPath, "utf8");

        // Calculate nesting depth for the current page
        // Example: "index.html" -> 0
        //          "prompt/reply.html" -> 1
        const pageNestingDepth = page.path.split('/').length - 1;
        const pathToRoot = '../'.repeat(pageNestingDepth);
        let currentPageMenuData = { menuEntries: [] };
        for (const menuItem of menuData.menuEntries) {
            currentPageMenuData.menuEntries.push({
                label: menuItem.label,
                link: pathToRoot + menuItem.link
            });
        }

        const contentData = {
            ...currentPageMenuData, // Use the dynamically adjusted menu data
            ...page.templateContent,
        }

        const html = Mustache.render(
            layoutTpl, contentData,
            {
                mainMenu: menuTpl,
                mainContent: mainTpl,
            }
        )

        log.debug("Writing...");
        const outputPath = path.join(outDir, page.path);
        const outputDir = path.dirname(outputPath);
        await fs.mkdir(outputDir, { recursive: true });
        await fs.writeFile(outputPath, html, "utf8");
        log.info(`Page '${page.name}' written to ${outputPath}`);
    }
}
main().catch((err) => {
    log.error(err.message);
    process.exitCode = 1;
});
