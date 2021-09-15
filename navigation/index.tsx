import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AnimatedScrollItems from "../tutorials/Animated-scroll-items";
import { RootStackParamList, TransitionNavSharedParamList } from "../utils/Types";
import React from 'react'
import SalonList from "../tutorials/Transition-navigation-shared-element/SalonList";
import SalonDetails from "../tutorials/Transition-navigation-shared-element/SalonDetails";

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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="animatedScrollView" component={TransitionNavSharedNavigator} />
    </Stack.Navigator>
  )
}

const TransitionNavSharedStack = createStackNavigator<TransitionNavSharedParamList>();

function TransitionNavSharedNavigator() {
  return (
    <TransitionNavSharedStack.Navigator screenOptions={{headerShown:false}}>
      <TransitionNavSharedStack.Screen name="List" component={SalonList} />
      <TransitionNavSharedStack.Screen name="Details" component={SalonDetails} />
    </TransitionNavSharedStack.Navigator>
  )
}
