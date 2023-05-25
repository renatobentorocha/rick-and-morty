const mockReactNavigation = jest.mock('@react-navigation/native', () => {
  const originalModule = jest.requireActual('@react-navigation/native');

  return {
    __esModule: true,
    ...originalModule,
    useFocusEffect: jest.fn().mockReturnValue(true),
    useRoute: () => ({
      params: {
        character: {
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
      },
    }),
    useIsFocused: jest.fn().mockReturnValue(true),
    createAppContainer: jest.fn(),
    useNavigation: () => ({
      pop: jest.fn(),
      push: jest.fn(),
      popToTop: jest.fn(),
      navigate: jest.fn(),
      dispatch: jest.fn(),
      addListener: jest.fn(),
      goBack: jest.fn(),
      canGoBack: jest.fn().mockReturnValue(true),
      replace: jest.fn(),
    }),
  };
});

export default mockReactNavigation;
