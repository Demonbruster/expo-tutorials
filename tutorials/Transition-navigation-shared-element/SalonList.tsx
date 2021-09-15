import { NavigationProp } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { SPACING } from '../../utils/extras'
import Layout from '../../utils/Layout'
import salonData from './salon'

interface Props {
  navigation: NavigationProp<any, any>
}

const ITEM_HEIGHT = Layout.window.height * 0.18

const SalonList = (props: Props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={salonData}
        keyExtractor={item => item.key}
        contentContainerStyle={{ padding: SPACING }}
        renderItem={({ item }) => {
          return <TouchableOpacity onPress={() => {
            props.navigation.navigate('Details', { item })
          }}
            style={{ marginBottom: SPACING, height: ITEM_HEIGHT }}>
            <View style={{ flex: 1, padding: SPACING }}>
              <View style={[StyleSheet.absoluteFillObject, { backgroundColor: item.color, borderRadius: 16, padding:SPACING }]}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.jobTitle}>{item.jobTitle}</Text>
                <Image style={styles.image} source={{ uri: item.image }} />
              </View>
            </View>
          </TouchableOpacity>
        }}
      />
    </SafeAreaView>
  )
}

export default SalonList

const styles = StyleSheet.create({
  name: {
    fontWeight: '700',
    fontSize: 18
  },
  jobTitle: {
    fontSize: 11,
    opacity: .7
  },
  image: {
    width: ITEM_HEIGHT * .8,
    height: ITEM_HEIGHT * .8,
    borderRadius: ITEM_HEIGHT * .8,
    resizeMode: 'contain',
    position: "absolute",
    top: ((ITEM_HEIGHT / 2) - (ITEM_HEIGHT * .8) / 2),
    right: ((ITEM_HEIGHT / 2) - (ITEM_HEIGHT * .8) / 2)
  }
})
