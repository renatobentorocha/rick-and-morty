import React from 'react';
import {screen} from '@testing-library/react-native';
import CharacterDetail from '../../../../src/screens/CharacterScreen/CharacterDetailScreen/CharacterDetail';
import {renderWithProvider} from '../../../../src/utils/mockProvider';

describe('CharacterDetail.tsx', () => {
  it('should able to render a character', () => {
    renderWithProvider(<CharacterDetail />);

    const character = screen.getByTestId('3');

    expect(character).not.toBeNull();
  });
});
