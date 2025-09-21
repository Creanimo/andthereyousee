import Mustache from "mustache";
import ScreenComponent from "./ScreenComponent.js";

/**
 * @typedef {object} ComponentState
 * @property {boolean} isRendered - Whether the component has been rendered to the DOM.
 * @property {boolean} hasEventListeners - Whether event listeners have been attached.
 * @property {HTMLElement|null} domElement - The actual DOM element of the component.
 * @property {boolean} isMounted - Whether the component is currently in the DOM.
 */

/**
 * @typedef {object} ScreenComponentRegistryEntry
 * @property {string} id - The unique identifier of the component.
 * @property {targetContainerId} - The id of the container the html is rendered into
 * @property {ScreenComponent} instance - The actual Component class instance.
 * @property {ComponentState} state - The current state of the component.
 */

class Screen {
    /**
     * @private
     * @type {Map<string, ScreenComponentRegistryEntry>}
     */
    #componentRegistry = new Map();

    /** @type {string} */
    screenName;

    /** @type {ScreenComponent} */
    screenComponents;

    /**
     * @param {string} screenName 
     * @param {string} screenComponents 
     * @param {id: string, state: ComponentState}[]
     */
    constructor(
        screenName,
        screenComponents,
        componentRegistry,
    ) {
        this.screenName = screenName;
        this.screenComponents = screenComponents;
        this.componentRegistry = componentRegistry;
    }

    /**
     * Registers a new component with the screen.
     * @param {ScreenComponent} component - The component instance to register.
     */
    registerComponent(component, targetContainerId) {
        if (!(component instanceof ScreenComponent)) {
            throw new Error("Only instances of ScreenComponent can be registered.");
        }
        if (this.#componentRegistry.has(component.id)) {
            console.warn("Component with ID '${component.id}' already registered. Overwriting.");
        }

        this.#componentRegistry.set(component.id, {
            id: component.id,
            instance: component,
            targetContainerId: targetContainerId,
            state: {
                isRendered: false,
                hasEventListeners: false,
                domElement: null,
                isMounted: false,
            },
        });
    }

    /**
     * Retrieves a component registry entry by its ID.
     * @private
     * @param {string} componentId - The ID of the component.
     * @returns {ScreenComponentRegistryEntry|undefined} The component entry.
     */
    #getComponentEntry(componentId) {
        const entry = this.#componentRegistry.get(componentId);
        if (!entry) {
            console.error(`Component with ID '${componentId}' not found.`);
            return undefined;
        }
        return entry;
    }

    /**
     * Sets a specific container for a component.
     * @param {string} componentId - The ID of the component.
     * @param {string} targetContainerId - The ID of the DOM element to append to.
     */
    setComponentTargetContainer(componentId, targetContainerId) {
        this.#componentContainerMap.set(componentId, targetContainerId);
    }

    mountComponent(componentId) {
        const componentEntry = this.#getComponentEntry(componentId);
        const component = componentEntry.instance;
        const renderedLoadingHtml = component.renderLoading();
        this.replaceHtmlElementInContainer(componentEntry.targetContainerId, renderedLoadingHtml);
    }

    replaceHtmlElementInContainer(targetContainerId, htmlElement) {

    }

    clearContainer(id) {

    }

    /**
     * Activates event listeners for a specific component.
     * @param {string} componentId - The ID of the component.
     * @returns {boolean} True if listeners were activated, false otherwise.
     */
    activateComponentListeners(componentId) {
        const entry = this.#getComponentEntry(componentId);
        if (!entry) return false;

        if (!entry.state.isMounted || !entry.state.domElement) {
            console.warn(
                `Component '${componentId}' must be mounted before activating listeners.`,
            );
            return false;
        }
        if (entry.state.hasEventListeners) {
            console.log(`Listeners already active for component '${componentId}'.`);
            return true;
        }

        try {
            entry.instance.attachListeners(entry.state.domElement);
            entry.state.hasEventListeners = true;
            return true;
        } catch (error) {
            console.error(
                `Error activating listeners for component '${componentId}':`,
                error,
            );
            return false;
        }
    }

    attachEventListeners() {
        switch (scre) {
            case value:

                break;

            default:
                break;
        }
    }
}
