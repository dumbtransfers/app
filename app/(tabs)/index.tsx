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

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
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

      <View style={styles.balanceContainer}>
        <Text style={styles.balanceAmount}>$1,000</Text>
        <Text style={styles.balanceText}>Current Balance</Text>
      </View>

      <TouchableOpacity style={styles.topUpButton}>
        <Text style={styles.topUpButtonText}>Top Up</Text>
      </TouchableOpacity>
      <View style={styles.secondContainer}>
        <Text style={styles.subTitle}>Asistentes</Text>
        <View style={styles.box}>
        <View style={styles.boxContent}>
          <View style={styles.boxHeader}>
            <Image
              source={require('../../assets/images/chat-bot.webp')}
              style={styles.boxImage}
            />
            <Text style={styles.boxName}>Sofia</Text>
            <ArrowRight size={44} color="#FFFFFF" style={styles.arrowIcon} />
          </View>
          <Text style={styles.chatText}>Chat with me</Text>
        </View>
        <Text style={styles.boxAmount}>$12</Text>
      </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginRight:15,
    marginLeft:15
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
    backgroundColor: '#4D49FC',
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
    color: '#4D49FC',
  },
  balanceText: {
    fontSize: 16,
    color: '#4D49FC',
  },
  topUpButton: {
    backgroundColor: '#4D49FC',
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
  subTitle:{
    fontSize: 28,
    // fontWeight: 'bold',
    color: '#4D49FC',
  },
  box: {
    flex: 1,
    marginTop:20,
    backgroundColor: '#4D49FC',
    borderRadius: 30,
    justifyContent: 'space-between',
    minHeight:200,
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
    fontSize: 18,
    fontWeight: 'bold',
    color:'white',
    flex: 1,
  },
  arrowIcon: {
    marginLeft: 10,
  },
  chatText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  boxAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    color:'white'
  },
});

export default HomeScreen;