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
  if (typeof node === "string" || typeof node === "number") {
    return { elementType: ElementType.TextNode, value: node };
  }
  return node;
}

export function virtualElement(
  tagName: string,
  attributes: any,
  ...children: (IElement | string)[]
): any {
  const childList: (IElement | string)[] = [];

  for (const child of children) {
    if (Array.isArray(child)) {
      childList.push(...child);
    } else {
      childList.push(child);
    }
  }

  return {
    elementType: ElementType.ElementNode,
    props: attributes,
    children: childList.map(elementObj),
    type: tagName,
  };
}
