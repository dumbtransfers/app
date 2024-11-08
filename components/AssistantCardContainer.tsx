import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import StackedImages from './StackedImages';
import { router } from 'expo-router';

// Sample data array
const assistants = [
  {
    id: '1',
    name: 'Sofia',
    description: 'Help with General transactions',
    price: '$12',
    backgroundColor: '#2C40F0', // blue
    image: require('../assets/images/chat-bot.webp'), // Replace with actual image URL
    assistantId:0
  },
  {
    id: '2',
    name: 'Alex',
    description: 'CCIP in avalanche',
    price: '$2',
    backgroundColor: '#D66E70', // orange
    image: require('../assets/images/avalanche.png'), // Replace with actual image URL
    assistantId:1
  },
  {
    id: '3',
    name: 'Friends',
    description: 'Expenses divider',
    price: '$20',
    backgroundColor: '#80CE84', // green
    multipleImage: true, // Replace with actual image URL
    assistantId:2
  },
];

const AssistantCard = ({ assistant, index,isFirst, isLast }:any) => (
  <TouchableOpacity 
    style={[
      styles.card, 
      { backgroundColor: assistant.backgroundColor, top: index * 120 },
      // isFirst && styles.topCard, // Apply rounded top corners to first card
      isLast && styles.bottomCard, // Apply rounded bottom corners to last card
      // Offset each card slightly
    ]}
  >
    {assistant.image ?     <Image source={assistant.image } style={styles.image} />
 : <StackedImages/>}
    <View style={styles.cardContent}>
      <Text style={styles.name}>{assistant.name}</Text>
      <Text style={styles.description}>{assistant.description}</Text>
    </View>
    <Text style={styles.price}>{assistant.price}</Text>
    <Text style={styles.arrow}>→</Text>
  </TouchableOpacity>
);

const AssistantCardContainer = () => {
  return (
    <View style={styles.container}>
       <ThemedText lightColor='#4D49FC' style={styles.subTitle} type="title">Asistentes</ThemedText>
      <View style={styles.cardStack}>
        {assistants.map((item, index) => (
          <TouchableOpacity onPress={() => router.push(`/chat?assistantId=${item.assistantId}`)}>
          <AssistantCard 
            key={item.id} 
            assistant={item} 
            index={index} 
            isFirst={index === 0} 
            isLast={index === assistants.length - 1} 
          />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: 20,
    // paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    // marginBottom: 16,
  },
  subTitle: {
    // fontSize: 28,
    fontWeight: '400',
    fontSize: 28,
    paddingBottom: 16,
    // color: '#4D49FC',
  },
  cardStack: {
    position: 'relative', // This allows the cards to be positioned absolutely within the container
    height: 400, // Adjust height as needed to fit all cards
    // top:80,
  },
  card: {
    // top:80,
    height: 170, // Adjust height as needed to fit all cards
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    // alignItems: 'center',
    padding: 16,
    borderRadius: 26,
    // height:200
  },
  bottomCard:{
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    fontSize: 20,
    color: 'white',
  },
  price: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  arrow: {
    fontSize: 18,
    color: 'white',
    marginLeft: 8,
  },
});

export default AssistantCardContainer;
