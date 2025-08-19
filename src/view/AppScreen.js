import { immerable } from  "../../node_modules/immer/dist/immer.production.mjs";
import Layout from "./Layout";

export default class AppScreen {
    [immerable] = true;

    /**
    * @param {Object} param0 
    * @param {string} param0.name 
    * @param {Layout} param0.layout 
    * @param {String} param0.mainContent 
    * @param {String} param0.contentSlotName 
    */
    constructor({
        name,
        layout,
        mainContent = "<div>placeholder</div>",
        contentSlotName = layout.contentSlotName,
    }) {
        this.name = name;
    }
}

// Todo: Let ScreenFactory build all screens from json
