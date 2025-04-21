import { Queue } from "./queue";
import sample from "./sample.json";

export class TestQueue extends Queue<Viseme> {
  items = sample as Viseme[];

  clear() {
    this.head = 0;
  }
}
