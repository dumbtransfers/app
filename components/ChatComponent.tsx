import React, { useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, Linking, Animated, Easing } from 'react-native';
import { ArrowUpRight, ExternalLink } from 'lucide-react-native';

interface Message {
  text: string;
  isUser: boolean;
  isTradingView?: boolean;
  tradingData?: any;
  isTransaction?: boolean;
  txHash?: string;
  isImage?: boolean;
  imageUrl?: string;
}

interface ChatComponentProps {
  messages: Message[];
  isLoading: boolean;
  onTradingViewClick?: (data: any) => void;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ messages, isLoading, onTradingViewClick }) => {
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true
        })
      ).start();
    } else {
      spinAnim.setValue(0);
    }
  }, [isLoading]);

  return (
    <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10, paddingBottom: 0 }}>
      <ScrollView style={{ flexGrow: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
        {messages.map((message, index) => {
          let chatImage = message.isUser 
            ? require('../assets/images/lautaro.jpg') 
            : require('../assets/images/chat-bot.webp');

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

          if (message.isTransaction) {
            return (
              <View
                key={index}
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
                    padding: 15,
                    marginHorizontal: 8,
                    maxWidth: '70%',
                  }}
                >
                  <Text style={{ color: 'white', marginBottom: 10 }}>
                    ✅ Liquidity added successfully!
                  </Text>
                  <TouchableOpacity 
                    onPress={() => Linking.openURL(`https://snowtrace.io/tx/${message.txHash}`)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      padding: 8,
                      borderRadius: 8,
                    }}
                  >
                    <Text style={{ color: 'white', marginRight: 8 }}>View on Snowtrace</Text>
                    <ExternalLink size={16} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }

          if (message.isImage) {
            return (
              <View
                key={index}
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
                  }}
                >
                  <Image 
                    source={{ uri: message.imageUrl }}
                    style={{ 
                      width: 200, 
                      height: 200, 
                      borderRadius: 10,
                      marginBottom: 10
                    }}
                  />
                  <Text style={{ color: 'white' }}>
                    {message.text}
                  </Text>
                </View>
              </View>
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
        {isLoading && (
          <View style={{
            flexDirection: 'row',
            marginVertical: 4,
            maxWidth: '80%',
            alignSelf: 'flex-start',
          }}>
            <Image
              source={require('../assets/images/chat-bot.webp')}
              style={{ width: 50, height: 50, borderRadius: 25 }}
            />
            <View style={{
              backgroundColor: '#004aad',
              borderRadius: 15,
              padding: 15,
              marginHorizontal: 8,
              maxWidth: '70%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <View style={{
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Animated.View 
                  style={[
                    {
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      borderWidth: 3,
                      borderColor: 'white',
                      borderTopColor: 'transparent',
                    },
                    {
                      transform: [{
                        rotate: spinAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0deg', '360deg']
                        })
                      }]
                    }
                  ]} 
                />
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ChatComponent;
