import React from 'react';
import {FlatList} from 'react-native';
import {useRoute} from '@react-navigation/native';
import styled from 'styled-components/native';
import {
  CharacterStackRoutes,
  CharacterStackRoutesProp,
} from '../../../routes/CharacterStackTypes';
import {Episode, Origin} from '../CharacterList/useCharacterScreen';

type HeaderComponentProps = Origin & {
  id: string;
};

const HeaderComponent = ({name, dimension, id}: HeaderComponentProps) => (
  <StyledLocationContainer testID={id}>
    <StyledLocation>
      <StyledLocationHeader>Origem</StyledLocationHeader>
      <StyledLocationText>{name}</StyledLocationText>
      <StyledLocationText>{dimension}</StyledLocationText>
    </StyledLocation>
    <StyledLocationHeader>Episodes</StyledLocationHeader>
  </StyledLocationContainer>
);

export default function CharacterDetail() {
  const {
    params: {character},
  } =
    useRoute<CharacterStackRoutesProp<CharacterStackRoutes.CharacterDetail>>();

  return (
    <StyledContainer>
      <StyledImage source={{uri: character.image, height: 150}} />

      <StyledFlatList<Episode>
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <HeaderComponent {...character.origin} id={character.id.toString()} />
        }
        data={character.episode}
        keyExtractor={({id}) => `${id}`}
        renderItem={({item}) => (
          <StyledEpisode>
            <StyledEpisodeText>{item.name}</StyledEpisodeText>
          </StyledEpisode>
        )}
        ItemSeparatorComponent={StyledSeparator}
      />
    </StyledContainer>
  );
}

const StyledContainer = styled.View`
  flex: 1;
  background-color: #d4adfc;
`;

const StyledImage = styled.Image``;

const StyledFlatList = styled.FlatList.attrs(() => ({
  ListHeaderComponentStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#d4adfc',
  },
}))`` as unknown as typeof FlatList;

const StyledLocationContainer = styled.View.attrs(() => ({}))`
  background-color: #0c134f;
  padding: 8px;
`;

const StyledLocation = styled.View.attrs(() => ({}))`
  padding-bottom: 20px;
`;

const StyledLocationHeader = styled.Text`
  color: #d4adfc;
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 5px;
`;

const StyledLocationText = styled.Text`
  color: #d4adfc;
  font-size: 16px;
`;

const StyledEpisode = styled.View`
  background-color: #0c134f;
  padding: 8px;
  height: 55px;
  justify-content: center;
`;

const StyledEpisodeText = styled.Text`
  color: #d4adfc;
  font-size: 16px;
`;

const StyledSeparator = styled.View`
  height: 15px;
`;
