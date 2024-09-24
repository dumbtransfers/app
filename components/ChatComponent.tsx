import React from 'react';
import { View, Text, Image, TextInput, Button, ScrollView } from 'react-native';

const ChatComponent = ({ messages, isLoading, handleUserResponse, contactName, setContactName, isButtonDisabled }:any) => {
  return (
    <View style={{ flex: 1,paddingLeft:10, paddingRight:10, paddingBottom: 0 }}>
      <ScrollView style={{ flexGrow: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
        {messages.length > 0 && messages.map((message:any, index:any) => {
          console.log(messages, "check the messages dude")
          let chatImage = message.isUser ? require('../assets/images/lautaro.jpg') : require('../assets/images/chat-bot.webp');
          return(
          <View
            key={index}
            style={{
              flexDirection: message.isUser ? 'row-reverse' : 'row',
              marginVertical: 4,
              maxWidth: '80%',
              alignSelf: message.isUser ? 'flex-end' : 'flex-start',
            }}
          >
            {/* Image */}
            <Image
              source={chatImage}
              style={{ width: 50, height: 50, borderRadius: 25 }}
            />

            {/* Message Bubble */}
            <View
              style={{
                backgroundColor: message.isUser ? '#e0e0e0' : '#004aad',
                borderRadius: 15,
                padding: 10,
                marginHorizontal: 8,
                maxWidth: '70%',
              }}
            >
              <Text style={{ color: message.isUser ? 'black' : 'white' }}>{message.text.text || message.text}</Text>

              {message.text.hasInput && (
                <TextInput
                  placeholder={message.text.translatedName || 'Name'}
                  onChangeText={setContactName}
                  style={{
                    marginTop: 8,
                    padding: 8,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                  }}
                />
              )}

              {message.text.hasButtonName && (
                <Button
                  disabled={isButtonDisabled}
                  title={message.text.translatedSend || 'Send'}
                  onPress={() => handleUserResponse(contactName)}
                />
              )}

              {message.text.hasButton && (
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                  <Button
                    disabled={isButtonDisabled}
                    title={message.text.buttonTextYes || 'Yes'}
                    onPress={() => handleUserResponse('yes')}
                  />
                  <Button
                    disabled={isButtonDisabled}
                    title={message.text.buttonTextNo || 'No'}
                    onPress={() => handleUserResponse('no')}
                    color="red"
                  />
                </View>
              )}
            </View>
          </View>
        )})}
        {isLoading && <Text>Loading...</Text>} 
      </ScrollView>

      {/* FullScreenTopUpModal component can be added here if needed */}
    </View>
  );
};

export default ChatComponent;
