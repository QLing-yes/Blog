import { raw, ConstructorEl, h } from "../../tools/Components.js";
import type { cycleEl } from "../../tools/Components.js";
import { ref } from "../../tools/tools.js";

const { href, origin } = new URL('./', import.meta.url);
const img = origin + '/image/';

const template = raw`
<link rel="stylesheet" href="${href}title.css" />
<div class="title">
    <span class="txt"></span>
</div>
`

const ElClass = ConstructorEl({ template }, HTMLElement)

export default class extends ElClass implements cycleEl {
    constructor() {
        super();
    }

    static get observedAttributes() { return ['txt']; }
    connectedCallback() { };
    disconnectedCallback() { };
    adoptedCallback() { };
    attributeChangedCallback(name: any, oldV: any, newV: any) {
        if (name == 'txt') {
            const txt = this._shadow.querySelector(".txt");
            txt.innerHTML = newV;
        }
    };
}
