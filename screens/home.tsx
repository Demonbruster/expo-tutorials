import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NAVS } from '../constant/data'
import { NavigationProp } from '@react-navigation/core'
import { RootStackParamList } from '../utils/Types'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = {
  navigation: NavigationProp<RootStackParamList, 'home'>
}

const navsArray = Object.values(NAVS)

const handleNavigation = (navigation: NavigationProp<RootStackParamList, 'home'>, item: any) => {
  navigation.navigate(item)
}

const home = (props: Props) => {
  return (
    <SafeAreaView>
      <FlatList
        data={navsArray}
        keyExtractor={item => item}
        renderItem={({ item }) => {
          return <TouchableOpacity onPress={
            () => handleNavigation(props.navigation, item)
          } style={styles.item}>
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        }}
      />
    </SafeAreaView >
  )
}

export default home

const styles = StyleSheet.create({
  item: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2F4F4F',
  }
})