import React from 'react';
import { Animated, Easing } from 'react-native';
import { ANIMATION_DURATION } from '../../utils/constants';

const Filled = ({ filled, start }) => {
  const [opacityValue] = React.useState(new Animated.Value(0));
  const [scaleValue] = React.useState(new Animated.Value(0.8));

  // fade in animation
  React.useEffect(() => {
    start && Animated.timing( 
      opacityValue,
      {
        toValue: 1,
        duration: ANIMATION_DURATION,
        easing: Easing.linear(),
        useNativeDriver: true,
      }
    ).start();
  }, [start]);

  // bounce animation
  React.useEffect(() => {
    filled && Animated.spring(
      scaleValue,
      {
        toValue: 1,
        easing: Easing.cubic(),
        useNativeDriver: true,
      }
    ).start();
  }, [filled]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: filled ? (filled === 1 )? 'blue' : 'green': 'grey',
        opacity: opacityValue,
        transform: [
          {
            scale: scaleValue,
          }
        ],
      }}
    />
  );
}

export default Filled;
