import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import CharacterStack from './CharacterStack';
import EpisodeStack from './EpisodeStack';

const Tab = createBottomTabNavigator();

const TabBarOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarStyle: {backgroundColor: '#d4adfc'},
  tabBarLabelPosition: 'beside-icon',
  tabBarIconStyle: {display: 'none'},
  tabBarLabelStyle: {
    fontWeight: '700',
    fontSize: 15,
  },
};

export default function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Characters"
          component={CharacterStack}
          options={TabBarOptions}
        />
        <Tab.Screen
          name="Episodes"
          component={EpisodeStack}
          options={TabBarOptions}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
