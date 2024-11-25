import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowUpRight } from 'lucide-react-native';

interface Message {
  text: string;
  isUser: boolean;
  isTradingView?: boolean;
  tradingData?: any;
}

interface ChatComponentProps {
  messages: Message[];
  isLoading: boolean;
  onTradingViewClick?: (data: any) => void;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ messages, isLoading, onTradingViewClick }) => {
  return (
    <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10, paddingBottom: 0 }}>
      <ScrollView style={{ flexGrow: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
        {messages.map((message, index) => {
          let chatImage = message.isUser 
            ? require('../assets/images/lautaro.jpg') 
            : require('../assets/images/lachain.png');

          if (message.isTradingView) {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => onTradingViewClick?.(message.tradingData)}
                style={{
                  flexDirection: 'row',
                  marginVertical: 4,
                  maxWidth: '80%',
                  alignSelf: 'flex-start',
                }}
              >
                <Image
                  source={chatImage}
                  style={{ width: 50, height: 50, borderRadius: 25 }}
                />
                <View
                  style={{
                    backgroundColor: '#004aad',
                    borderRadius: 15,
                    padding: 10,
                    marginHorizontal: 8,
                    maxWidth: '70%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: 'white', marginRight: 8 }}>
                    View Trading Details
                  </Text>
                  <ArrowUpRight size={20} color="white" />
                </View>
              </TouchableOpacity>
            );
          }

          return (
            <View
              key={index}
              style={{
                flexDirection: message.isUser ? 'row-reverse' : 'row',
                marginVertical: 4,
                maxWidth: '80%',
                alignSelf: message.isUser ? 'flex-end' : 'flex-start',
              }}
            >
              <Image
                source={chatImage}
                style={{ width: 50, height: 50, borderRadius: 25 }}
              />
              <View
                style={{
                  backgroundColor: message.isUser ? '#e0e0e0' : '#004aad',
                  borderRadius: 15,
                  padding: 10,
                  marginHorizontal: 8,
                  maxWidth: '70%',
                }}
              >
                <Text style={{ color: message.isUser ? 'black' : 'white' }}>
                  {message.text}
                </Text>
              </View>
            </View>
          );
        })}
        {isLoading && <Text>Loading...</Text>}
      </ScrollView>
    </View>
  );
};

export default ChatComponent;
