import { INode, virtualElement } from "../core/Element";

interface IProp {
  list: number[];
}

export function Columns(props: IProp): INode {
  return (
    <div className="columns is-multiline">
      {props.list.map((p, i) => (
        <div className="column is-3">
          <button className="button is-primary">{`Column ${i}`}</button>
        </div>
      ))}
    </div>
  );
}
