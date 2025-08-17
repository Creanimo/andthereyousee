import { marked } from "marked";
import DOMPurify from "dompurify";

class MarkdownRenderer {
    /**
    * @param {string} markdown
    * @returns {string} rendered html
    */
    async renderHtml(markdown) {
        return DOMPurify.sanitize(await marked.parse(markdown));
    }
}

const markdownRenderer = new MarkdownRenderer;
export { markdownRenderer };
