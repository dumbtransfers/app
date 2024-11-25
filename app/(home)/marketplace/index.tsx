import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, useColorScheme } from 'react-native';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';
import { router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ChatComponent from '@/components/ChatComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBar from '@/components/SearchBar';

const agents = [
    {img:require('../../../assets/images/lachain.png') ,name:"Lachain", description: "Help users buy on LaChain", backgroundColor: "#DD10CF"},
    {img:require('../../../assets/images/chat-bot.webp') ,name:"Friends", description: "Group generator for expenses divider", backgroundColor: "#FFF4B3", color:"black"},
]
const MarketplaceScreen = () => {
  const [messages, setMessages] = useState<any>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const theme = useColorScheme() ?? 'light';

  return (
    <ThemedView darkColor='#252222' style={{flex:1}} >
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.internalHeader}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={36} color={theme === 'dark' ? "#fff" : "#2C40F0"} />
        </TouchableOpacity>
        <ThemedText lightColor='#2C40F0' darkColor='white' type="title" style={styles.name}>Marketplace</ThemedText>
        </View>
        </View>

      {/* <View style={styles.chatContainer}>
      </View> */}
      <View style={styles.secondContainer}>
        <View style={styles.searchContainer}>
        <SearchBar/>
        </View>
        <ThemedText lightColor='#4D49FC' style={styles.subTitle} type="title">Asistentes</ThemedText>
        {agents.map((agent:any, index) => (
            <TouchableOpacity key={index} onPress={() => router.push('/chat')} style={[styles.box, {backgroundColor: agent.backgroundColor}]}>
              <View style={styles.boxContent}>
                <View style={styles.boxHeader}>
                  <Image source={agent.img} style={styles.boxImage} />
                  <Text style={[styles.boxName, {color: agent.color ? agent.color : "white"}]}>{agent.name}</Text>
                  {/* <ArrowRight size={44} color={agent.color ? agent.color : "#FFFFFF"} style={styles.arrowIcon} /> */}
                </View>
                <View style={{ width: 200 }}>
                  <Text style={[styles.chatText, {color: agent.color ? agent.color : "white"}]}>{agent.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
      </View>
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
  secondContainer:{
    // flex: 1,
    // marginTop:20,
    marginRight:10,
    marginLeft:10
    // marginRight:10,
    // marginLeft:15
  },
  searchContainer:{
    marginLeft:10,
    marginBottom:20
  },

  subTitle: {
    // fontSize: 28,
    fontWeight: '400',
    fontSize: 28,
    // color: '#4D49FC',
  },
  box: {
    flex: 1,
    marginTop:20,
    backgroundColor: '#2C40F0',
    borderRadius: 30,
    justifyContent: 'space-between',
    minHeight:160,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
  header: {
    flexDirection: 'row',
    flex:1,
    maxHeight:110,
    alignItems: 'center',
    marginTop:20,
    // padding: 10,
    // backgroundColor: '#2C40F0',
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
    fontSize: 28,
    fontWeight: 'bold',
    flex: 1,
    marginTop:5,
    marginLeft:50
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

export default MarketplaceScreen;