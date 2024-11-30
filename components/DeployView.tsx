import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, Image, ActivityIndicator } from 'react-native';
import { X } from 'lucide-react-native';

const { height } = Dimensions.get('window');

interface DeployViewProps {
  data: {
    deployment_params: {
      name: string;
      symbol: string;
      decimals: number;
      total_supply: number;
      logo_url: string;
    };
    network: {
      name: string;
      rpc_url: string;
      chain_id: string;
    };
    contract_data: {
      abi: any[];
      bytecode: string;
    };
    constructor_args: any[];
  };
  onDeploy: () => Promise<boolean>;
  onClose: () => void;
  visible: boolean;
}

export const DeployView: React.FC<DeployViewProps> = ({ data, onDeploy, onClose, visible }) => {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleDeploy = async () => {
    setIsLoading(true);
    try {
      await onDeploy();
    } finally {
      setIsLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <Animated.View style={styles.container}>
      <View style={styles.overlay} />
      <Animated.View 
        style={[
          styles.sheet,
          {
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{data.deployment_params.name}</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="#2C40F0" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: data.deployment_params.logo_url }}
              style={styles.tokenImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Symbol:</Text>
              <Text style={styles.value}>{data.deployment_params.symbol}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Total Supply:</Text>
              <Text style={styles.value}>{data.deployment_params.total_supply}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Decimals:</Text>
              <Text style={styles.value}>{data.deployment_params.decimals}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Network:</Text>
              <Text style={styles.value}>{data.network.name}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.button, isLoading && styles.buttonDisabled]} 
          onPress={handleDeploy}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Deploying...' : 'Deploy Token'}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#2C40F0" />
          <Text style={styles.loadingText}>Deploying your token...</Text>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: height * 0.7,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2C40F0',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  imageContainer: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  tokenImage: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  detailsContainer: {
    width: '100%',
    backgroundColor: '#f8f9ff',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ff',
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2C40F0',
  },
  button: {
    backgroundColor: '#2C40F0',
    padding: 16,
    borderRadius: 12,
    margin: 16,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1100,
  },
  loadingText: {
    marginTop: 20,
    color: '#2C40F0',
    fontSize: 16,
    fontWeight: '500',
  },
}); 