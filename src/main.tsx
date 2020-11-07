import { virtualElement } from "./core/Element";
import { updateElement } from "./core/Renderer";

export const vdom = (
  <div>
    hi <p>Hello</p>
  </div>
);

console.log(vdom);

updateElement(document.getElementById("app")!, vdom, undefined, 0);
