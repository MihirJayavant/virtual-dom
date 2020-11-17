import { updateElement2 } from "./core/VirtualDom";
import { Columns } from "./components/Columns";

const app = document.getElementById("app")!;
const btn = document.getElementById("add_btn")!;

let toggle = false;
const arr: number[] = [1];
let list = Columns({ list: arr });

const arrProxy = new Proxy(arr, {
  get: function (target, key, context) {
    if (key === "push") {
      return (value: number) => {
        target.push(value);
        const list2 = Columns({ list: target });
        updateElement2(app, list2, list);
        list = list2;
        return value;
      };
    }
    return target[key];
  },
});

updateElement2(app, list, undefined);

btn.addEventListener("click", () => {
  arrProxy.push(1);
});
