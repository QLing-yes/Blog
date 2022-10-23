import { raw, ConstructorEl, h } from "../../tools/Components.js";
import type { cycleEl } from "../../tools/Components.js";
import { ref } from "../../tools/tools.js";

const { href, origin } = new URL('./', import.meta.url);
const img = origin + '/image/';
const src = origin + '/src/';

const template = raw`
<link rel="stylesheet" href="${href}index.css" />
<el-title txt="专业技术"></el-title>
<ul>
    <li>熟练</li>
    <ol>
        <li>
            原生
            <span id="B">HTML, CSS, JavaScript, TypeScript</span>
            进行原生
            <span id="B">组件化和响应式</span>
            页面开发.
        </li>

        <li>
            使用
            <span id="B">uniapp(nvue)</span>
            开发
            <span id="B">微信小程序,Android,IOS</span>
            应用程序
        </li>
    </ol>

    <li>熟悉</li>
    <ol>
        <li>
            <span id="B">Vue2/3, Vuex,Vite, VueRouter</span>
            进行组件化开发.
        </li>
        <li>
            <span id="B">axios, fetch</span>
            等基于Promise的http库
        </li>
        <li>
            <span id="B">Element-ui</span> 库
        </li>
    </ol>
    <li>了解</li>
    <ol>
        <li>
            <span id="B">NodeJS, MongoDB, TSRPC, NestJS, Express</span>
            等进行后端服务开发
        </li>
        <li>CSharp</li>
    </ol>
</ul>
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
