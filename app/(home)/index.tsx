// import { Image, StyleSheet, Platform, SafeAreaView } from 'react-native';

// import { HelloWave } from '@/components/HelloWave';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';

// export default function HomeScreen() {
//   return (
//     <SafeAreaView
//       // style={{ light: '#A1CEDC', dark: '#1D3D47' }}
// >
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">$12</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//         <ThemedText>
//           Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
//           Press{' '}
//           <ThemedText type="defaultSemiBold">
//             {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
//           </ThemedText>{' '}
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//         <ThemedText>
//           Tap the Explore tab to learn more about what's included in this starter app.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           When you're ready, run{' '}
//           <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
//           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });



import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Bell, MoreHorizontal, MoreVertical,ArrowRight } from 'lucide-react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';

const HomeScreen = () => {
  return (
<ThemedView darkColor='#252222' style={{flex:1}} >
  <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/lautaro.jpg')}
          style={styles.profileImage}
        />
        <View style={styles.iconContainer}>
          <View style={styles.iconWrapper}>
            <Bell size={24} color="#FFFFFF" />
          </View>
          <View style={styles.iconWrapper}>
            <MoreHorizontal size={24} color="#FFFFFF" />
          </View>
        </View>
      </View>

      <ThemedView darkColor='#252222' style={styles.balanceContainer}>
        <ThemedText lightColor='#4D49FC'  darkColor='' type="title">$256</ThemedText>
        <ThemedText lightColor='#4D49FC' darkColor='' style={styles.balanceText}>Current Balance</ThemedText>
      </ThemedView>

      <TouchableOpacity style={styles.topUpButton}>
        <Text style={styles.topUpButtonText}>Top Up</Text>
      </TouchableOpacity>
      <View style={styles.secondContainer}>
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
      </View>
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