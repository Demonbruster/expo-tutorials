import { StyleSheet, Text, View, Dimensions, StatusBar as RNStatusBar } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import { NavigationProp } from '@react-navigation/core'
import { RootStackParamList } from '../../utils/Types'
import { StatusBar } from 'expo-status-bar'
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const Sheet = () => {
  const translateY = useSharedValue(0)
  const context = useSharedValue({ y: 0 })
  const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + (RNStatusBar.currentHeight ?? 50)
  const MIN_TRANSLATE_Y = -SCREEN_HEIGHT / 3

  const scrollTo = useCallback((y: number) => {
    'worklet';
    translateY.value = withSpring(y, { damping: 10, mass: 1, stiffness: 100 })
  }, [])

  const gesture = Gesture.Pan().onStart(() => {
    context.value = { y: translateY.value }
  }).onUpdate(({ translationY }) => {
    translateY.value = translationY + context.value.y
    translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y)
    translateY.value = Math.min(translateY.value, MIN_TRANSLATE_Y)
  }).onEnd(() => {
    if (translateY.value < -SCREEN_HEIGHT / 1.7) {
      scrollTo(MAX_TRANSLATE_Y)
    }else  if (translateY.value > -SCREEN_HEIGHT) {
      scrollTo(MIN_TRANSLATE_Y)
    }
  });

  useEffect(() => {
    scrollTo(MIN_TRANSLATE_Y)
  }, [])

  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(translateY.value, [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y], [25, 5], Extrapolate.CLAMP);
    return {
      borderRadius,
      transform: [{ translateY: translateY.value }]
    }
  })

  return <GestureDetector gesture={gesture} >
    <Animated.ScrollView style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
      <View style={styles.line} />
    </Animated.ScrollView>
  </GestureDetector>

}
type Props = {
  navigation: NavigationProp<RootStackParamList, 'bottom-sheet'>
}

const BottomSheet = (props: Props) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar style="light" />
        <Sheet />
      </View>
    </GestureHandlerRootView>
  )
}

export default BottomSheet

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 25,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 2,
  }
})