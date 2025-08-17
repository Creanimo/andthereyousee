/**
 * Convert a html string to DOM
 * @param {string} htmlString 
 * @returns {Node}
 */
function htmlStringToElement(htmlString) {
    const template = document.createElement('template');
    template.innerHTML = htmlString.trim();
    const element = template.content.firstChild;
    return element;
}

export { htmlStringToElement }
