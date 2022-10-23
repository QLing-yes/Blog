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
    static get observedAttributes() { return ['']; }
    connectedCallback() { }
    ;
    disconnectedCallback() { }
    ;
    adoptedCallback() { }
    ;
    attributeChangedCallback(name, oldV, newV) {
    }
    ;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sMS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Db21wb25lbnRzL2NvbDEgY29weS9jb2wxLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxHQUFHLEVBQUUsYUFBYSxFQUFLLE1BQU0sMkJBQTJCLENBQUM7QUFJbEUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN4RCxNQUFNLEdBQUcsR0FBRyxNQUFNLEdBQUcsU0FBUyxDQUFDO0FBQy9CLE1BQU0sR0FBRyxHQUFHLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFFN0IsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFBOytCQUNXLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQTZDbEMsQ0FBQTtBQUVELE1BQU0sT0FBTyxHQUFHLGFBQWEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFBO0FBRXhELE1BQU0sQ0FBQyxPQUFPLE1BQU8sU0FBUSxPQUFPO0lBQ2hDO1FBQ0ksS0FBSyxFQUFFLENBQUM7SUFDWixDQUFDO0lBRUQsTUFBTSxLQUFLLGtCQUFrQixLQUFLLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEQsaUJBQWlCLEtBQUssQ0FBQztJQUFBLENBQUM7SUFDeEIsb0JBQW9CLEtBQUssQ0FBQztJQUFBLENBQUM7SUFDM0IsZUFBZSxLQUFLLENBQUM7SUFBQSxDQUFDO0lBQ3RCLHdCQUF3QixDQUFDLElBQVMsRUFBRSxJQUFTLEVBQUUsSUFBUztJQUN4RCxDQUFDO0lBQUEsQ0FBQztDQUNMIn0=