export type INode = IElement | ITextElement;

export enum ElementType {
  TextNode,
  ElementNode,
}

export interface ITextElement {
  elementType: ElementType.TextNode;
  value: string;
}

export interface IElement {
  elementType: ElementType.ElementNode;
  type: string;
  props: any;
  children: INode[];
}

function elementObj(node: IElement | string): INode {
  if (typeof node === "string") {
    return { elementType: ElementType.TextNode, value: node };
  }
  return node;
}

export function virtualElement(
  tagName: string,
  attributes: any,
  ...children: any[]
): any {
  console.log({ tagName, attributes, children });

  return {
    elementType: ElementType.ElementNode,
    props: attributes,
    children: children.map(elementObj),
    type: tagName,
  };
}
