import React from 'react';
import {fireEvent, screen} from '@testing-library/react-native';
import {
  Character,
  ModuleUseCharacterScreen,
} from '../../../../src/screens/CharacterScreen/CharacterList/useCharacterScreen';
import {CharacterListScreen} from '../../../../src/screens/CharacterScreen';
import {renderWithProvider} from '../../../../src/utils/mockProvider';

const results: Array<Character> = [
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
];

const onFilterSpy = jest.spyOn(ModuleUseCharacterScreen, 'onFilter');

describe('CharacterListContent.tsx', () => {
  it('should able to render a list of characters', async () => {
    renderWithProvider(<CharacterListScreen />);

    const character = await screen.findByTestId(results[0].id.toString());

    expect(character).not.toBeNull();
  });

  it('should able to filter', async () => {
    renderWithProvider(<CharacterListScreen />);

    const filter = await screen.findByTestId('filter');

    fireEvent.changeText(filter, 'Mechanical Summer');

    expect(onFilterSpy).toHaveBeenCalled();
  });
});
