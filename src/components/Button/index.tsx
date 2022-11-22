import {TouchableOpacity, Text} from 'react-native';
import styled from 'styled-components';
import React from 'react';

const ButtonContainer = styled(TouchableOpacity)`
  margin-vertical: 20px;
  padding: 12px;
  border-radius: 10px;
  background-color: #4267b2;
`;

const ButtonText = styled(Text)`
  font-size: 16px;
  text-align: center;
  font-weight: bold;
`;
interface IProps {
  title: string;
  onPress: () => void;
}

export const Button = ({title, onPress}: IProps) => (
  <ButtonContainer onPress={onPress}>
    <ButtonText>{title}</ButtonText>
  </ButtonContainer>
);
