import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const StackedImages = () => {
  const images = [
    require('../assets/images/lautaro.jpg'), // Replace with your image URLs
    require('../assets/images/chat-bot.webp'),
    require('../assets/images/lautaro.jpg'),
  ];

  return (
    <View style={styles.container}>
      {images.map((image, index) => (
        <Image 
          key={index}
          source={ image }
          style={[
            styles.image,
            { position: 'absolute', top: index * 5, left: index * 15 },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#E5E5E5',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: 20,
    height: 30,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'white',
  },
});

export default StackedImages;
