import { immerable } from  "../../node_modules/immer/dist/immer.production.mjs";

export default class AppScreen {
    [immerable] = true;

    constructor({
        name,
        content,
        header = null,
        menu = null,
        sidebar = null,
        footer = null,
        renderedScreen = null,
    }) {
        this.name = name;
    }
}
