import { raw, ConstructorEl } from "../../tools/Components.js";
const { href, origin } = new URL('./', import.meta.url);
const img = origin + '/image/';
const src = origin + '/src/';
const template = raw `
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
`;
const ElClass = ConstructorEl({ template }, HTMLElement);
export default class extends ElClass {
    constructor() {
        super();
    }
    static get observedAttributes() { return ['txt']; }
    connectedCallback() { }
    ;
    disconnectedCallback() { }
    ;
    adoptedCallback() { }
    ;
    attributeChangedCallback(name, oldV, newV) {
        if (name == 'txt') {
            const txt = this._shadow.querySelector(".txt");
            txt.innerHTML = newV;
        }
    }
    ;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sMS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Db21wb25lbnRzL2NvbDEvY29sMS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsR0FBRyxFQUFFLGFBQWEsRUFBSyxNQUFNLDJCQUEyQixDQUFDO0FBSWxFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDeEQsTUFBTSxHQUFHLEdBQUcsTUFBTSxHQUFHLFNBQVMsQ0FBQztBQUMvQixNQUFNLEdBQUcsR0FBRyxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBRTdCLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQTsrQkFDVyxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0E2Q2xDLENBQUE7QUFFRCxNQUFNLE9BQU8sR0FBRyxhQUFhLENBQUMsRUFBRSxRQUFRLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQTtBQUV4RCxNQUFNLENBQUMsT0FBTyxNQUFPLFNBQVEsT0FBTztJQUNoQztRQUNJLEtBQUssRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVELE1BQU0sS0FBSyxrQkFBa0IsS0FBSyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25ELGlCQUFpQixLQUFLLENBQUM7SUFBQSxDQUFDO0lBQ3hCLG9CQUFvQixLQUFLLENBQUM7SUFBQSxDQUFDO0lBQzNCLGVBQWUsS0FBSyxDQUFDO0lBQUEsQ0FBQztJQUN0Qix3QkFBd0IsQ0FBQyxJQUFTLEVBQUUsSUFBUyxFQUFFLElBQVM7UUFDcEQsSUFBSSxJQUFJLElBQUksS0FBSyxFQUFFO1lBQ2YsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDL0MsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBQUEsQ0FBQztDQUNMIn0=