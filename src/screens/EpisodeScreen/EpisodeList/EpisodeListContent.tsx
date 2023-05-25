import React from 'react';
import {FlatList, Pressable} from 'react-native';
import styled from 'styled-components/native';
import Search from '../../../components/Search';
import {Episode} from './useEpisodeScreen';
import Loading from '../../../components/Loading';

type Props = {
  episodes?: Array<Episode>;
  onPress: (episode: Episode) => void;
  filter: string;
  onFilterChange: (value: string) => void;
  onSortPress: () => void;
  loading: boolean;
  loadMore: () => void;
  pullToRefresh: () => void;
};

export default function EpisodeListContent({
  episodes,
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
      <FlatList<Episode>
        onRefresh={pullToRefresh}
        refreshing={loading}
        onEndReachedThreshold={0.05}
        onEndReached={loadMore}
        data={episodes}
        keyExtractor={({id}) => `${id}`}
        renderItem={({item}) => (
          <EpisodeComponent episode={item} onPress={onPress} />
        )}
        ItemSeparatorComponent={StyledSeparator}
      />
      {loading && <Loading />}
    </StyledContainer>
  );
}

const EpisodeComponent = ({
  episode,
  onPress,
}: {
  episode: Episode;
  onPress: (Episode: Episode) => void;
}) => (
  <Pressable onPress={() => onPress(episode)} testID={`${episode.id}`}>
    <StyledEpisodeContainer>
      <StyledEpisodeName>{episode.name}</StyledEpisodeName>
      <StyledEpisodeText>{episode.air_date}</StyledEpisodeText>
      <StyledCharacterContainer>
        <StyledEpisodeName>Characters</StyledEpisodeName>
        <StyledEpisodeText>
          {episode.characters.map(c => `${c.name}`).toString()}
        </StyledEpisodeText>
      </StyledCharacterContainer>
    </StyledEpisodeContainer>
  </Pressable>
);

const StyledContainer = styled.View`
  flex: 1;
`;

const StyledEpisodeContainer = styled.View`
  background-color: #0c134f;
  padding: 16px;
`;

const StyledEpisodeName = styled.Text`
  color: #d4adfc;
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 5px;
`;

const StyledCharacterContainer = styled.View`
  margin-top: 15px;
`;

const StyledEpisodeText = styled.Text`
  color: #d4adfc;
  font-size: 16px;
`;

const StyledSeparator = styled.View`
  height: 15px;
`;
