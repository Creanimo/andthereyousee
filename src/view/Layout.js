import { immerable } from  "../../node_modules/immer/dist/immer.production.mjs";

export default class Layout {
    [immerable] = true;

    constructor({
        name,
        templatePath = "data/templates/layout.mustache",
        menuEntriesData = "data/menuEntries.json"
    }) {
        this.name = name;
        this.contentPartial = null;
        this.templatePath = templatePath;
        this.menuEntriesData = menuEntriesData;
        this.contentSlotName = "mainContent";
    }

    /**
     * Updates properties by giving back a new immutable clone
     * @param {{}} updates
     * @returns {this}
     * @private
     */
    _withUpdate(updates) {
        return produce(this, draft => {
            Object.assign(draft, updates)
        })
    }

    withName(name) {
        return this._withUpdate({name});
    }

    withContentPartial(contentPartial) {
        return this._withUpdate({contentPartial})
    }

    withTemplatePath(templatePath) {
        return this._withUpdate({templatePath});
    }

    withMenuEntriesData(menuEntriesData) {
        return this._withUpdate({menuEntriesData});
    }

    withContentSlotName(contentSlotName) {
        return this._withUpdate({contentSlotName});
    }
}
