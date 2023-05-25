import React from 'react';
import {render, screen} from '@testing-library/react-native';
import EpisodeListContent from '../../../../src/screens/EpisodeScreen/EpisodeList/EpisodeListContent';
import {Episode} from '../../../../src/screens/EpisodeScreen/EpisodeList/useEpisodeScreen';

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

describe('EpisodeListContent.tsx', () => {
  it('should able to render a list of characters', () => {
    render(
      <EpisodeListContent
        episodes={results}
        onPress={jest.fn()}
        filter={''}
        onFilterChange={jest.fn()}
        onSortPress={jest.fn()}
        loading={false}
        loadMore={jest.fn()}
      />,
    );

    const character = screen.getByTestId(results[0].id.toString());

    expect(character).not.toBeNull();
  });

  it('should able to render the Loading component', () => {
    render(
      <EpisodeListContent
        episodes={results}
        onPress={jest.fn()}
        filter={''}
        onFilterChange={jest.fn()}
        onSortPress={jest.fn()}
        loading={true}
        loadMore={jest.fn()}
      />,
    );

    const loading = screen.getByTestId('loading');

    expect(loading).not.toBeNull();
  });
});
