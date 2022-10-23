import { raw, ConstructorEl, h } from "../../tools/Components.js";
import type { cycleEl } from "../../tools/Components.js";
import { ref } from "../../tools/tools.js";

const { href, origin } = new URL('./', import.meta.url);
const img = origin + '/image/';

const template = raw`
<link rel="stylesheet" href="${href}head.css" />
<div class="head">
    <div class="col">
        <span class="name">
            <slot name="name">name</slot>
        </span>
        <span class="Intention">
            <slot name="Intention">Intention</slot>
        </span>
    </div>
    <div class="col flex1">
        <slot>default</slot>
    </div>
    <div class="col">
        <div class="portrait">
            <slot nam="img">img</slot>
        </div>
    </div>
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
            const txt = this._shadow.querySelector(".txt")!;
            txt.innerHTML = newV;
        }
    };
}
