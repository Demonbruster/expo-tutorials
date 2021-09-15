import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { SharedElement } from 'react-navigation-shared-element';
import { NavigationProp } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable'

import { SPACING } from '../../utils/extras'
import Layout from '../../utils/Layout';
import { ITEM_HEIGHT } from './SalonList';
import { detailsIcons } from './salon';

interface Props {
  navigation: NavigationProp<any, any>,
  route: any
}

const { height, width } = Layout.window;
const TOP_HEADER_HEIGHT = height * 0.3;
const DURATION = 400;

const SalonDetails = (props: Props) => {
  const { item } = props.route.params
  return (
    <View style={{ flex: 1 }}>
      <Ionicons
        name="arrow-back"
        size={28}
        style={{
          padding: 12,
          position: "absolute",
          top: SPACING * 2,
          left: SPACING,
          zIndex: 2
        }}
        color={'#333'}
        onPress={() => { props.navigation.goBack() }}
      />
      <SharedElement id={`item.${item.key}.bg`} style={[StyleSheet.absoluteFillObject]}>
        <View style={[StyleSheet.absoluteFillObject, {
          backgroundColor: item.color,
          borderRadius: 0,
          padding: SPACING,
          height: TOP_HEADER_HEIGHT + 32
        }]} />
      </SharedElement>
      <SharedElement id={`item.${item.key}.name`}>
        <Text style={styles.name}>{item.name}</Text>
      </SharedElement>
      <SharedElement id={`item.${item.key}.jobTitle`}>
        <Text style={styles.jobTitle}>{item.jobTitle}</Text>
      </SharedElement>
      <SharedElement id={`item.${item.key}.image`}>
        <Image style={styles.image} source={{ uri: item.image }} />
      </SharedElement>
      <SharedElement id='general.bg'>
        <View style={styles.bg} >
          <ScrollView>
            <View style={{
              flexDirection: "row",
              justifyContent: 'space-evenly',
              marginVertical: SPACING,
              marginBottom: SPACING
            }}>
              {detailsIcons.map((dIcon: any, index) => {
                return (
                  <Animatable.View
                    animation="bounceIn"
                    delay={DURATION + index * 100}
                    key={`${dIcon.icon}-${index}`}
                    style={{
                      backgroundColor: dIcon.color,
                      height: 64,
                      width: 64,
                      borderRadius: 32,
                      alignItems: 'center',
                      justifyContent: "center"
                    }}>
                    <Ionicons name={dIcon.icon} size={24} color={"white"} />
                  </Animatable.View>
                )
              })}
            </View>
            <View>
              {item.categories.map((category: any, index: number) => (
                <Animatable.View
                  key={`category.key-${category.key}`}
                  style={{ marginVertical: SPACING }}
                  animation="fadeInUp"
                  delay={DURATION + index * 200}
                >
                  <Text style={styles.title}>{category.title}</Text>
                  {category.subcats.map((subCat: any, index: number) => (
                    <View key={`Category.subcats-${index}`} style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: SPACING / 2,
                      marginLeft: SPACING
                    }}>
                      <View style={{
                        height: 8,
                        width: 8,
                        borderRadius: 4,
                        backgroundColor: 'gold',
                        marginRight: SPACING,
                      }} />
                      <Text style={styles.subTitle}>{subCat}</Text>
                    </View>
                  ))}
                </Animatable.View>
              ))}
            </View>
          </ScrollView>
        </View>
      </SharedElement>
    </View>
  )
}

export default SalonDetails;

const styles = StyleSheet.create({
  name: {
    fontWeight: '700',
    fontSize: 20,
    position: "absolute",
    top: TOP_HEADER_HEIGHT - (SPACING * 3),
    left: SPACING
  },
  jobTitle: {
    fontSize: 11,
    opacity: .7,
    position: "absolute",
    top: TOP_HEADER_HEIGHT - (SPACING * 1.8),
    left: SPACING
  },
  image: {
    width: ITEM_HEIGHT * .8,
    height: (ITEM_HEIGHT * .8) - SPACING,
    borderRadius: ITEM_HEIGHT * .8,
    resizeMode: 'contain',
    position: "absolute",
    top: TOP_HEADER_HEIGHT - (ITEM_HEIGHT * .8),
    right: ((ITEM_HEIGHT / 2) - (ITEM_HEIGHT * .8) / 2)
  },
  bg: {
    position: 'absolute',
    width,
    height,
    backgroundColor: "white",
    transform: [{ translateY: TOP_HEADER_HEIGHT }],
    borderRadius: 32,
    padding: SPACING,
    paddingTop: 32 + SPACING
  },
  title: {
    fontWeight: "700",
    fontSize: 18,
    marginBottom: SPACING
  },
  subTitle: {
    fontSize: 14,
    opacity: .8
  }
})
