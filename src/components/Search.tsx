import React from 'react';
import {Pressable} from 'react-native';
import styled from 'styled-components/native';
import SortImage from '../assets/sort.png';

type Props = {
  value: string;
  onValueChange: (value: string) => void;
  onSortPress: () => void;
};

export default function Search({value, onValueChange, onSortPress}: Props) {
  return (
    <StyledContainer>
      <StyledTextInput
        value={value}
        onChangeText={onValueChange}
        testID="filter"
      />
      <Pressable onPress={onSortPress}>
        <StyledImage source={SortImage} />
      </Pressable>
    </StyledContainer>
  );
}

const StyledContainer = styled.View`
  padding: 16px;
  flex-direction: row;
  align-items: center;
`;

const StyledTextInput = styled.TextInput`
  flex-grow: 1;
  height: 40px;

  border-width: 1px;
  padding: 10px;
  border-radius: 8px;
`;

const StyledImage = styled.Image``;
