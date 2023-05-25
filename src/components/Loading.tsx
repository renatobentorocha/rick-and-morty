import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export default function Loading() {
  return (
    <StyledContainer style={StyleSheet.absoluteFill} testID="loading">
      <ActivityIndicator size={'large'} color={'#0c134f'} />
    </StyledContainer>
  );
}

const StyledContainer = styled.View`
  background-color: #d5adfcc1;
  align-items: center;
  justify-content: center;
`;
