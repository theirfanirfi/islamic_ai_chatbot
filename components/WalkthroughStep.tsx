import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');


const WalkthroughStep = ({ currentData }) => {
  return (

   
      <View style={styles.content}>

       <Image source={currentData.image} style={styles.mainContainer} />

        {/* Main Button */}
        <View style={styles.activeMainButton}>
          <Text style={[styles.mainButtonEmoji, currentData.mainButton.active && styles.activeMainEmoji]}>
            {currentData.mainButton.emoji}
          </Text>
          <Text style={[styles.mainButtonText, currentData.mainButton.active && styles.activeMainButtonText]}>
            {currentData.mainButton.text}
          </Text>
        </View>

        {/* Verified Scholars Badge */}
        {/* <View style={styles.verifiedBadge}>
          <Text style={styles.verifiedEmoji}>🎓</Text>
          <Text style={styles.verifiedText}>Verified Scholars</Text>
        </View> */}

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{currentData.title}</Text>
          <Text style={styles.subtitle}>{currentData.subtitle}</Text>
        </View>
      </View>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF7',
    width: width,
    height: height,
  },
  statusBar: {
    height: 54,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  timeText: {
    fontFamily: 'SF Pro',
    fontWeight: '590',
    fontSize: 17,
    color: '#000000',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  signalBars: {
    width: 19.2,
    height: 12,
    backgroundColor: '#000000',
  },
  wifiIcon: {
    width: 17.14,
    height: 12,
    backgroundColor: '#000000',
  },
  batteryIcon: {
    width: 25,
    height: 13,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 4.3,
    opacity: 0.35,
    position: 'relative',
  },
  batteryLevel: {
    position: 'absolute',
    width: 21,
    height: 9,
    backgroundColor: '#000000',
    borderRadius: 2.5,
    left: 1,
    top: 1,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 28,
  },
  mainContainer: {
    width: width * 0.9,
    borderRadius: 32,
    overflow: 'hidden',
  },
  blurShape: {
    position: 'absolute',
    width: 196,
    height: 267,
    backgroundColor: '#CBB26A',
    opacity: 0.4,
    borderRadius: 100,
  },
  blurShape1: {
    left: -23,
    top: 231,
  },
  blurShape2: {
    right: -23,
    top: 4,
  },
  testimonialCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 16,
    marginTop: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '600',
    fontSize: 16,
    color: '#1F1F1F',
  },
  profileTitle: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '400',
    fontSize: 12,
    color: '#666',
  },
  testimonialText: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    color: '#1F1F1F',
  },
  floatingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
  },
  activeButton: {
    backgroundColor: 'rgba(203, 178, 106, 0.16)',
    borderColor: 'rgba(203, 178, 106, 0.4)',
  },
  buttonEmoji: {
    fontSize: 20,
    color: 'rgba(255, 184, 29, 0.16)',
  },
  activeEmoji: {
    color: 'rgba(203, 178, 106, 0.16)',
  },
  buttonText: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '500',
    fontSize: 14,
    color: '#1F1F1F',
  },
  activeButtonText: {
    color: '#CBB26A',
  },
  mainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  activeMainButton: {
    backgroundColor: 'rgba(203, 178, 106, 0.16)',
    borderColor: 'rgba(203, 178, 106, 0.4)',
  },
  mainButtonEmoji: {
    fontSize: 20,
    color: 'rgba(255, 184, 29, 0.16)',
  },
  activeMainEmoji: {
    color: 'rgba(203, 178, 106, 0.16)',
  },
  mainButtonText: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '500',
    fontSize: 14,
    color: '#1F1F1F',
  },
  activeMainButtonText: {
    color: '#CBB26A66',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(203, 178, 106, 0.1)',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    gap: 6,
  },
  verifiedEmoji: {
    fontSize: 16,
  },
  verifiedText: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '500',
    fontSize: 12,
    color: '#CBB26A',
  },
  textContainer: {
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: 'Lora',
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 36,
    textAlign: 'center',
    color: '#1F1F1F',
  },
  subtitle: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 22,
    textAlign: 'center',
    color: '#484848',
    maxWidth: 324,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  progressDot: {
    width: 12,
    height: 12,
    backgroundColor: 'rgba(203, 178, 106, 0.2)',
    borderRadius: 6,
  },
  activeDot: {
    backgroundColor: '#CBB26A',
  },
  nextButtonContainer: {
    position: 'absolute',
    bottom: 88,
    left: 16,
    right: 16,
    height: 68,
    borderRadius: 100,
    padding: 6,
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#000000',
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 16,
  },
  nextButtonText: {
    fontFamily: 'Lora',
    fontWeight: '500',
    fontSize: 16,
    color: '#FFFFFF',
  },
  arrowIcon: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  homeIndicator: {
    position: 'absolute',
    bottom: 8,
    left: '50%',
    marginLeft: -69.5,
    width: 139,
    height: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 100,
  },
});
export default WalkthroughStep;
