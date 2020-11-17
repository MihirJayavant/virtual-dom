export interface IListNode<T> {
  data: T
  next: IListNode<T> | undefined
}

export class List<T> {

  private head: IListNode<T> | undefined = undefined
  private count = 0

  get length() {
    return this.count
  }

  add(data: T, index: number): boolean {
    if (index < 0 || index > this.count)
      return false

    const node: IListNode<T> = {
      data, next: undefined
    }
    if (!this.head) {
      this.head = node
      this.count++
      return true
    }

    if (index === 0) {
      node.next = this.head
      this.head = node
      this.count++
      return true
    }

    let p = this.head

    for (let i = 0; i < index; i++) {
      p = p.next!
    }

    if (p.next) {
      node.next = p.next
      p.next = node
      this.count++
      return true
    }

    p.next = node
    this.count++
    return true

  }

  toArray(): T[] {
    const array: T[] = []
    let p = this.head
    while (p) {
      array.push(p.data)
      p = p.next
    }
    return array
  }

  delete(data: T, index: number): boolean {
    if (index < 0 || index >= this.count)
      return false

    if (!this.head)
      return false

    if (index === 0) {
      this.head = this.head.next
      this.count--
      return true
    }

    let p = this.head

    for (let i = 0; i < index - 1; i++) {
      p = p.next!
    }

    p.next = p.next?.next
    this.count--
    return true

  }
}
