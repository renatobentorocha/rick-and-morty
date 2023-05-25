import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

export default jest.mock(
  'react-native-safe-area-context',
  () => mockSafeAreaContext,
);
