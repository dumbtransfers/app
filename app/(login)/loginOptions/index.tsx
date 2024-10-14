import React, {useEffect,useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { useAppKit, useWalletInfo } from '@reown/appkit-wagmi-react-native'
import { useAccount } from 'wagmi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const LoginScreenOptions = () => {
    const { address } = useAccount(); // Directly destructuring address from useAccount
    const [mpcWallet, setMpcWallet] = useState('')

  const handleGoogleLogin = () => {
    // Logic for Google login
    console.log('Continue with Google');
  };
  const handleEmailLogin = () => {
    // Logic for Email login
    console.log('Continue with Email');
  };

  useEffect(() => {
    if(address){
        router.replace('/(home)');
        AsyncStorage.setItem('walletAddress', address );    
    }
  },[address])
    const { open, close } = useAppKit()

  // Trigger wallet login
  const handleWalletLogin = async () => {
    try {
    //   close(); 
      // await AppKit.connectWallet();
      await open({ view: 'Account' });
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../../../assets/images/icon.png')} // Add your image here
            style={styles.iconImage}
          />
        </View>
        <Text style={styles.titleText}>Create an Account</Text>
      </View>

      <View style={styles.optionsSection}>
        <TouchableOpacity style={styles.optionButton} onPress={handleGoogleLogin}>
          <Text style={styles.optionButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={handleWalletLogin}>
  <View style={styles.iconTextContainer}>
    <Image source={require('../../../assets/images/wallet.png')} style={styles.iconImageWallet} />
    <Text style={styles.optionButtonText}>Continue with Wallet</Text>
  </View>
</TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.orText}>Or</Text>
          <View style={styles.divider} />
        </View>

        <TouchableOpacity style={styles.emailButton} onPress={handleEmailLogin}>
          <Text style={styles.emailButtonText}>Continue with Email</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topSection: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#2C40F0',
    borderWidth: 2,
    marginBottom: 20,
  },
  iconImage: {
    width: 80,
    height: 80,
    // tintColor: '#2C40F0',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  optionsSection: {
    flex: 3,
    width: '100%',
    alignItems: 'center',
  },
  optionButton: {
    backgroundColor: '#2C40F0',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginBottom: 20,
    width: '80%',
  },
  optionButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  iconTextContainer: {
    flexDirection: 'row',  // Align items in a row (icon left, text right)
    alignItems: 'center',  // Vertically align the icon and text in the center
  },
  iconImageWallet: {
    width: 24,  // Adjust the width of the wallet icon
    height: 24, // Adjust the height of the wallet icon
    marginRight: 10, // Add some spacing between the icon and the text
    paddingRight:20
  },
//   optionButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  orText: {
    marginHorizontal: 10,
    color: '#A0A0A0',
  },
  emailButton: {
    borderColor: '#E0E0E0',
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    width: '80%',
  },
  emailButtonText: {
    color: '#A0A0A0',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LoginScreenOptions;
