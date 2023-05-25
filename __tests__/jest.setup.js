import mockReactNavigation from '../__mocks__/react-navigation/mockReactNavigation';
import '../__mocks__/react-native-safe-area-context/safe-area-context';

jest.mock('@react-navigation/native', () => {
  mockReactNavigation;
});
