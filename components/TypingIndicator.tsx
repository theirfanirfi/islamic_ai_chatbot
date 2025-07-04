import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

const TypingIndicator = () => {
  return (
    <View style={styles.container}>
      <View style={styles.indicator}>
        <Text style={styles.text}>AI is typing</Text>
        <View style={styles.dots}>
          <Animated.View style={styles.dot} />
          <Animated.View style={styles.dot} />
          <Animated.View style={styles.dot} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  indicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 20,
    maxWidth: '60%',
    elevation: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  text: {
    color: '#666',
    marginRight: 8,
  },
  dots: {
    flexDirection: 'row',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#666',
    marginHorizontal: 1,
  },
});

export default TypingIndicator;