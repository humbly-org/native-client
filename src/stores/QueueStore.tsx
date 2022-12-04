import {action, autorun, makeAutoObservable} from 'mobx';
import Toast from 'react-native-toast-message';
import {RootStore} from './RootStore';

type IMapper = 'enterQueueRes' | 'callPatientRes' | 'changeQueueRes';

export class QueueStore {
  state: 'onHold' | 'inProgress' | 'finished' | 'notConnected';
  quitQueueModal = false;
  callPatientModal: boolean;
  code: string = '';
  rootStore;

  constructor(rootStore: RootStore) {
    this.state = 'notConnected';
    this.callPatientModal = false;
    this.code = '';
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.queueMapper = this.queueMapper.bind(this);

    autorun(() => {
      // console.warn('IN QUEUE:', this.state);
    });
  }

  @action
  queueMapper = (message: IMapper, body: any) => {
    const obj = {
      enterQueueRes: () => {
        this.enterQueue();
        Toast.show({
          position: 'bottom',
          type: 'success',
          text1: 'Você entrou na fila!',
          text2: 'Aguarde ser chamado pelo guiche.',
        });
      },
      callPatientRes: (body: {patientCode: string}) => {
        this.setCallPatientModal(true);
        this.code = body.patientCode;
      },
      changeQueueRes: (body: {state: QueueStore['state']}) => {
        this.changeQueue(body.state);
        this.callPatientModal = false;
        if (body.state === 'finished') {
          Toast.show({
            position: 'bottom',
            type: 'error',
            text1: 'Você saiu da fila!',
            text2: 'Seu atendimento finalizado ou foi cancelado.',
          });
        }
        if (body.state === 'inProgress') {
          Toast.show({
            position: 'bottom',
            type: 'info',
            text1: 'Atendimento iniciado!',
            text2:
              'Seu atendimento foi iniciado, se dirija até a sala de atendimento',
          });
        }
      },
    };
    if (obj[message]) {
      return obj[message](body);
    }
    return;
  };

  @action
  setQuitQueueModal = (value: boolean) => {
    this.quitQueueModal = value;
  };

  @action
  changeQueue = (newState: typeof this.state) => {
    this.state = newState;
  };

  @action
  inProgressQueue = () => {
    this.state = 'inProgress';
  };

  @action
  enterQueue = () => {
    this.state = 'onHold';
  };

  @action
  setCallPatientModal = (callPatientModal: boolean) => {
    this.callPatientModal = callPatientModal;
  };

  @action
  getState = () => {
    return this.state;
  };
}
