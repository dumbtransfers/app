import React from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="chat" />
        {/* Add other screens here if needed */}
      </Stack>
    </View>
  );
}