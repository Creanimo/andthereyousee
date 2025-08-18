import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Mustache from "mustache";

async function main() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const dataDir = path.join(__dirname, "data");
  const outDir = path.resolve(__dirname, "..", "dist");

  const layoutPath = path.join(dataDir, "templates", "layout.mustache");
  const menuPath = path.join(dataDir, "templates", "mainMenu.mustache");
  const menuDataPath = path.join(dataDir, "menuEntries.json");

  const [layoutTpl, menuTpl, menuJson] = await Promise.all([
    fs.readFile(layoutPath, "utf8"),
    fs.readFile(menuPath, "utf8"),
    fs.readFile(menuDataPath, "utf8"),
  ]);

  const menuData = JSON.parse(menuJson);

  const view = {
    ...menuData,
    mainContent:
      '<section><h1>Overview</h1><p>Coming soon…</p></section>',
  };

  const html = Mustache.render(
        layoutTpl, view, {
            mainMenu: menuTpl,
  });

  // Write dist/index.html
  await fs.mkdir(outDir, { recursive: true });
  const outFile = path.join(outDir, "index.html");
  await fs.writeFile(outFile, html, "utf8");

  console.log(`Wrote ${outFile}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
