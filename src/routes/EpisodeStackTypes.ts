import {NavigatorScreenParams} from '@react-navigation/native';

import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export enum EpisodeStackRoutes {
  EpisodeList = 'EpisodeList',
  EpisodeDetail = 'EpisodeDetail',
}

export type EpisodeStackRoutesParamList = {
  [EpisodeStackRoutes.EpisodeList]: undefined;
  [EpisodeStackRoutes.EpisodeDetail]: undefined;
};

export type EpisodeStackNavigationProp =
  NativeStackNavigationProp<EpisodeStackRoutesParamList>;

export type EpisodeStackProps<T extends keyof EpisodeStackRoutesParamList> =
  NativeStackScreenProps<EpisodeStackRoutesParamList, T>;

export type EpisodeStackRoutesProp<
  T extends keyof EpisodeStackRoutesParamList,
> = EpisodeStackProps<T>['route'];

export type EpisodeStackParams =
  NavigatorScreenParams<EpisodeStackRoutesParamList>;
