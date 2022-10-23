import { raw, ConstructorEl } from "../../tools/Components.js";
const { href, origin } = new URL('./', import.meta.url);
const img = origin + '/image/';
const src = origin + '/src/';
const template = raw `
<span id="B">
    <solt></solt>
</span>
<style>
#B {
  font-weight: 600;
  font-size: 1.05em;
}
</style>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sMS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Db21wb25lbnRzL0IvY29sMS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsR0FBRyxFQUFFLGFBQWEsRUFBSyxNQUFNLDJCQUEyQixDQUFDO0FBSWxFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDeEQsTUFBTSxHQUFHLEdBQUcsTUFBTSxHQUFHLFNBQVMsQ0FBQztBQUMvQixNQUFNLEdBQUcsR0FBRyxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBRTdCLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7OztDQVVuQixDQUFBO0FBRUQsTUFBTSxPQUFPLEdBQUcsYUFBYSxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUE7QUFFeEQsTUFBTSxDQUFDLE9BQU8sTUFBTyxTQUFRLE9BQU87SUFDaEM7UUFDSSxLQUFLLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRCxNQUFNLEtBQUssa0JBQWtCLEtBQUssT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuRCxpQkFBaUIsS0FBSyxDQUFDO0lBQUEsQ0FBQztJQUN4QixvQkFBb0IsS0FBSyxDQUFDO0lBQUEsQ0FBQztJQUMzQixlQUFlLEtBQUssQ0FBQztJQUFBLENBQUM7SUFDdEIsd0JBQXdCLENBQUMsSUFBUyxFQUFFLElBQVMsRUFBRSxJQUFTO1FBQ3BELElBQUksSUFBSSxJQUFJLEtBQUssRUFBRTtZQUNmLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQy9DLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ3hCO0lBQ0wsQ0FBQztJQUFBLENBQUM7Q0FDTCJ9