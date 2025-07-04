import React from 'react';
import { StyleSheet, View } from 'react-native';

const StepIndicator = ({ steps, currentStep }) => {
  return (
    <View style={styles.container}>
      {steps.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            { backgroundColor: index === currentStep ? '#fff' : 'rgba(255,255,255,0.3)' }
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default StepIndicator;