import { INode } from "./Element"
import { createElement, updateElement } from "./VirtualDom"

export interface IContext<T> {
  nodeFn: (props: T) => INode
  defaultProps: T
}

export class WebComponent<T> extends HTMLElement {

  private __props: T
  private __virtualDom: INode
  private __virtualDomFn: (props: T) => INode

  constructor(context: IContext<T>) {
    super()

    this.__props = context.defaultProps
    this.attachShadow({ mode: 'open' })
    this.__virtualDomFn = context.nodeFn
    this.__virtualDom = context.nodeFn(this.__props)
    const n = createElement(this.__virtualDom)
    this.shadowRoot?.appendChild(n)
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    this.__props[name] = newValue
    const n = this.__virtualDomFn(this.__props)

    updateElement({
      parent: this.shadowRoot as any,
      oldNode: this.__virtualDom,
      newNode: n,
      index: 0
    })

    this.__virtualDom = n
  }
}


export function defineWebComponent(tag: string, component: CustomElementConstructor) {
  window.customElements.define(tag, component)
}
