import {useCallback, useEffect, useMemo, useState} from 'react';
import {gql, useLazyQuery} from '@apollo/client';
import debounce from 'lodash.debounce';
import {sortByString} from '../../../utils/SortApiResult';
import {SortOrder} from '../../CharacterScreen/CharacterList/useCharacterScreen';

type Info = {
  count: number;
  pages: number;
  next: number;
  prev: number;
};

export type Episode = {
  id: number;
  name: string;
  air_date: string;
  characters: Array<{name: string}>;
};

type EpisodesResult = {
  episodes: {
    info: Info;
    results: Array<Episode>;
  };
};

export const gqlEpisodes = gql`
  query episodes($page: Int, $filter: FilterEpisode) {
    episodes(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        air_date
        characters {
          name
        }
      }
    }
  }
`;

export const ModuleUseEpisodeScreen = {
  onFilter: (callback: () => void) => callback(),
};

export default function useEpisodesScreen() {
  const [episodes, setEpisodesResult] = useState<EpisodesResult>({
    episodes: {
      results: [],
      info: {
        count: 0,
        pages: 0,
        next: 0,
        prev: 0,
      },
    },
  });
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState<SortOrder>(SortOrder.ASCENDING);

  const [getEpisodes, {loading, data}] =
    useLazyQuery<EpisodesResult>(gqlEpisodes);

  const initialLoading = useCallback(() => {
    if (!data) {
      return;
    }

    let results: Array<Episode>;

    if (!data.episodes.info.prev) {
      results = data.episodes.results;
    } else {
      results = [...episodes.episodes.results, ...data.episodes.results];
    }

    results = results
      .slice()
      .sort((a, b) =>
        sortByString(a.name.toUpperCase(), b.name.toLocaleUpperCase(), sort),
      );

    setEpisodesResult({
      episodes: {info: data.episodes.info, results},
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    initialLoading();
  }, [initialLoading]);

  const loadEpisodes = (newFilter: string = '') => {
    getEpisodes({variables: {page: 0, filter: {name: newFilter}}});
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onFilterDebounced = useMemo(() => debounce(loadEpisodes, 800), []);

  const onItemPress = () => {};

  const onFilter = (newFilter: string) =>
    ModuleUseEpisodeScreen.onFilter(() => {
      onFilterDebounced(newFilter);
      setFilter(newFilter);
    });

  const onChangeOrder = () => {
    const results = episodes.episodes.results
      .slice()
      .sort((a, b) =>
        sortByString(
          a.name.toUpperCase(),
          b.name.toLocaleUpperCase(),
          sort * -1,
        ),
      );

    setEpisodesResult({
      episodes: {info: episodes.episodes.info, results},
    });

    setSort(s => s * -1);
  };

  const loadMore = () => {
    if (loading) {
      return;
    }

    getEpisodes({
      variables: {page: episodes.episodes.info.next, filter: {name: filter}},
    });
  };

  return {
    episodes,
    loading,
    loadEpisodes,
    onItemPress,
    filter,
    onFilter,
    onChangeOrder,
    loadMore,
  };
}
