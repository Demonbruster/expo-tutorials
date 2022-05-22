import { NavigationProp } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { SharedElement } from 'react-navigation-shared-element';

import { SPACING } from '../../utils/extras'
import Layout from '../../utils/Layout'
import { TransitionNavSharedParamList } from '../../utils/Types';
import salonData from './salon'

interface Props {
  navigation: NavigationProp<TransitionNavSharedParamList, 'List'>
}

const { height, width } = Layout.window;

export const ITEM_HEIGHT = height * 0.18

const SalonList = (props: Props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={salonData}
        keyExtractor={item => `item.key-${item.key}`}
        contentContainerStyle={{ padding: SPACING }}
        renderItem={({ item }) => {
          return <TouchableOpacity onPress={() => {
            //@ts-ignore
            props.navigation.navigate('Details', { item })
          }}
            style={{ marginBottom: SPACING, height: ITEM_HEIGHT }}>
            <View style={{ flex: 1, padding: SPACING }}>
              <SharedElement id={`item.${item.key}.bg`} style={[StyleSheet.absoluteFillObject]}>
                <View style={[StyleSheet.absoluteFillObject, {
                  backgroundColor: item.color,
                  borderRadius: 16,
                  padding: SPACING
                }]} />
              </SharedElement>
              <SharedElement id={`item.${item.key}.name`}>
                <Text style={styles.name}>{item.name}</Text>
              </SharedElement>
              <SharedElement id={`item.${item.key}.jobTitle`}>
                <Text style={styles.jobTitle}>{item.jobTitle}</Text>
              </SharedElement>
              <SharedElement id={`item.${item.key}.image`} style={styles.image}>
                <Image style={styles.image} source={{ uri: item.image }} />
              </SharedElement>
            </View>
          </TouchableOpacity>
        }}
      />
      <SharedElement id="general.bg">
        <View style={styles.bg} />
      </SharedElement>
    </SafeAreaView>
  )
}

export default SalonList

const styles = StyleSheet.create({
  name: {
    fontWeight: '700',
    fontSize: 18,
    position: 'absolute'
  },
  jobTitle: {
    fontSize: 11,
    opacity: .7,
    marginTop: 18 * 1.2,
    position: 'absolute'
  },
  image: {
    width: ITEM_HEIGHT * .8,
    height: ITEM_HEIGHT * .8,
    borderRadius: ITEM_HEIGHT * .8,
    resizeMode: 'contain',
    position: "absolute",
    top: ((ITEM_HEIGHT / 2) - (((ITEM_HEIGHT * .8) / 2) + 5)),
    right: ((ITEM_HEIGHT / 2) - (ITEM_HEIGHT * .8) / 2)
  },
  bg: {
    position: 'absolute',
    width,
    height,
    backgroundColor: "red",
    transform: [{ translateY: height }],
    borderRadius: 32
  }
})
