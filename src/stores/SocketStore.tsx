import {action, makeAutoObservable} from 'mobx';
import TcpSocket from 'react-native-tcp-socket';
import {parseMessage} from '../utils';

export class SocketStore {
  socket = TcpSocket.createConnection({host: 'localhost', port: 3322}, () => {
    console.log('Connected');
  });

  constructor() {
    makeAutoObservable(this);
    this.socket.on('data', data => {
      const parsed = parseMessage(data);
      console.warn('Received: ' + JSON.stringify(parsed));
    });
  }

  @action
  sendMessage = (message: string) => {
    this.socket.write(JSON.stringify({message: message}), 'utf8', e => {
      if (e) {
        console.error(e);
      }
    });
  };
}
