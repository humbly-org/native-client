import {QueueStore} from './QueueStore';
import {SocketStore} from './SocketStore';

export class RootStore {
  queueStore: QueueStore;
  socketStore: SocketStore;
  constructor() {
    this.queueStore = new QueueStore(this);
    this.socketStore = new SocketStore(this);
  }
}
