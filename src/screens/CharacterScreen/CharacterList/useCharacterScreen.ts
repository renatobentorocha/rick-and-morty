import {useCallback, useEffect, useMemo, useState} from 'react';
import {gql, useLazyQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import debounce from 'lodash.debounce';

import {
  CharacterStackNavigationProp,
  CharacterStackRoutes,
} from '../../../routes/CharacterStackTypes';

import {sortByString} from '../../../utils/SortApiResult';

type Info = {
  count: number;
  pages: number;
  next: number;
  prev: number;
};

export type Origin = {
  id: number;
  name: string;
  dimension: string;
};

export type Episode = {
  id: number;
  name: string;
};

export type Character = {
  id: number;
  name: String;
  image: string;
  origin: Origin;
  episode: Array<Episode>;
};

type CharacterResult = {
  characters: {
    info: Info;
    results: Array<Character>;
  };
};

export const gqlCharacters = gql`
  query characters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        image
        origin {
          id
          name
          dimension
        }
        episode {
          id
          name
        }
      }
    }
  }
`;

export enum SortOrder {
  ASCENDING = 1,
  DESCENDING = -1,
}

export const ModuleUseCharacterScreen = {
  onFilter: (callback: () => void) => callback(),
};

export default function useCharacterScreen() {
  const navigation = useNavigation<CharacterStackNavigationProp>();
  const [character, setCharacterResult] = useState<CharacterResult>({
    characters: {
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

  const [getCharacters, {loading, data}] =
    useLazyQuery<CharacterResult>(gqlCharacters);

  const initialLoading = useCallback(() => {
    if (!data) {
      return;
    }

    let results: Array<Character>;

    if (!data.characters.info.prev) {
      results = data.characters.results;
    } else {
      results = [...character.characters.results, ...data.characters.results];
    }

    results = results
      .slice()
      .sort((a, b) =>
        sortByString(a.name.toUpperCase(), b.name.toLocaleUpperCase(), sort),
      );

    setCharacterResult({
      characters: {info: data.characters.info, results},
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    initialLoading();
  }, [initialLoading]);

  const loadCharacter = (newFilter: string = '') => {
    getCharacters({variables: {page: 0, filter: {name: newFilter}}});
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onFilterDebounced = useMemo(() => debounce(loadCharacter, 800), []);

  const onItemPress = (selected: Character) => {
    navigation.navigate(CharacterStackRoutes.CharacterDetail, {
      character: selected,
    });
  };

  const onFilter = (newFilter: string) =>
    ModuleUseCharacterScreen.onFilter(() => {
      onFilterDebounced(newFilter);
      setFilter(newFilter);
    });

  const onChangeOrder = () => {
    const results = character.characters.results
      .slice()
      .sort((a, b) =>
        sortByString(
          a.name.toUpperCase(),
          b.name.toLocaleUpperCase(),
          sort * -1,
        ),
      );

    setCharacterResult({
      characters: {info: character.characters.info, results},
    });

    setSort(s => s * -1);
  };

  const loadMore = () => {
    if (loading) {
      return;
    }

    getCharacters({
      variables: {page: character.characters.info.next, filter: {name: filter}},
    });
  };

  return {
    character,
    loading,
    loadCharacter,
    onItemPress,
    filter,
    onFilter,
    onChangeOrder,
    loadMore,
  };
}
