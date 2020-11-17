export class Stack<T> {
  private root: T[] = []

  get length() {
    return this.root.length
  }

  push(data: T) {
    this.root.push(data);
  }

  pop() {
    return this.root.pop()
  }

  peek() {
    if (this.root.length === 0) {
      return;
    }
    return this.root[this.root.length - 1]
  }
}
