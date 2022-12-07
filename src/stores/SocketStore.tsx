import {action, makeAutoObservable} from 'mobx';
import TcpSocket from 'react-native-tcp-socket';
import Toast from 'react-native-toast-message';
import {parseMessage} from '../utils';
import {PatientType} from '../../types';
import {RootStore} from './RootStore';

type SocketType = TcpSocket.Socket | null;
export class SocketStore {
  socket: SocketType;
  connected: boolean;
  connectedCpf: string;
  rootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.socket = null as SocketType;
    this.connectedCpf = '';
    this.connected = false;
    this.connect.bind(this);
    makeAutoObservable(this);
  }

  @action
  async connect() {
    return new Promise((resolve, rejected) => {
      this.socket =
        TcpSocket.connect({host: 'localhost', port: 3322}, () => {
          resolve('Connected');
          this.connected = true;
        }).on('error', () => {
          Toast.show({
            position: 'bottom',
            type: 'error',
            text1: 'Impossível de conectar!',
            text2: 'Provavelmente o servidor não está ativo.',
          });
        }) ?? null;
      if (!this.socket) rejected('Error');
    })
      .then(connMess => {
        if (this.socket && this.connected) {
          this.socket.on('data', data => {
            if (parseMessage(data)) {
              const {message, body} = parseMessage(data);
              console.log(message, body);
              this.rootStore.queueStore.queueMapper(message, body);
            }
          });
          this.connected = true;
        } else
          connMess === 'Error' &&
            Toast.show({
              position: 'bottom',
              type: 'error',
              text1: 'Impossível de conectar!',
              text2: 'Provavelmente o servidor não está ativo.',
            });
      })
      .finally(() => {});
  }

  @action
  sendMessage = (message: string) => {
    if (this.socket?.write) {
      this.socket.write(JSON.stringify({message: message}), 'utf8', e => {
        if (e) {
          console.error(e);
        }
      });
    }
  };

  @action
  quitQueue = () => {
    if (this.socket?.write) {
      this.socket.write(
        JSON.stringify({
          message: 'changeQueue',
          body: {
            patientCpf: this.connectedCpf,
            nextQueue: 'finished',
            requestedOrigin: 'PATIENT',
          },
        }),
        'utf8',
        e => {
          if (e) {
            console.error(e);
          }
        },
      );
    }
  };
  @action
  enterQueue = (patientObject: PatientType) => {
    this.connectedCpf = patientObject.cpf;
    if (this.socket?.write) {
      this.socket.write(
        JSON.stringify({
          message: 'enterQueue',
          body: {
            patientName: patientObject.name,
            patientCpf: patientObject.cpf,
          },
        }),
        'utf8',
        e => {
          if (e) {
            console.error(e);
          }
        },
      );
    }
  };
}
