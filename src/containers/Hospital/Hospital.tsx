import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Badge, Button, Popover, Row, Text, View} from 'native-base';
import Toast from 'react-native-toast-message';
import {ListItemBase} from 'react-native-elements/dist/list/ListItemBase';
import {ImageSourcePropType, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';
import {QueueEnter} from '../../components/Modal';
import {RootStore} from '../../stores/RootStore';
import {timeStamp} from 'console';
import {CallPatientModal} from '../../components/CallPatientModal';
import {FinishQueueModal} from '../../components/FinishQueue';

interface IProps {
  hospitalName: string;
  hospitalId: string;
  hospitalAddress: string;
  hospitalPhone: string;
  hospitalImage: ImageSourcePropType;
  store?: RootStore;
}

interface IState {
  popoverVisible: boolean;
  modal: boolean;
  input: string;
  message: string;
}

enum QueueColors {
  'notConnected' = 'grey',
  'onHold' = '#F31260',
  'inProgress' = '#F5A524',
  'finished' = '#9750DD',
}

enum QueueStatus {
  'notConnected' = 'Sem fila',
  'onHold' = 'Na fila',
  'inProgress' = 'Em atendimento',
  'finished' = 'Finalizado',
}
@inject('store')
@observer
class Hospital extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      popoverVisible: false,
      modal: false,
      input: '',
      message: '',
    };
  }

  setModalVisible = (visible: boolean) => {
    this.setState({modal: visible});
  };

  setPopoverVisible = (visible: boolean) => {
    this.setState({popoverVisible: visible});
  };

  render() {
    const {
      hospitalId,
      hospitalName,
      hospitalAddress,
      hospitalPhone,
      hospitalImage,
    } = this.props;

    const {popoverVisible, modal} = this.state;
    const {queueStore, socketStore} = this.props.store!;
    const {setQuitQueueModal} = queueStore;
    const {state} = queueStore;

    const modals = {
      notConnected: (
        <QueueEnter setModalVisible={this.setModalVisible} modal={modal} />
      ),
      onHold: (
        <FinishQueueModal
          setModalVisible={this.setModalVisible}
          modal={modal}
        />
      ),
      inProgress: (
        <FinishQueueModal
          setModalVisible={this.setModalVisible}
          modal={modal}
        />
      ),
      finished: null,
    };

    type QueueType = Partial<NonNullable<typeof state>>;

    const handleModal = (queueState: QueueType) => {
      return modals[queueState];
    };

    const handleOpenModals = (queueState: QueueType) => {
      this.setPopoverVisible(false);
      this.setModalVisible(true);
    };

    const quitQueueModal = () => {
      this.setPopoverVisible(false);

      setQuitQueueModal(true);
    };

    const handlePopoverContent = (queueState: QueueType) => {
      const obj = {
        notConnected: (
          <Popover.Body
            style={{
              backgroundColor: '#0072F5',
            }}>
            <Text color={'white'} fontSize="md">
              Entrar na fila de <Text bold>{hospitalName}</Text>?
            </Text>
            <Button.Group justifyContent={'flex-end'} space={2}>
              <Button
                marginTop="2"
                borderColor="white"
                borderWidth={2}
                colorScheme="success"
                onPress={() => handleOpenModals(state)}>
                <Text color="white" bold>
                  Entrar
                </Text>
              </Button>
            </Button.Group>
          </Popover.Body>
        ),
        onHold: (
          <Popover.Body
            style={{
              backgroundColor: '#F31260',
            }}>
            <Text color={'white'} bold fontSize="md">
              Deseja sair da fila?
            </Text>
            <Button.Group justifyContent={'flex-end'} space={2}>
              <Button
                marginTop="2"
                backgroundColor={'#0072F5'}
                borderColor="white"
                borderWidth={2}
                onPress={() => quitQueueModal()}>
                <Text color="white" bold>
                  Sair
                </Text>
              </Button>
            </Button.Group>
          </Popover.Body>
        ),
        inProgress: (
          <Popover.Body
            style={{
              backgroundColor: '#F31260',
            }}>
            <Text color={'white'} bold fontSize="md">
              Deseja sair da fila?
            </Text>
            <Button.Group justifyContent={'flex-end'} space={2}>
              <Button
                marginTop="2"
                backgroundColor={'#0072F5'}
                borderColor="white"
                borderWidth={2}
                onPress={() => quitQueueModal()}>
                <Text color="white" bold>
                  Sair
                </Text>
              </Button>
            </Button.Group>
          </Popover.Body>
        ),
        finished: null,
      };
      return obj[queueState];
    };

    return (
      <Popover
        placement={'bottom right'}
        trigger={triggerProps => {
          return (
            <ListItemBase
              key={hospitalId}
              style={{
                width: '100%',
              }}>
              <TouchableOpacity
                {...triggerProps}
                onPress={() => this.setPopoverVisible(true)}
                key={hospitalId}
                style={{
                  backgroundColor: '#17C964',
                  width: '100%',
                  borderRadius: 10,
                  padding: 10,
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                <Avatar
                  avatarStyle={{
                    borderColor: 'white',
                    borderWidth: 4,
                    borderRadius: 10,
                  }}
                  size={'large'}
                  source={hospitalImage}
                />
                <View
                  style={{
                    display: 'flex',
                    maxWidth: '75%',
                    justifyContent: 'space-between',
                    marginLeft: 10,
                  }}>
                  <Row
                    style={{
                      marginBottom: 10,
                      display: 'flex',
                    }}>
                    {state !== 'notConnected' ? (
                      <Badge
                        style={{
                          backgroundColor: QueueColors[state],
                          marginRight: 10,
                        }}>
                        <Text bold color={'white'} fontSize={12}>
                          {QueueStatus[state]}
                        </Text>
                      </Badge>
                    ) : null}
                    {state !== 'notConnected' ? null : (
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 11,
                          fontWeight: '600',
                        }}>
                        Atendimento em XX minutos.
                      </Text>
                    )}
                  </Row>
                  <View>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}>
                      {hospitalName}
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 10,
                        lineHeight: 10,
                        fontWeight: 'normal',
                      }}>
                      {hospitalAddress}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              {handleModal(state!) || null}
              <CallPatientModal />
            </ListItemBase>
          );
        }}
        isOpen={popoverVisible}
        onClose={() => this.setPopoverVisible(!popoverVisible)}>
        <Popover.Content marginTop={6}>
          <Popover.Arrow
            style={{
              backgroundColor: 'transparent',
              borderColor: 'transparent',
            }}
          />
          {handlePopoverContent(state)}
        </Popover.Content>
      </Popover>
    );
  }
}

export default Hospital;
