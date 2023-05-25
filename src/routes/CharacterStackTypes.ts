import {NavigatorScreenParams} from '@react-navigation/native';

import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import {Character} from '../screens/CharacterScreen/CharacterList/useCharacterScreen';

export enum CharacterStackRoutes {
  CharacterList = 'CharacterList',
  CharacterDetail = 'CharacterDetail',
}

export type CharacterStackRoutesParamList = {
  [CharacterStackRoutes.CharacterList]: undefined;
  [CharacterStackRoutes.CharacterDetail]: {character: Character};
};

export type CharacterStackNavigationProp =
  NativeStackNavigationProp<CharacterStackRoutesParamList>;

export type CharacterStackProps<T extends keyof CharacterStackRoutesParamList> =
  NativeStackScreenProps<CharacterStackRoutesParamList, T>;

export type CharacterStackRoutesProp<
  T extends keyof CharacterStackRoutesParamList,
> = CharacterStackProps<T>['route'];

export type CharacterStackParams =
  NavigatorScreenParams<CharacterStackRoutesParamList>;
