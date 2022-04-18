import React, { Component } from 'react';
import {
  Animated,
  StyleSheet,
  View,
} from 'react-native';

const PULSING_INTERVAL = 500;
const CIRCLE_RADIUS = 10;

const styles = StyleSheet.create({
  circle: {
    height: CIRCLE_RADIUS * 2,
    width: CIRCLE_RADIUS * 2,
    backgroundColor: '#ff1133',
    borderRadius: CIRCLE_RADIUS,
  },
});

class PulsingCircle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: new Animated.Value(1),
    };
  }

  componentDidMount() {
    const { pulse } = this.props;
    if (pulse) this.cyclicAnimate();
  }

  cyclicAnimate() {
    const { scale } = this.state;
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.1,
        duration: PULSING_INTERVAL,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: PULSING_INTERVAL,
        useNativeDriver: true,
      }),
    ]).start(() => this.cyclicAnimate());
  }

  render() {
    const { scale } = this.state;
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <View {...this.props}>
        <Animated.View style={[styles.circle, { transform: [{ scale }] }]} />
      </View>
    );
  }
}

export default PulsingCircle;
