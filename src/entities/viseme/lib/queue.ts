export class Queue<T> {
  protected items: T[] = [];
  protected head: number = 0;

  enqueue(item: T) {
    this.items.push(item);
  }

  dequeue() {
    return this.items[this.head++];
  }

  isEmpty() {
    return this.head === this.items.length;
  }

  clear() {
    this.items = this.items.slice(this.head);
    this.head = 0;
  }

  peek() {
    return this.items[this.head];
  }
}
