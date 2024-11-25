import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, Image, TextInput } from 'react-native';
import { X } from 'lucide-react-native';

const { height } = Dimensions.get('window');

interface TradingViewProps {
  data: {
    metadata: {
      current_price: number;
      price_range: {
        min: number;
        max: number;
      };
      expected_position: {
        avax: number;
        usdc: number;
      };
    };
    network: string;
  };
  onAddLiquidity: (liquidity: { avaxAmount: string, usdcAmount: string }) => void;
  onClose: () => void;
  visible: boolean;
}

export const TradingView: React.FC<TradingViewProps> = ({ data, onAddLiquidity, onClose, visible }) => {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const [avaxAmount, setAvaxAmount] = useState(data?.metadata.expected_position.avax.toString() || '');
  const [usdcAmount, setUsdcAmount] = useState(data?.metadata.expected_position.usdc.toString() || '');

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
            <Image 
              source={require('../assets/images/avax.png')}
              style={styles.networkIcon}
            />
            <Text style={styles.title} numberOfLines={1}>Add Liquidity</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="#2C40F0" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Current Price</Text>
            <Text style={styles.priceValue}>${data.metadata.current_price.toFixed(2)}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Price Range</Text>
            <View style={styles.rangeContainer}>
              <View style={styles.rangeBox}>
                <Text style={styles.rangeLabel}>Min</Text>
                <Text style={styles.rangeValue}>${data.metadata.price_range.min.toFixed(2)}</Text>
              </View>
              <View style={styles.rangeDivider} />
              <View style={styles.rangeBox}>
                <Text style={styles.rangeLabel}>Max</Text>
                <Text style={styles.rangeValue}>${data.metadata.price_range.max.toFixed(2)}</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Expected Position</Text>
            <View style={styles.positionContainer}>
              <View style={styles.tokenContainer}>
                <Image 
                  source={require('../assets/images/avax.png')}
                  style={styles.tokenIcon}
                />
                <Text style={styles.tokenValue}>{data.metadata.expected_position.avax} AVAX</Text>
              </View>
              <View style={styles.tokenContainer}>
                <Image 
                  source={require('../assets/images/usdc.png')}
                  style={styles.tokenIcon}
                />
                <Text style={styles.tokenValue}>{data.metadata.expected_position.usdc} USDC</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Input Amounts</Text>
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Image 
                  source={require('../assets/images/avax.png')}
                  style={styles.tokenIcon}
                />
                <TextInput
                  style={styles.input}
                  value={avaxAmount}
                  onChangeText={setAvaxAmount}
                  placeholder="0.0"
                  keyboardType="decimal-pad"
                  placeholderTextColor="#999"
                />
                <Text style={styles.tokenSymbol}>AVAX</Text>
              </View>
            </View>

            <View style={[styles.inputWrapper, { marginTop: 12 }]}>
              <Image 
                source={require('../assets/images/usdc.png')}
                style={styles.tokenIcon}
              />
              <TextInput
                style={styles.input}
                value={usdcAmount}
                onChangeText={setUsdcAmount}
                placeholder="0.0"
                keyboardType="decimal-pad"
                placeholderTextColor="#999"
              />
              <Text style={styles.tokenSymbol}>USDC</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => onAddLiquidity({ avaxAmount, usdcAmount })}
        >
          <Text style={styles.buttonText}>Add Liquidity</Text>
        </TouchableOpacity>
      </Animated.View>
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
    height: height * 0.9,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16, // Add space between title and close button
  },
  networkIcon: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C40F0',
    flex: 1, // Allow title to shrink if needed
  },
  closeButton: {
    padding: 8,
    position: 'absolute',
    right: 16,
    top: 16,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#f8f9ff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e1e8ff',
  },
  cardTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  priceValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C40F0',
  },
  rangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rangeBox: {
    flex: 1,
    alignItems: 'center',
  },
  rangeDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e1e8ff',
    marginHorizontal: 16,
  },
  rangeLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  rangeValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C40F0',
  },
  tokenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tokenIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  tokenValue: {
    fontSize: 18,
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
  inputContainer: {
    marginTop: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e1e8ff',
    padding: 12,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#2C40F0',
    marginLeft: 8,
    padding: 0,
  },
  tokenSymbol: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  positionContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
  },
}); 