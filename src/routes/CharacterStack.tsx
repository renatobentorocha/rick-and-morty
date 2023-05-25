import React from 'react';
import {StyleProp, TextStyle} from 'react-native/types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  CharacterStackRoutes,
  CharacterStackRoutesParamList,
} from './CharacterStackTypes';

import {CharacterDetail, CharacterListScreen} from '../screens/CharacterScreen';

const Stack = createNativeStackNavigator<CharacterStackRoutesParamList>();

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

export default function CharacterStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={CharacterStackRoutes.CharacterList}
        component={CharacterListScreen}
        options={{
          title: 'Character list',
          headerTitleStyle: HeaderTitleStyle,
          headerStyle: HeaderStyle,
        }}
      />
      <Stack.Screen
        name={CharacterStackRoutes.CharacterDetail}
        component={CharacterDetail}
        options={{
          title: 'Character',
          headerTitleStyle: HeaderTitleStyle,
          headerStyle: HeaderStyle,
        }}
      />
    </Stack.Navigator>
  );
}
