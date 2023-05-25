import React, {PropsWithChildren} from 'react';
import {render} from '@testing-library/react-native';
import {MockedProvider} from '@apollo/client/testing';
import {gqlCharacters} from '../screens/CharacterScreen/CharacterList/useCharacterScreen';
import {gqlEpisodes} from '../screens/EpisodeScreen/EpisodeList/useEpisodeScreen';

const characterMockData = {
  data: {
    characters: {
      info: {
        count: 12,
        pages: 1,
        next: 0,
        prev: 0,
      },
      results: [
        {
          id: 3,
          name: 'Summer Smith',
          image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
          origin: {
            id: 20,
            name: 'Earth (Replacement Dimension)',
            dimension: 'Replacement Dimension',
          },
          episode: [
            {
              id: 6,
              name: 'Rick Potion #9',
            },
          ],
        },
        {
          id: 120,
          name: 'Evil Summer Clone',
          image: 'https://rickandmortyapi.com/api/character/avatar/120.jpeg',
          origin: {
            id: null,
            name: 'unknown',
            dimension: null,
          },
          episode: [
            {
              id: 5,
              name: 'Meeseeks and Destroy',
            },
          ],
        },
        {
          id: 219,
          name: 'Mechanical Summer',
          image: 'https://rickandmortyapi.com/api/character/avatar/219.jpeg',
          origin: {
            id: 20,
            name: 'Earth (Replacement Dimension)',
            dimension: 'Replacement Dimension',
          },
          episode: [
            {
              id: 23,
              name: 'Rickmancing the Stone',
            },
          ],
        },
        {
          id: 338,
          name: 'Summer Smith',
          image: 'https://rickandmortyapi.com/api/character/avatar/338.jpeg',
          origin: {
            id: 1,
            name: 'Earth (C-137)',
            dimension: 'Dimension C-137',
          },
          episode: [
            {
              id: 1,
              name: 'Pilot',
            },
            {
              id: 2,
              name: 'Lawnmower Dog',
            },
          ],
        },
        {
          id: 339,
          name: 'Summer Smith',
          image: 'https://rickandmortyapi.com/api/character/avatar/339.jpeg',
          origin: {
            id: 34,
            name: "Earth (Evil Rick's Target Dimension)",
            dimension: "Evil Rick's Target Dimension",
          },
          episode: [
            {
              id: 10,
              name: 'Close Rick-counters of the Rick Kind',
            },
          ],
        },
      ],
    },
  },
};

const episodesMockData = {
  data: {
    episodes: {
      info: {
        count: 2,
        pages: 1,
        next: 0,
        prev: 0,
      },
      results: [
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
      ],
    },
  },
};

export const RenderWithProvider = ({children}: PropsWithChildren) => {
  return (
    <MockedProvider
      mocks={[
        {
          request: {
            query: gqlCharacters,
            variables: {page: 0, filter: {name: ''}},
          },
          result: characterMockData,
        },
        {
          request: {
            query: gqlEpisodes,
            variables: {page: 0, filter: {name: ''}},
          },
          result: episodesMockData,
        },
      ]}
      addTypename={false}>
      {children}
    </MockedProvider>
  );
};

export const renderWithProvider = (component: React.ReactNode) => {
  return render(<RenderWithProvider>{component}</RenderWithProvider>);
};
