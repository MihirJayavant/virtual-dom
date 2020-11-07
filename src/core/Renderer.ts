import { INode, IElement, ElementType, ITextElement } from "./Element";

export function createElement(node: INode) {
  if (node.elementType == ElementType.TextNode) {
    return document.createTextNode(node.value);
  }

  const $el = document.createElement(node.type);
  setProps($el, node.props);
  node.children.map(createElement).forEach($el.appendChild.bind($el));
  return $el;
}

function isCustomProp(name: string) {
  return false;
}

function setBooleanProp($target: HTMLElement, name: string, value: string) {
  if (value) {
    $target.setAttribute(name, value);
    $target[name] = true;
  } else {
    $target[name] = false;
  }
}

function removeBooleanProp($target: HTMLElement, name: string) {
  $target.removeAttribute(name);
  $target[name] = false;
}

function removeProp($target: HTMLElement, name: string, value: string) {
  if (isCustomProp(name)) {
    return;
  } else if (name === "className") {
    $target.removeAttribute("class");
  } else if (typeof value === "boolean") {
    removeBooleanProp($target, name);
  } else {
    $target.removeAttribute(name);
  }
}

function setProp($target: HTMLElement, name: string, value: string) {
  if (isCustomProp(name)) {
    return;
  } else if (name === "className") {
    $target.setAttribute("class", value);
  } else if (typeof value === "boolean") {
    setBooleanProp($target, name, value);
  }
  $target.setAttribute(name, value);
}

function setProps($target: HTMLElement, props: any) {
  if (!props) return;

  Object.keys(props).forEach((name) => {
    setProp($target, name, props[name]);
  });
}

function updateProp(
  $target: HTMLElement,
  name: string,
  newVal: string,
  oldVal: string
) {
  if (!newVal) {
    removeProp($target, name, oldVal);
  } else if (!oldVal || newVal !== oldVal) {
    setProp($target, name, newVal);
  }
}

function updateProps(
  $target: HTMLElement,
  newProps: any = {},
  oldProps: any = {}
) {
  const props = { ...newProps, ...oldProps };
  Object.keys(props).forEach((name) => {
    updateProp($target, name, newProps[name], oldProps[name]);
  });
}

function isElement(node: INode): node is IElement {
  return node.elementType == ElementType.ElementNode;
}

function isText(node: INode): node is ITextElement {
  return node.elementType == ElementType.TextNode;
}

function changed(node1: INode, node2: INode): boolean {
  if (isText(node1) && isText(node2)) {
    return node1.value !== node2.value;
  } else if (isElement(node1) && isElement(node2)) {
    return node1.type !== node2.type;
  } else {
    return true;
  }
}

export function updateElement(
  $parent: ChildNode,
  newNode: INode,
  oldNode?: INode,
  index = 0
) {
  if (!oldNode) {
    $parent.appendChild(createElement(newNode));
  } else if (!newNode) {
    $parent.removeChild($parent.childNodes[index]);
  } else if (changed(newNode, oldNode)) {
    $parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
  } else if (isElement(newNode) && isElement(oldNode)) {
    updateProps(
      $parent.childNodes[index] as HTMLElement,
      newNode.props,
      oldNode.props
    );
    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;
    for (let i = 0; i < newLength || i < oldLength; i++) {
      updateElement(
        $parent.childNodes[index],
        newNode.children[i],
        oldNode.children[i],
        i
      );
    }
  }
}

// export function updateElementAsync(
//   $parent: ChildNode,
//   newNode: INode,
//   oldNode?: INode,
//   index = 0
// ) {
//   return new Promise<any>((res, err) => {
//     updateElement($parent, newNode, oldNode, index);
//   });
// }

// export function createElementAsync(node: INode) {
//   return new Promise<HTMLElement | Text>((res, err) => {
//     res(createElement(node));
//   });
// }
