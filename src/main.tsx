import { updateElement } from "./core/VirtualDom";
import { Columns } from "./components/Columns";
import { Card } from "./components/Card";
import { List } from "./components/List";
import { virtualElement } from "./core/Element";

const app = document.getElementById("app")!;
const btn = document.getElementById("add_btn")!;

const arr: number[] = [1];
let list = Columns({ list: arr });

const arrProxy = new Proxy(arr, {
  get: function (target, key, context) {
    if (key === "push") {
      return (value: number) => {
        target.push(value);
        const list2 = Columns({ list: target });
        updateElement({
          parent: app,
          newNode: list2,
          oldNode: list,
          index: 0,
        });
        list = list2;
        return value;
      };
    }
    return target[key];
  },
});

updateElement({ parent: app, newNode: list, index: 0 });

btn.addEventListener("click", () => {
  arrProxy.push(1);
});

const app2 = document.getElementById("app2") as ChildNode;
const btn2 = document.getElementById("toggle_btn");
let toggle = false;

const panel = <List />;
const card = <Card />;

updateElement({ parent: app2, newNode: card, index: 0 });

btn2?.addEventListener("click", () => {
  toggle = !toggle;
  if (toggle)
    updateElement({ parent: app2, newNode: panel, oldNode: card, index: 0 });
  else updateElement({ parent: app2, newNode: card, oldNode: panel, index: 0 });
});
