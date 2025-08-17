import { immerable } from  "../../node_modules/immer/dist/immer.production.mjs";

export default class AppScreenComponent {
    [immerable] = true;

    constructor({
        name,
        renderedElement = null,
    }) {
        this.name = name;
    }
}
