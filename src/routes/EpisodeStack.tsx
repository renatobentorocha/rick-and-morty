import React from 'react';
import {StyleProp, TextStyle} from 'react-native/types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  EpisodeStackRoutes,
  EpisodeStackRoutesParamList,
} from './EpisodeStackTypes';

import {EpisodeListScreen} from '../screens/EpisodeScreen';

const Stack = createNativeStackNavigator<EpisodeStackRoutesParamList>();

const HeaderStyle = {
  backgroundColor: '#d4adfc',
};

const HeaderTitleStyle: StyleProp<
  Pick<TextStyle, 'fontFamily' | 'fontSize' | 'fontWeight'> & {
    color?: string;
  }
> = {
  fontWeight: 'bold',
  fontSize: 18,
};

export default function EpisodeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={EpisodeStackRoutes.EpisodeList}
        component={EpisodeListScreen}
        options={{
          title: 'Episode list',
          headerTitleStyle: HeaderTitleStyle,
          headerStyle: HeaderStyle,
        }}
      />
    </Stack.Navigator>
  );
}
