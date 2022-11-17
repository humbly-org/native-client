import TcpSocket from 'react-native-tcp-socket';

class Socket {
  client = TcpSocket.createConnection({host: 'localhost', port: 3322}, () => {
    console.log('Connected');
  });

  write(data: string) {
    this.client.write(data);
  }
}

export const socket = new Socket();
