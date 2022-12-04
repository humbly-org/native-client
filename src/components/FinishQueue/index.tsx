import {Modal, Button, Center, FormControl, Input, Text} from 'native-base';
import React from 'react';
import {inject, observer} from 'mobx-react';
import {RootStore} from '../../stores/RootStore';

interface IProps {
  setModalVisible: (modal: boolean) => void;
  modal: boolean;
  store?: RootStore;
}

interface IState {
  name: string;
  cpf: string;
}

@inject('store')
@observer
export class FinishQueueModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }
  render() {
    const {socketStore, queueStore} = this.props.store!;
    const {quitQueue} = socketStore;
    const {quitQueueModal, setQuitQueueModal} = queueStore;

    return (
      <Center>
        <Modal isOpen={quitQueueModal} onClose={() => setQuitQueueModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton borderWidth={0} />
            <Modal.Header
              borderBottomWidth={0}
              borderWidth={0}
              marginTop={4}></Modal.Header>
            <Modal.Body borderBottomWidth={0}>
              <Text textAlign="center" bold fontSize="xl">
                Continuar? Você será removido da fila e não poderá mais voltar.
              </Text>
            </Modal.Body>
            <Modal.Footer
              display={'flex'}
              textAlign={'center'}
              alignItems="center"
              justifyContent={'center'}
              borderTopWidth={0}>
              <Button.Group
                display={'flex'}
                textAlign={'center'}
                alignItems="center"
                justifyContent={'center'}
                space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => setQuitQueueModal(!quitQueueModal)}>
                  Cancelar
                </Button>
                <Button onPress={() => quitQueue()}>Sair</Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    );
  }
}
