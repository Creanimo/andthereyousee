# Prompt Practice App

## Build

### Static Pages

To generate the static html pages, a data folder needs to include a `src/data/pageStructure.json`.

This builds the pages with logging enabled executed from the root directory:
```bash
ROARR_LOG=true node src/view/NodeStaticHtmlRenderer.js | npx roarr pretty-print
```
