import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = await AsyncStorage.getItem('walletAddress');
    setIsAuthenticated(!!token);
  };

  // Show nothing while checking authentication
  if (isAuthenticated === null) {
    return null;
  }

  // Redirect based on authentication status
  return <Redirect href={isAuthenticated ? '/(home)' : '/(login)'} />;
}
