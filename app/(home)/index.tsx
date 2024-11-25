import React, {useState, useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Bell, MoreHorizontal, MoreVertical,ArrowRight, Store } from 'lucide-react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import LoadingSpinner from '@/components/Loading';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useAccount, useBalance } from 'wagmi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AssistantCardContainer from  '@/components/AssistantCardContainer'

const HomeScreen = () => {
  const [mpcWallet, setMpcWallet] = useState('')
  const { address } = useAccount(); // Directly destructuring address from useAccount
  const chainId = 8453; // Base network chain ID
  const usdcContractAddress = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"

  const { data, isError, isLoading } = useBalance({
    address, // User's wallet address
    token: usdcContractAddress, // USDC token contract address
    chainId,
  });
  const asyncDataStorage = async(mpcWallet:any) => {
    await AsyncStorage.multiSet([
        ['mpcWallet', mpcWallet],
      ]);
} 
 
const registerUserWallet = async (address: any) => {
  try {
    const response = await fetch('https://coinbase-main-server.onrender.com/api/v1/wallet/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ metamaskAddress: address }),
    });

    const data = await response.json();
    console.log('Response data:', data);

    if (data?.message === 'User already registered with a wallet') {
      console.log('User already registered:', data);
      const walletId = data.user?.mpcWalletAddress?.id;
      if (walletId) {
        setMpcWallet(walletId);
        asyncDataStorage(walletId);
      }
    } else {
      console.log('New user registered:', data);
      const walletId = data.user?.mpcWalletAddress?.id;
      if (walletId) {
        setMpcWallet(walletId);
      }
    }
  } catch (error) {
    console.error('Error registering wallet:', error);
  }
};

  useEffect(() => {
    if(address){
      registerUserWallet(address)
    }
  },[address])
  return (
<ThemedView darkColor='#252222' style={{flex:1}} >
  <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/lautaro.jpg')}
          style={styles.profileImage}
        />
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconWrapper} onPress={() => router.push('/marketplace')}>
            <Store size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.iconWrapper}>
            <MoreHorizontal size={24} color="#FFFFFF" />
          </View>
        </View>
      </View>

      <ThemedView darkColor='#252222' style={styles.balanceContainer}>
        {/* <ThemedText lightColor='#4D49FC'  darkColor='black' type="title" >{isLoading ? <LoadingSpinner/> : ( data?.formatted, data?.symbol)}</ThemedText> */}
        <ThemedText lightColor='#4D49FC'  darkColor='black' type="title" >$200</ThemedText>
        <ThemedText lightColor='#4D49FC' darkColor='' style={styles.balanceText}>Current Balance</ThemedText>
      </ThemedView>

      <TouchableOpacity style={styles.topUpButton}>
        <Text style={styles.topUpButtonText}>Top Up</Text>
      </TouchableOpacity>
      <AssistantCardContainer/>
      {/* <View style={styles.secondContainer}>
        <ThemedText lightColor='#4D49FC' style={styles.subTitle} type="title">Asistentes</ThemedText>
        <TouchableOpacity onPress={() => router.push('/chat')} style={styles.box}>
        <View style={styles.boxContent}>
          <View style={styles.boxHeader}>
            <Image
              source={require('../../assets/images/chat-bot.webp')}
              style={styles.boxImage}
            />
            <Text style={styles.boxName}>Sofia</Text>
            <ArrowRight size={44} color="#FFFFFF" style={styles.arrowIcon} />
          </View>
          <View style={{ width: 200 }}>
          <Text style={styles.chatText}>
            Help with General transactions
          </Text>
        </View>
        </View>
        <Text style={styles.boxAmount}>$12</Text>
      </TouchableOpacity>
      </View> */}
      </View>
      </ThemedView>
    );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginRight:10,
    marginLeft:10
  },
  secondContainer:{
    // flex: 1,
    marginTop:20,
    // marginRight:10,
    // marginLeft:15
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop:30
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2C40F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  balanceContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    // color: '#4D49FC',
  },
  subTitle: {
    // fontSize: 28,
    fontWeight: '400',
    fontSize: 28,
    // color: '#4D49FC',
  },
  balanceText: {
    fontSize: 16,
    // color: '#4D49FC',
  },
  topUpButton: {
    backgroundColor: '#2C40F0',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    // marginLeft:20,
    // marginRight:20,
  },
  topUpButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  box: {
    flex: 1,
    marginTop:20,
    backgroundColor: '#2C40F0',
    borderRadius: 30,
    justifyContent: 'space-between',
    minHeight:220,
    padding: 20,
    // marginRight:15,
    // marginLeft:15
  },
  boxContent: {
    flex: 1,
  },
  boxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  boxImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  boxName: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'white',
    flex: 1,
  },
  arrowIcon: {
    marginLeft: 10,
  },
  chatText: {
    marginTop:10,
    fontSize: 20,
    color: '#FFFFFF',
  },
  boxAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    color:'white',
    marginBottom:10
  },
});

export default HomeScreen;