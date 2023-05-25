import React, {useEffect} from 'react';
import useEpisodesScreen from './useEpisodeScreen';
import EpisodeListContent from './EpisodeListContent';

export default function EpisodeListScreen() {
  const viewModel = useEpisodesScreen();

  useEffect(() => {
    viewModel.loadEpisodes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <EpisodeListContent
      episodes={viewModel.episodes.episodes.results}
      onPress={viewModel.onItemPress}
      filter={viewModel.filter}
      onFilterChange={viewModel.onFilter}
      onSortPress={viewModel.onChangeOrder}
      loading={viewModel.loading}
      loadMore={viewModel.loadMore}
      pullToRefresh={viewModel.loadEpisodes}
    />
  );
}
