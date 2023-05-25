import React from 'react';
import {FlatList, Pressable} from 'react-native';
import {Character} from './useCharacterScreen';
import styled from 'styled-components/native';
import Search from '../../../components/Search';
import Loading from '../../../components/Loading';

type Props = {
  characters?: Array<Character>;
  onPress: (character: Character) => void;
  filter: string;
  onFilterChange: (value: string) => void;
  onSortPress: () => void;
  loading: boolean;
  loadMore: () => void;
  pullToRefresh: () => void;
};

export default function CharacterListContent({
  characters,
  onPress,
  filter,
  onFilterChange,
  onSortPress,
  loading,
  loadMore,
  pullToRefresh,
}: Props) {
  return (
    <StyledContainer>
      <Search
        onSortPress={onSortPress}
        value={filter}
        onValueChange={onFilterChange}
      />
      <FlatList<Character>
        onRefresh={pullToRefresh}
        refreshing={loading}
        onEndReachedThreshold={0.05}
        onEndReached={loadMore}
        data={characters}
        keyExtractor={({id}) => `${id}`}
        renderItem={({item}) => (
          <CharacterComponent character={item} onPress={onPress} />
        )}
        ItemSeparatorComponent={StyledSeparator}
      />
      {loading && <Loading />}
    </StyledContainer>
  );
}

const CharacterComponent = ({
  character,
  onPress,
}: {
  character: Character;
  onPress: (character: Character) => void;
}) => (
  <Pressable onPress={() => onPress(character)} testID={`${character.id}`}>
    <StyledCharacterContainer>
      <StyledImage source={{uri: character.image, height: 150}} />
    </StyledCharacterContainer>
  </Pressable>
);

const StyledContainer = styled.View`
  flex: 1;
`;

const StyledCharacterContainer = styled.View`
  height: 150px;
  background-color: #0c134f;
`;

const StyledImage = styled.Image``;

const StyledSeparator = styled.View`
  height: 15px;
`;
