import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, useColorScheme } from 'react-native';
import { ArrowLeft, SendHorizontal } from 'lucide-react-native';
import { router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ChatComponent from '@/components/ChatComponent';

const ChatScreen = () => {
  const [messages, setMessages] = useState<any>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const theme = useColorScheme() ?? 'light';
  console.log(theme, "check the theme dude")

  const handleAiAssistant = async (value: string) => {
    try {
      // const response = await fetch('https://coinbase-main-server.onrender.com/api/v1/assistant', {
        const response = await fetch('http://localhost:3025/api/v1/assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: value }), // Send the message in the body
      });
  
      // Check the content type of the response
      const contentType = response.headers.get('content-type');
  
      if (contentType && contentType.includes('application/json')) {
        // If the content is JSON, parse it
        const responseJson = await response.json();
        console.log('AI Assistant JSON Response:', responseJson);
        return responseJson;
      } else {
        // If it's not JSON (e.g., plain text), handle it as a text response
        const responseText = await response.text();
        console.log('AI Assistant Text Response:', responseText);
        return responseText; // You can display this text in your app
      }
    } catch (error:any) {
      console.error('Error in handling AI assistant:', error.message || error);
      return null;
    }
  };

  const handleSubmit = async () => {
    if (inputValue.trim() === '') return;

    // setMessages((prev: any) => [...prev, { text: inputValue, isUser: true }]);
    setMessages((prev: any) => [...prev, { text: inputValue, isUser: true }]);

    try {
        // Await the AI assistant's response
        setIsLoading(true)
        const aiResponse = await handleAiAssistant(inputValue);
          if (aiResponse) {
              setMessages((prev: any) => [...prev, { text: aiResponse, isUser: false , hasButton: aiResponse.hasButton || false, buttonText: aiResponse.buttonText || "",}]);
            }
            setIsLoading(false)

    } catch (error) {
        console.error("Error fetching AI response:", error);
    }

    setInputValue('');
  };

  return (
    <ThemedView darkColor='#252222' style={{flex:1}} >
    {/* // <ThemedView style={styles.container}> */}
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.internalHeader}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={36} color={theme === 'dark' ? "#fff" : "#fff"} />
        </TouchableOpacity>
        <Image
          source={require('../../../assets/images/chat-bot.webp')}
          style={styles.profileImage}
        />
        <ThemedText lightColor='white'  darkColor='white' type="title" style={styles.name}>Sofia</ThemedText>
        <ThemedText lightColor='white'  darkColor='white' type="title" style={styles.number}>$12</ThemedText>
        </View>
        </View>

      <View style={styles.chatContainer}>
        <ChatComponent messages={messages} isLoading={isLoading}/>
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