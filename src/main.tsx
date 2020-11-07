import { virtualElement } from "./core/Element";
import { updateElement } from "./core/Renderer";
import { Card } from "./components/Card";
import { List } from "./components/List";

const card = Card();
const list = List();

console.log(card);
console.log(list);

const app = document.getElementById("app")!;
const btn = document.getElementById("toggle_btn")!;

let toggle = false;

updateElement(app, card, undefined);

btn.addEventListener("click", () => {
  toggle = !toggle;

  console.log(card);
  console.log(list);

  if (toggle) {
    updateElement(app, list, card);
  } else {
    updateElement(app, card, list);
  }
});
