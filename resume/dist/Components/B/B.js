import { raw, ConstructorEl } from "../../tools/Components.js";
const { href, origin } = new URL('./', import.meta.url);
const img = origin + '/image/';
const src = origin + '/src/';
const template = raw `
<span id="B">
    <slot></slot>
</span>
<style>
#B {
  font-weight: 600;
  font-size: 1.05em;
}
</style>
`;
const ElClass = ConstructorEl({ template }, HTMLElement);
export default ElClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Db21wb25lbnRzL0IvQi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsR0FBRyxFQUFFLGFBQWEsRUFBSyxNQUFNLDJCQUEyQixDQUFDO0FBSWxFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDeEQsTUFBTSxHQUFHLEdBQUcsTUFBTSxHQUFHLFNBQVMsQ0FBQztBQUMvQixNQUFNLEdBQUcsR0FBRyxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBRTdCLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7OztDQVVuQixDQUFBO0FBRUQsTUFBTSxPQUFPLEdBQUcsYUFBYSxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUE7QUFDeEQsZUFBZSxPQUFPLENBQUMifQ==