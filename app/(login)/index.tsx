import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [authError, setAuthError] = useState<string | null>(null);

  const handleNavigation = async () => {
    try {
      // Store auth status without Lit Protocol for now
      await AsyncStorage.setItem('isInitialized', 'true');
      // Navigate to login options
      router.push('/loginOptions');
    } catch (error) {
      console.error('Navigation failed:', error);
      setAuthError('Failed to proceed to login');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.appTitle}>DumbTransfers</Text>
        <View style={styles.iconContainer}>
          <Image
            source={require('../../assets/images/icon.png')} // Add your image here
            style={styles.iconImage}
          />
        </View>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity onPress={handleNavigation} style={styles.loginButton}>
          <Text style={styles.loginButtonText} >Log In</Text>
        </TouchableOpacity>

        <Text style={styles.signUpText}>
          Don't have an account?{' '}
          <Text style={styles.signUpLink}>
            Sign Up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topSection: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C40F0',
  },
  iconContainer: {
    marginTop: 30,
    width: 150,
    height: 150,
    // backgroundColor: '#2C40F0',
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor:'#2C40F0',
    borderWidth:3
  },
  iconImage: {
    width: 100,
    height: 100,
    borderRadius: 75,

  },
  bottomSection: {
    flex: 1,
    backgroundColor: '#2C40F0',
    paddingTop:100,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
    paddingBottom: 100,
  },
  loginButton: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 120,
    borderRadius: 10,
    marginBottom:25,

  },
  loginButtonText: {
    color: '#2C40F0',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpText: {
    color: 'white',
    fontSize: 14,
  },
  signUpLink: {
    color: 'white',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
