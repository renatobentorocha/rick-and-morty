import React from 'react';
import {fireEvent, screen} from '@testing-library/react-native';
import {renderWithProvider} from '../../../../src/utils/mockProvider';
import EpisodeListContainer from '../../../../src/screens/EpisodeScreen/EpisodeList/EpisodeListContainer';
import {
  Episode,
  ModuleUseEpisodeScreen,
} from '../../../../src/screens/EpisodeScreen/EpisodeList/useEpisodeScreen';

const results: Array<Episode> = [
  {
    id: 21,
    name: 'The Wedding Squanchers',
    air_date: 'October 4, 2015',
    characters: [
      {
        name: 'Rick Sanchez',
      },
      {
        name: 'Morty Smith',
      },
      {
        name: 'Summer Smith',
      },
    ],
  },
  {
    id: 22,
    name: 'The Rickshank Rickdemption',
    air_date: 'April 1, 2017',
    characters: [
      {
        name: 'Rick Sanchez',
      },
      {
        name: 'Morty Smith',
      },
    ],
  },
];

const onFilterSpy = jest.spyOn(ModuleUseEpisodeScreen, 'onFilter');

describe('EpisodeListContainer.tsx', () => {
  it('should able to render a list of characters', async () => {
    renderWithProvider(<EpisodeListContainer />);

    const character = await screen.findByTestId(results[0].id.toString());

    expect(character).not.toBeNull();
  });

  it('should able to filter', async () => {
    renderWithProvider(<EpisodeListContainer />);

    const filter = await screen.findByTestId('filter');

    fireEvent.changeText(filter, 'Squanchers');

    expect(onFilterSpy).toHaveBeenCalled();
  });
});
