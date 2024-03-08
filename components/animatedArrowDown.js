import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, Animated, Easing } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AnimatedArrowDown = () => {
  const rotationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Rotate the arrow down icon when the component mounts
    Animated.timing(rotationValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, []);

  const rotateArrow = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['60deg', '0deg'],
  });

  return (
    <View className='mt-5'>
      <TouchableOpacity>
        <Animated.View style={{ transform: [{ rotate: rotateArrow }] }}>
          <Ionicons name="arrow-down" size={45} />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default AnimatedArrowDown;
