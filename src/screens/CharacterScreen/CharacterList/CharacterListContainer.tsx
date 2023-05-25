import React, {useEffect} from 'react';
import CharacterListContent from './CharacterListContent';
import useCharacterScreen from './useCharacterScreen';

export default function CharacterListScreen() {
  const viewModel = useCharacterScreen();

  useEffect(() => {
    viewModel.loadCharacter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CharacterListContent
      characters={viewModel.character.characters.results}
      onPress={viewModel.onItemPress}
      filter={viewModel.filter}
      onFilterChange={viewModel.onFilter}
      onSortPress={viewModel.onChangeOrder}
      loading={viewModel.loading}
      loadMore={viewModel.loadMore}
      pullToRefresh={viewModel.loadCharacter}
    />
  );
}
