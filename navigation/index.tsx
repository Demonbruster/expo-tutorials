import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AnimatedScrollItems from "../tutorials/Animated-scroll-items";
import { RootStackParamList } from "../utils/Types";
import React from 'react'

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
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="animatedScrollView" component={AnimatedScrollItems} />
    </Stack.Navigator>
  )
}