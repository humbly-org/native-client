import {Component} from 'react';
import Hospital from '../Hospital/Hospital';
import pucImage from './puc.png';

export class HospitalList extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      modal: false,
      input: '',
      message: '',
    };
  }

  mockData = [
    {
      id: '1',
      name: 'Hospital Puc Campinas',
      address: 'Av. John Boyd Dunlop, S/N - Jardim Londres, Campinas - SP',
      phone: '123456789',
      image: pucImage,
    },
  ];

  render() {
    return (
      <>
        {this.mockData.map((l, i) => (
          <Hospital
            key={l.id}
            hospitalId={l.id}
            hospitalName={l.name}
            hospitalAddress={l.address}
            hospitalPhone={l.phone}
            hospitalImage={pucImage}
          />
        ))}
      </>
    );
  }
}

export default HospitalList;
