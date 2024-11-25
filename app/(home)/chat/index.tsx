import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, useColorScheme } from 'react-native';
import { ArrowLeft, SendHorizontal } from 'lucide-react-native';
import { router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ChatComponent from '@/components/ChatComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, RouteParams } from "expo-router";
import { TradingView } from '@/components/TradingView';

const ChatScreen = () => {
  const [messages, setMessages] = useState<any>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTradingView, setShowTradingView] = useState(false);
  const [tradingData, setTradingData] = useState<any>(null);
  let mpcWallet:any;
  let address:any;
  const { assistantId = 0 } = useLocalSearchParams<any>();
  console.log(assistantId, "check the  assistnat id")
  console.log(tradingData, "check the trading data")
  console.log(showTradingView, "check the show trading view")
  useEffect(() => {
    mpcWallet = AsyncStorage.getItem('mpcWallet');
    address = AsyncStorage.getItem('walletAddress');
    console.log(assistantId, "check the useeffect assistnat id")

  },[])
  const theme = useColorScheme() ?? 'light';
  console.log(theme, "check the theme dude")

  const handleAiAssistant = async (value: string) => {
    try {
      console.log(assistantId,value, "check the assistant id")
      let response;
      if(assistantId === '0'){
        console.log(assistantId,value, "check the assistant id inside if")
         response = await fetch('https://api.wapu.cash/api/v0/agent/', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
             'x-api-key': 'f82005fc-ed19-4b31-bf01-89577fc3de82',
           },
           body: JSON.stringify({ message: value, mpcWallet, address }), // Send the message in the body
         });
         const jsonResponse = await response.json();
         return jsonResponse;
      }
      if(assistantId === 1){
        response = await fetch('https://api.wapu.cash/api/v0/risk-analysis/', {
          // const response = await fetch('http://localhost:3025/api/v1/assistant', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'f82005fc-ed19-4b31-bf01-89577fc3de82',
          },
          body: JSON.stringify({ message: value }), // Send the message in the body
        });
        const jsonResponse = await response.json();
        return jsonResponse;
      }

      return null;
      // Check the content type of the response
  
    } catch (error:any) {
      console.error('Error in handling AI assistant:', error.message || error);
      return null;
    }
  };

  const handleSubmit = async () => {
    if (inputValue.trim() === '') return;

    setMessages((prev: any) => [...prev, { text: inputValue, isUser: true }]);

    try {
      setIsLoading(true);
      const aiResponse = await handleAiAssistant(inputValue);
      
      if (aiResponse) {
        if ((aiResponse as any).routing?.agent === 'trading') {
          setTradingData(aiResponse);
          setShowTradingView(true);
          setMessages((prev: any) => [...prev, {
            isUser: false,
            isTradingView: true,
            tradingData: aiResponse,
            text: 'Trading View Available'
          }]);
        } else {
          setMessages((prev: any) => [...prev, {
            text: (aiResponse as any).response,
            isUser: false,
          }]);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }

    setInputValue('');
  };

  return (
    <ThemedView darkColor='#252222' style={{flex:1}} >
      <View style={styles.container}>
        <View style={styles.header}>
          {assistantId === '0' ? 
  (      <View style={styles.internalHeader}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={36} color={theme === 'dark' ? "#fff" : "#fff"} />
        </TouchableOpacity>
        <Image
          source={require('../../../assets/images/chat-bot.webp')}
          style={styles.profileImage}
        />
        <ThemedText lightColor='white'  darkColor='white' type="title" style={styles.name}>Sofia</ThemedText>
        <ThemedText lightColor='white'  darkColor='white' type="title" style={styles.number}>$12</ThemedText>
        </View>)
      :      (  <View style={styles.internalHeader}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <ArrowLeft size={36} color={theme === 'dark' ? "#fff" : "#fff"} />
      </TouchableOpacity>
      <Image
        source={require('../../../assets/images/lachain.png')}
        style={styles.profileImage}
      />
      <ThemedText lightColor='white'  darkColor='white' type="title" style={styles.name}>Investor</ThemedText>
      <ThemedText lightColor='white'  darkColor='white' type="title" style={styles.number}>$500</ThemedText>
      </View>)
      }
        </View>

        <View style={styles.chatContainer}>
          <ChatComponent 
            messages={messages} 
            isLoading={isLoading}
            onTradingViewClick={(data) => {
              setTradingData(data);
              setShowTradingView(true);
            }}
          />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.inputContainer}
        >
          <TextInput
            style={[styles.input, {backgroundColor: theme === 'dark' ? '#252222' : '#fff', color: theme === 'dark' ? 'white': 'black'}]}
            value={inputValue}
            placeholderTextColor={theme === 'dark' ? 'white' : 'black'}
            onChangeText={setInputValue}
            placeholder="Type a message..."
          />
          <TouchableOpacity onPress={handleSubmit} style={styles.sendButton}>
            <SendHorizontal size={24} color="#fff" />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
      
      {tradingData && showTradingView && (
        <TradingView 
          data={tradingData}
          onAddLiquidity={() => {
            console.log('Adding liquidity with data:', tradingData);
          }}
          onClose={() => setShowTradingView(false)}
          visible={true}
        />
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    // marginRight:10,
    // marginLeft:10
  },
  header: {
    flexDirection: 'row',
    flex:1,
    maxHeight:110,
    alignItems: 'center',
    // padding: 10,
    backgroundColor: '#2C40F0',
    borderBottomEndRadius:20,
    borderBottomLeftRadius:20,
    // marginTop:50,
  },
  internalHeader:{
    marginTop:30,
    flexDirection: 'row',
    flex:1,
  },
  backButton: {
    marginRight: 15,
    marginLeft:15,
    marginTop:5
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  number: {
    fontSize: 20,
    marginRight:15
  },
  chatContainer: {
    flex: 1,
    // Add styles for chat messages container
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    marginBottom:50,
  },
  input: {
    flex: 1,
    borderColor:'#2C40F0',
    borderWidth:2,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#2C40F0',
    padding:12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:10
  },
});

export default ChatScreen;