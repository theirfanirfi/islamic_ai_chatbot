import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { ArrowLeft, Check } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
const { width, height } = Dimensions.get('window');

const PrivacyPolicyScreen = () => {
  const [isAgreed, setIsAgreed] = useState(false);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F6F1" />
      
      {/* Background shapes */}
      <BlurView style={styles.topShape} />
      <BlurView style={styles.bottomShape} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => {router.dismiss();}}>
          <ArrowLeft size={16} color="#1F1F1F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={{ width: 42 }} />
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.mainTitle}>
            Your Privacy Matters at DeenCircle
          </Text>
          
          <Text style={styles.bodyText}>
            At DeenCircle, we respect your privacy and are dedicated to protecting your personal information. We collect data solely to enhance your spiritual journey and provide a more personalized experience.{'\n\n'}
            Your information is never shared, sold, or disclosed to third parties without your consent. All user data is securely encrypted and stored to maintain confidentiality.{'\n\n'}
            You remain in full control of your profile and can update or delete your data at any time. Our app follows strong security protocols to safeguard your information from unauthorized access.{'\n\n'}
            By using DeenCircle, you agree to our data practices as outlined in this policy. We regularly update our security systems to ensure your information remains protected. For full details, please review our complete Privacy Policy.{'\n\n'}
            Our app follows strong security protocols to safeguard your information from unauthorized access.
          </Text>
          
          {/* Agreement Section */}
          <View style={styles.agreementSection}>
            <TouchableOpacity 
              style={styles.checkbox}
              onPress={() => setIsAgreed(!isAgreed)}
            >
              <View style={[styles.checkboxInner, isAgreed && styles.checkboxChecked]}>
                {isAgreed && <Check size={12} color="#FFFFFF" />}
              </View>
            </TouchableOpacity>
            <Text style={styles.agreementText}>
              I agree to the Privacy Policy and Terms & Conditions.
            </Text>
          </View>
          
          <Text style={styles.lastUpdated}>
            Last updated May 12, 2024
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6F1',
  },
  topShape: {
    position: 'absolute',
    width: width * 0.95,
    height: height * 0.3,
    top: height * 0.1,
    backgroundColor: 'hsla(41, 100%, 56%, 0.06)',
    borderRadius: 50,
    marginHorizontal: width * 0.025,
  },
  bottomShape: {
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
    paddingVertical: 12,
    marginTop: 10,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
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
    fontFamily: 'System',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 24,
    color: '#1F1F1F',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 16,
  },
  content: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 40,
  },
  mainTitle: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 32,
    color: '#1F1F1F',
    marginBottom: 24,
  },
  bodyText: {
    fontFamily: 'System',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    color: '#484848',
    marginBottom: 40,
  },
  agreementSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    gap: 12,
  },
  checkbox: {
    marginTop: 2,
  },
  checkboxInner: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#89A688',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#89A688',
  },
  agreementText: {
    flex: 1,
    fontFamily: 'System',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    color: '#484848',
  },
  lastUpdated: {
    fontFamily: 'System',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
    color: '#262626',
  },
});

export default PrivacyPolicyScreen;