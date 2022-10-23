import { raw, ConstructorEl, h } from "../../tools/Components.js";
import type { cycleEl } from "../../tools/Components.js";
import { ref } from "../../tools/tools.js";

const { href, origin } = new URL('./', import.meta.url);
const img = origin + '/image/';
const src = origin + '/src/';

const template = raw`
<span id="B">
    <slot></slot>
</span>
<style>
#B {
  font-weight: 600;
  font-size: 1.05em;
}
</style>
`

const ElClass = ConstructorEl({ template }, HTMLElement)
export default ElClass;