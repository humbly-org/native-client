/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components';
import {Gap} from '../Gap';

interface ICenterWrapperProps {
  children: React.ReactNode;
}

export const CenterWrapperComponent = ({children}: ICenterWrapperProps) => {
  return (
    <Gap
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
      }}
      gap={8}>
      {children}
    </Gap>
  );
};

export const CenterWrapper = styled(CenterWrapperComponent)`
  gap: 8px;
`;
