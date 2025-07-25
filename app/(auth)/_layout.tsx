import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');


const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>

      
      {/* Background blur shapes */}
     <LinearGradient colors={['rgba(255, 184, 29, 0.24)', '#FAFAF7']} dither={false} style={styles.topBlur}>
      <Text style={styles.appTitle}>DeenCircle</Text>

      
    </LinearGradient>
         <LinearGradient colors={['rgba(255, 184, 29, 0.1)', '#FAFAF7']} style={styles.bottomBlur}>

      
    </LinearGradient>

      {/* App Title */}

      {/* Book Image Card */}
      <View style={styles.imageCard}>
      <Image style={{alignSelf:'center', top:-150}} width={width*0.6} height={height*0.42} source={require('../../assets/images/quran_image.png')} />
    </View>
    
        {/* Book Container */}

      {/* Main Content Container */}
      <View style={styles.mainContainer}>
        {/* Welcome Text */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome back to{'\n'}Ihsan AI</Text>
          <Text style={styles.welcomeSubtitle}>Peace Be Upon You</Text>
        </View>

        {/* Form Fields */}
        <View style={styles.fieldsContainer}>
          {/* Email Field */}
          <View style={styles.fieldWrapper}>
            <View style={styles.textField}>
              <View style={styles.labelContainer}>
                <Text style={styles.labelText}>Email</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Enter email address"
                placeholderTextColor="rgba(31, 31, 31, 0.6)"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Password Field */}
          <View style={styles.fieldWrapper}>
            <View style={styles.textField}>
              <View style={styles.labelContainer}>
                <Text style={styles.labelText}>Password</Text>
              </View>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter password"
                  placeholderTextColor="rgba(31, 31, 31, 0.6)"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  {showPassword ? (
                    <EyeOff size={16} color="#484848" />
                  ) : (
                    <Eye size={16} color="#484848" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </View>
        </View>

        {/* Buttons Container */}
        <View style={styles.buttonsContainer}>
          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={() => router.replace('(chatbot)')}>
            <Text style={styles.loginButtonText}>Login to your account</Text>
          </TouchableOpacity>

          {/* Google Button */}
          <View style={styles.secondaryButtonsContainer}>
            <TouchableOpacity style={styles.googleButton}>
              <View style={styles.googleIcon}>
                <View style={styles.googleIconPart1} />
                <View style={styles.googleIconPart2} />
                <View style={styles.googleIconPart3} />
                <View style={styles.googleIconPart4} />
              </View>
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            {/* Continue as Guest */}
            <TouchableOpacity>
              <Text style={styles.guestText}>Continue as guest</Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up Text */}
           <TouchableOpacity>
          <Text style={styles.signUpText}>Don't have an account? <Text style={{color:'black'}}>Sign up</Text></Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Terms and Conditions */}
      <Text style={styles.termsText}>
        By Continuing, you are agree to our Terms and Conditions
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6F1',
    position: 'relative',
  },
  topBlur: {
    position: 'absolute',
    width: width * 0.94,
    height: height * 0.18,
    marginHorizontal: 18,
    top: height * 0.08,
    borderTopLeftRadius: 250,
    borderTopRightRadius: 250,

  },
  bottomBlur: {
    position: 'absolute',
    width: width * 0.95,
    height: height * 0.15,
    left: (width - 470) / 2 + 8,
    bottom:4,
    borderRadius: 50,
    marginHorizontal: 16,
  },
  statusBar: {
    height: 54,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  timeText: {
    fontFamily: 'System',
    fontSize: 17,
    fontWeight: '600',
    color: '#1F1F1F',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  signalBars: {
    width: 19.2,
    height: 11,
    backgroundColor: '#1F1F1F',
  },
  wifi: {
    width: 17.14,
    height: 12,
    backgroundColor: '#1F1F1F',
  },
  battery: {
    position: 'relative',
    width: 27,
    height: 13,
  },
  batteryBorder: {
    width: 25,
    height: 13,
    borderWidth: 1,
    borderColor: 'rgba(31, 31, 31, 0.35)',
    borderRadius: 4.3,
  },
  batteryCap: {
    position: 'absolute',
    width: 1.33,
    height: 4,
    right: -2,
    top: 4.5,
    backgroundColor: 'rgba(31, 31, 31, 0.4)',
    borderRadius: 1,
  },
  batteryCapacity: {
    position: 'absolute',
    width: 21,
    height: 9,
    left: 2,
    top: 2,
    backgroundColor: '#1F1F1F',
    borderRadius: 2.5,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#354134',
    textAlign: 'center',
    top: height * 0.0001,
    marginBottom: 60,
  },
  imageCard: {
    width: width*0.6,
    height: height*0.18,
    alignSelf: 'center',
    alignContent:'center',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    top: height * 0.15,
    borderColor: '#3D6633',
    marginBottom: 15,
  },
  bookContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  book: {
    width: 200,
    height: 120,
    flexDirection: 'row',
    backgroundColor: '#d4af7a',
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  leftPage: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-around',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  rightPage: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-around',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  arabicText: {
    height: 3,
    backgroundColor: '#8b4513',
    borderRadius: 1,
    marginVertical: 2,
  },
  digitalRain: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  rainDrop: {
    position: 'absolute',
    width: 2,
    height: 20,
    backgroundColor: 'rgba(255, 184, 29, 0.6)',
    borderRadius: 1,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 24,
    position: 'relative',
    top: height * 0.14,
    gap: 16,
  },
  welcomeSection: {
    alignItems: 'center',
    gap: 10,
  },
  welcomeTitle: {
    fontSize: 30,
    fontWeight: '700',
    lineHeight: 44,
    textAlign: 'center',
    color: '#1F1F1F',
  },
  welcomeSubtitle: {
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 22,
    textAlign: 'center',
    color: '#262626',
  },
  fieldsContainer: {
    gap: 20,
  },
  fieldWrapper: {
    gap: 4,
  },
  textField: {
    position: 'relative',
    height: 48,
    borderWidth: 1,
    borderColor: '#3D6633',
    borderRadius: 24,
    justifyContent: 'center',
  },
  labelContainer: {
    position: 'absolute',
    top: -8,
    left: 22,
    backgroundColor: '#F8F6F1',
    paddingHorizontal: 4,
    zIndex: 1,
  },
  labelText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#3D6633',
  },
  input: {
    height: 48,
    paddingHorizontal: 20,
    fontSize: 12,
    color: '#1F1F1F',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    paddingHorizontal: 20,
  },
  passwordInput: {
    flex: 1,
    fontSize: 12,
    color: '#1F1F1F',
  },
  eyeIcon: {
    padding: 4,
  },
  forgotPassword: {
    fontSize: 12,
    fontWeight: '500',
    color: '#B87E00',
    textAlign: 'right',
  },
  buttonsContainer: {
    gap: 12,
  },
  loginButton: {
    height: 54,
    backgroundColor: '#89A688',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  secondaryButtonsContainer: {
    gap: 12,
    alignItems: 'center',
  },
  googleButton: {
    height: 45,
    backgroundColor: 'rgba(184, 126, 0, 0.1)',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 8,
  },
  googleIcon: {
    width: 24,
    height: 24,
    position: 'relative',
  },
  googleIconPart1: {
    position: 'absolute',
    width: 12,
    height: 12,
    backgroundColor: '#E33629',
    borderRadius: 2,
  },
  googleIconPart2: {
    position: 'absolute',
    right: 0,
    width: 12,
    height: 12,
    backgroundColor: '#F8BD00',
    borderRadius: 2,
  },
  googleIconPart3: {
    position: 'absolute',
    bottom: 0,
    width: 12,
    height: 12,
    backgroundColor: '#587DBD',
    borderRadius: 2,
  },
  googleIconPart4: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    backgroundColor: '#319F43',
    borderRadius: 2,
  },
  googleButtonText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#1F1F1F',
  },
  guestText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#DA9603',
    textDecorationLine: 'underline',
  },
  signUpText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(31, 31, 31, 0.4)',
    textAlign: 'center',
    marginTop: 8,
  },
  termsText: {
    position: 'absolute',
    bottom: 10,
    left: 24,
    right: 24,
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.4)',
    textAlign: 'center',
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

export default AuthScreen;