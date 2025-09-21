import { immerable, produce } from  "../../node_modules/immer/dist/immer.production.mjs";

/**
 * @typedef {"categoryGrid"} ComponentTypes
 */

export default class ScreenComponent {
    [immerable] = true;
    
    /** @type {string} */
    id;

    /** @type {ComponentTypes} */
    componentType;

    /** @type {string} */
    templatePath;

    /** @type {string} */
    loadingTemplatePath;

    /** @type {HTMLElement} */
    htmlElement;
    
    /** @type {string} */
    targetContainerId;

    /** @type {{}} */
    contentData;

    constructor({
        id,
        componentType,
        templatePath,
        loadingTemplatePath,
        contentData,
    }) {
        this.id = id;
        this.componentType = componentType;
        this.templatePath = templatePath;
        this.loadingTemplatePath = loadingTemplatePath;
        this.contentData = contentData;
    }
    /**
     * Updates properties by giving back a new immutable clone
     * @param {{}} updates
     * @returns {this}
     * @private
     */
    #withUpdate(updates) {
        return produce(this, draft => {
            Object.assign(draft, updates)
        })
    }

    /**
     * @param {string} id
     * @returns {this}
     */
    withid(id) {
        return this.#withUpdate({id});
    }
    
    /**
     * @param {{}} contentData
     * @returns {this}
     */
    withContentData(contentData) {
        return this.#withUpdate({contentData});
    }

    render() {

    }

    renderLoading() {

    }

    attachListeners(domElement) {

    }
}
