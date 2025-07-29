import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const { width, height } = Dimensions.get('window');

const SendFeedbackScreen = ({ navigation }) => {
  const [feedback, setFeedback] = useState('');
  const router = useRouter();

  const handleSendFeedback = () => {
    // Handle feedback submission logic here
    console.log('Feedback submitted:', feedback);
    // You can navigate back or show success message
    // navigation?.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F6F1" />
      
      {/* Background blur shapes */}
      <BlurView style={styles.blurShape1} />
      <BlurView style={styles.blurShape2} />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <TouchableOpacity style={styles.backButton} onPress={() => {
            router.dismiss();
          }}>
            <Ionicons name="arrow-back" size={16} color="#1F1F1F" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Send Feedback</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>We Value Your Feedback</Text>
          <Text style={styles.subtitle}>
            Help us improve your experience with the DeenCircle app.
          </Text>
        </View>

        {/* Feedback Form */}
        <View style={styles.formContainer}>
          <View style={styles.textFieldContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.labelText}>Feedback</Text>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Leave your feedback..."
              placeholderTextColor="#484848"
              value={feedback}
              onChangeText={setFeedback}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Send Button */}
        <TouchableOpacity style={styles.sendButton} onPress={handleSendFeedback}>
          <Text style={styles.sendButtonText}>Send feedback</Text>
          <Image source={require('../../assets/images/arrow_left_send_icon.png')} />
          {/* <View style={styles.arrowIcon}>
            <Ionicons name="arrow-forward" size={24} color="#000000" />
          </View> */}
        </TouchableOpacity>
      </View>

      {/* Home Indicator */}
      <View style={styles.homeIndicator} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6F1',
    width: width,
    height: height,
  },
  blurShape1: {
    position: 'absolute',
    width: width * 0.95,
    height: height * 0.3,
    top: height * 0.1,
    backgroundColor: 'hsla(41, 100%, 56%, 0.04)',
    borderRadius: 50,
    marginHorizontal: width * 0.025,
  },
  blurShape2: {
    position: 'absolute',
    width: width * 0.95,
    height: height * 0.3,
    bottom: 12,
    backgroundColor: 'rgba(255, 184, 29, 0.04)',
    borderRadius: 50,
    marginHorizontal: width * 0.025, // 2.5% margin on both sides
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 54, // Account for status bar
    height: 96,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  backButton: {
    width: 42,
    height: 42,
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  headerTitle: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 24,
    color: '#1F1F1F',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 32,
  },
  titleSection: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  mainTitle: {
    fontFamily: 'Lora',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 32,
    color: '#1F1F1F',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 20,
    color: '#484848',
    textAlign: 'center',
  },
  formContainer: {
    gap: 14,
  },
  textFieldContainer: {
    borderWidth: 1,
    borderColor: '#3D6633',
    borderRadius: 20,
    position: 'relative',
    minHeight: 126,
  },
  labelContainer: {
    position: 'absolute',
    top: -8,
    left: 22,
    backgroundColor: '#F8F6F1', // Changed to match container background
    paddingHorizontal: 4,
    zIndex: 1,
  },
  labelText: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: '#3D6633',
  },
  textInput: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: '#484848',
    padding: 16,
    paddingTop: 20,
    minHeight: height * 0.2,
    textAlignVertical: 'top',
  },
  sendButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#89A688',
    borderRadius: 40,
    height: height * 0.07,
    gap: 10,
  },
  sendButtonText: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 20,
    color: '#FFFFFF',
  },
  arrowIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeIndicator: {
    position: 'absolute',
    bottom: 8,
    left: (width - 139) / 2,
    width: 139,
    height: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.16)',
    borderRadius: 100,
  },
});

export default SendFeedbackScreen;