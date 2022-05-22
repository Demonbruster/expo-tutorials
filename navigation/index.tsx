import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AnimatedScrollItems from "../tutorials/Animated-scroll-items";
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import SalonList from "../tutorials/Transition-navigation-shared-element/SalonList";
import SalonDetails from "../tutorials/Transition-navigation-shared-element/SalonDetails";
import { RootStackParamList, TransitionNavSharedParamList } from "../utils/Types";
import home from '../screens/home';
import BottomSheet from '../tutorials/BottomSheet';

export function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  )
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName='home' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='home' component={home} />
      <Stack.Screen name='animated-scroll-view' component={AnimatedScrollItems} />
      <Stack.Screen name='transition-nav-shared-element' component={TransitionNavSharedNavigator} />
      <Stack.Screen name='bottom-sheet' component={BottomSheet} />
    </Stack.Navigator>
  )
}

const TransitionNavSharedStack = createSharedElementStackNavigator<TransitionNavSharedParamList>();

function TransitionNavSharedNavigator() {
  return (
    <TransitionNavSharedStack.Navigator initialRouteName="List" screenOptions={{ headerShown: false }}>
      <TransitionNavSharedStack.Screen name="List" component={SalonList} />
      <TransitionNavSharedStack.Screen name="Details" component={SalonDetails} sharedElementsConfig={(route, otherRoute, showing) => {
        const { item } = route.params;
        return [
          {
            id: `item.${item.key}.bg`
          },
          {
            id: `item.${item.key}.name`
          },
          {
            id: `item.${item.key}.jobTitle`
          },
          {
            id: `item.${item.key}.image`
          },
          {
            id: `general.bg`
          },
        ]
      }} />
    </TransitionNavSharedStack.Navigator>
  )
}
