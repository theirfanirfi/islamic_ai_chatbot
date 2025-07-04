import StepIndicator from '@/components/StepIndicator';
import WalkthroughStep from '@/components/WalkthroughStep';
import { WALKTHROUGH_STEPS } from '@/utils/constants';
import React, { useRef, useState } from 'react';
import { Animated, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const WalkthroughScreen = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const nextStep = () => {
    if (currentStep < WALKTHROUGH_STEPS.length - 1) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setCurrentStep(currentStep + 1);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    } else {
      onComplete();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      <View style={styles.content}>
        <Animated.View style={[styles.stepContainer, { opacity: fadeAnim }]}>
          <WalkthroughStep step={WALKTHROUGH_STEPS[currentStep]} />
        </Animated.View>
        
        <View style={styles.footer}>
          <StepIndicator steps={WALKTHROUGH_STEPS} currentStep={currentStep} />
          
          <TouchableOpacity style={styles.nextButton} onPress={nextStep}>
            <Text style={styles.nextButtonText}>
              {currentStep === WALKTHROUGH_STEPS.length - 1 ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#667eea',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  stepContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  nextButtonText: {
    color: '#667eea',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WalkthroughScreen;
