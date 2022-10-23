import { raw, ConstructorEl } from "../../tools/Components.js";
const { href, origin } = new URL('./', import.meta.url);
const img = origin + '/image/';
const template = raw `
<link rel="stylesheet" href="${href}head.css" />
<div class="head">
    <span class="txt"></span>
</div>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGl0bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvQ29tcG9uZW50cy9oZWFkL3RpdGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxHQUFHLEVBQUUsYUFBYSxFQUFLLE1BQU0sMkJBQTJCLENBQUM7QUFJbEUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN4RCxNQUFNLEdBQUcsR0FBRyxNQUFNLEdBQUcsU0FBUyxDQUFDO0FBRS9CLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQTsrQkFDVyxJQUFJOzs7O0NBSWxDLENBQUE7QUFFRCxNQUFNLE9BQU8sR0FBRyxhQUFhLENBQUMsRUFBRSxRQUFRLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQTtBQUV4RCxNQUFNLENBQUMsT0FBTyxNQUFPLFNBQVEsT0FBTztJQUNoQztRQUNJLEtBQUssRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVELE1BQU0sS0FBSyxrQkFBa0IsS0FBSyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25ELGlCQUFpQixLQUFLLENBQUM7SUFBQSxDQUFDO0lBQ3hCLG9CQUFvQixLQUFLLENBQUM7SUFBQSxDQUFDO0lBQzNCLGVBQWUsS0FBSyxDQUFDO0lBQUEsQ0FBQztJQUN0Qix3QkFBd0IsQ0FBQyxJQUFTLEVBQUUsSUFBUyxFQUFFLElBQVM7UUFDcEQsSUFBSSxJQUFJLElBQUksS0FBSyxFQUFFO1lBQ2YsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFFLENBQUM7WUFDaEQsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBQUEsQ0FBQztDQUNMIn0=