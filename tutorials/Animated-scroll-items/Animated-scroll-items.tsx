import React from 'react';
import { StatusBar as RNStatusBar, Image, Animated, Text, View, StyleSheet } from 'react-native';
import faker from 'faker'
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface IProps {
  navigation: NavigationProp<any, any>
}

faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.random.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.random.number(60)}.jpg`,
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

const BG_IMG = 'https://images.pexels.com/photos/1231265/pexels-photo-1231265.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260';

export default function AnimatedScrollItems(props: IProps) {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Image source={{ uri: BG_IMG }} style={StyleSheet.absoluteFillObject} blurRadius={80} />
      <Animated.FlatList
        data={DATA}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        keyExtractor={item => item.key}
        contentContainerStyle={{ padding: SPACING, paddingTop: RNStatusBar.currentHeight || 42 }}
        renderItem={({ item, index }) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2)
          ];

          const inputOpacityRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 1)
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0]
          })

          const opacity = scrollY.interpolate({
            inputRange: inputOpacityRange,
            outputRange: [1, 1, 1, 0]
          })

          return <TouchableOpacity onPress={()=>{props.navigation.navigate('TransitionNavShared')}}>
            <Animated.View
              style={{
                flexDirection: "row",
                padding: SPACING,
                marginBottom: SPACING,
                backgroundColor: "rgba(255,255,255,0.8)",
                borderRadius: 12,
                shadowColor: "#000000",
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: .3,
                shadowRadius: 20,
                elevation: 50,
                transform: [{ scale }],
                opacity
              }}>
              <Image
                source={{ uri: item.image }}
                style={{ width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: AVATAR_SIZE, marginRight: SPACING / 2 }}
              />
              <View>
                <Text style={{ fontSize: 20, fontWeight: '700' }}>{item.name}</Text>
                <Text style={{ fontSize: 16, opacity: .7 }}>{item.jobTitle}</Text>
                <Text style={{ fontSize: 12, opacity: .8, color: "#0099cc" }}>{item.email}</Text>
              </View>
            </Animated.View>
          </TouchableOpacity>
        }} />
    </SafeAreaView>
  );
}

