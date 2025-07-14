import { clearError, loginUser, registerUser, setUser } from '@/slice/UserSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const AuthScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, isAuthenticated, token, user } = useSelector((state) => state.user);
  console.log(user);
  
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });

  const storeUserData = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('user', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };
  
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e)
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when user starts typing
    if (error) {
      dispatch(clearError());
    }
  };

  const validateForm = () => {
    if (isLogin) {
      if (!formData.email || !formData.password) {
        Alert.alert('Error', 'Please fill in all fields');
        return false;
      }
    } else {
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        Alert.alert('Error', 'Please fill in all fields');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return false;
      }
      if (formData.password.length < 6) {
        Alert.alert('Error', 'Password must be at least 6 characters long');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      if (isLogin) {
        const result = await dispatch(loginUser({
          email: formData.email,
          password: formData.password,
        }));
        
        if (loginUser.fulfilled.match(result)) {
          dispatch(setUser(result));
          console.log('my result',result);
          await storeUserData(result);
          router.replace("(chatbot)");
          Alert.alert('Success', 'Login successful');
        }
      } else {
        console.log('registration data',formData)
        const result = await dispatch(registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }));
        
        if (registerUser.fulfilled.match(result)) {
          dispatch(setUser(result));
          await storeUserData(result);
          router.replace("(chatbot)");
          Alert.alert('Success', 'Registration successful');
        }
      }
    } catch (err) {
      console.error('Auth error:', err);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
    });
    // Clear any existing errors
    if (error) {
      dispatch(clearError());
    }
  };

  // Show error alert when error state changes
  React.useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor="#2E7D32" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>☪</Text>
          </View>
          <Text style={styles.appTitle}>Islamic AI Assistant</Text>
          <Text style={styles.subtitle}>
            {isLogin ? 'Welcome Back' : 'Create Your Account'}
          </Text>
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>
              {isLogin ? 'Sign In' : 'Sign Up'}
            </Text>

            {!isLogin && (
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  placeholderTextColor="#9E9E9E"
                  value={formData.name}
                  onChangeText={(value) => handleInputChange('name', value)}
                  autoCapitalize="words"
                />
              </View>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#9E9E9E"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#9E9E9E"
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                secureTextEntry
              />
            </View>

            {!isLogin && (
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm your password"
                  placeholderTextColor="#9E9E9E"
                  value={formData.confirmPassword}
                  onChangeText={(value) => handleInputChange('confirmPassword', value)}
                  secureTextEntry
                />
              </View>
            )}

            {isLogin && (
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity 
              style={[styles.submitButton, loading && styles.submitButtonDisabled]} 
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.submitButtonText}>
                  {isLogin ? 'Sign In' : 'Create Account'}
                </Text>
              )}
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity style={styles.toggleContainer} onPress={toggleAuthMode}>
              <Text style={styles.toggleText}>
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <Text style={styles.toggleLink}>
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            "And whoever relies upon Allah - then He is sufficient for him."
          </Text>
          <Text style={styles.footerVerse}>- Quran 65:3</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E7D32',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoText: {
    fontSize: 40,
    color: '#2E7D32',
    fontWeight: 'bold',
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#E8F5E8',
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#424242',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#424242',
    backgroundColor: '#FAFAFA',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#2E7D32',
    fontSize: 14,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonDisabled: {
    backgroundColor: '#9E9E9E',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#9E9E9E',
    fontSize: 14,
  },
  socialButton: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  socialButtonText: {
    color: '#424242',
    fontSize: 16,
    fontWeight: '600',
  },
  toggleContainer: {
    alignItems: 'center',
  },
  toggleText: {
    color: '#616161',
    fontSize: 16,
  },
  toggleLink: {
    color: '#2E7D32',
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    color: '#E8F5E8',
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 5,
  },
  footerVerse: {
    color: '#A5D6A7',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default AuthScreen;