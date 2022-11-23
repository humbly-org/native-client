import {action, makeAutoObservable} from 'mobx';
import TcpSocket from 'react-native-tcp-socket';
import {parseMessage} from '../utils';

type SocketType = TcpSocket.Socket | null;
export class SocketStore {
  socket: SocketType;

  constructor() {
    this.socket = null as SocketType;
    this.connect.bind(this);
    makeAutoObservable(this);
    if (this.socket?.on) {
      this.socket.on('data', data => {
        console.warn('FROM SERVER:', parseMessage(data));
      });
    }
  }

  @action
  async connect() {
    return new Promise((resolve, _rej) => {
      this.socket = TcpSocket.createConnection(
        {host: 'localhost', port: 3322},
        () => {
          console.warn('Connected');
          resolve('Connected');
        },
      );
    });
  }

  @action
  sendMessage = (message: string) => {
    console.warn('MESSAGE:', this.socket?.write);
    if (this.socket?.write) {
      this.socket.write(JSON.stringify({message: message}), 'utf8', e => {
        if (e) {
          console.error(e);
        }
      });
    }
  };
}
