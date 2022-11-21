import TcpSocket from 'react-native-tcp-socket';

export const socket = TcpSocket.createConnection(
  {
    port: 3322,
    host: 'localhost',
  },
  () => {
    console.log('connected');
  },
);
