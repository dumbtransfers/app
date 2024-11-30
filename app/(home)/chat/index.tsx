import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, useColorScheme, Keyboard } from 'react-native';
import { ArrowLeft, SendHorizontal } from 'lucide-react-native';
import { router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ChatComponent from '@/components/ChatComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, RouteParams } from "expo-router";
import { TradingView } from '@/components/TradingView';
import { ethers } from 'ethers';
import { DeployView } from '@/components/DeployView';
import { ERC20ByteCode } from '@/constants/erc20ByteCode';
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ROUTER_ABI = [
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "contract IERC20",
            "name": "tokenX",
            "type": "address"
          },
          {
            "internalType": "contract IERC20",
            "name": "tokenY",
            "type": "address"
          },
          { "internalType": "uint256", "name": "binStep", "type": "uint256" },
          { "internalType": "uint256", "name": "amountX", "type": "uint256" },
          { "internalType": "uint256", "name": "amountY", "type": "uint256" },
          {
            "internalType": "uint256",
            "name": "amountXMin",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amountYMin",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "activeIdDesired",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "idSlippage",
            "type": "uint256"
          },
          {
            "internalType": "int256[]",
            "name": "deltaIds",
            "type": "int256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "distributionX",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "distributionY",
            "type": "uint256[]"
          },
          { "internalType": "address", "name": "to", "type": "address" },
          { "internalType": "address", "name": "refundTo", "type": "address" },
          { "internalType": "uint256", "name": "deadline", "type": "uint256" }
        ],
        "internalType": "struct ILBRouter.LiquidityParameters",
        "name": "liquidityParameters",
        "type": "tuple"
      }
    ],
    "name": "addLiquidityNATIVE",
    "outputs": [
      { "internalType": "uint256", "name": "amountXAdded", "type": "uint256" },
      { "internalType": "uint256", "name": "amountYAdded", "type": "uint256" },
      { "internalType": "uint256", "name": "amountXLeft", "type": "uint256" },
      { "internalType": "uint256", "name": "amountYLeft", "type": "uint256" },
      {
        "internalType": "uint256[]",
        "name": "depositIds",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "liquidityMinted",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getFactory",
    "outputs": [
      {
        "internalType": "contract ILBFactory",
        "name": "lbFactory",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const ChatScreen = () => {
  const [messages, setMessages] = useState<any>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTradingView, setShowTradingView] = useState(false);
  const [tradingData, setTradingData] = useState<any>(null);
  const [showDeployView, setShowDeployView] = useState(false);
  const [deployData, setDeployData] = useState<any>(null);
  let mpcWallet:any;
  let address:any;
  const { assistantId = 0 } = useLocalSearchParams<any>();
  console.log(assistantId, "check the  assistnat id")
  console.log(tradingData, "check the trading data")
  console.log(showTradingView, "check the show trading view")
  useEffect(() => {
    mpcWallet = AsyncStorage.getItem('mpcWallet');
    address = AsyncStorage.getItem('walletAddress');
    console.log(assistantId, "check the useeffect assistnat id")

  },[])
  const theme = useColorScheme() ?? 'light';
  console.log(theme, "check the theme dude")

  const handleAiAssistant = async (value: string) => {
    try {
      // Format messages into the required structure
      const formattedHistory = messages.map((msg: any) => ({
        role: msg.isUser ? "user" : "assistant",
        content: msg.imageUrl ? msg.imageUrl : msg.text
      }));

      const payload = {
        context: {
          history: formattedHistory
        },
        message: value
      };

      if(assistantId === '0'){
        const response = await fetch('https://api.wapu.cash/api/v0/agent/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': '505af58b-bad5-41d4-9e58-d2f4ce408e1d',
          },
          body: JSON.stringify(payload),
        });
        const jsonResponse = await response.json();
        return jsonResponse;
      }
      if(assistantId === 1){
        const response = await fetch('https://api.wapu.cash/api/v0/risk-analysis/', {
          // const response = await fetch('http://localhost:3025/api/v1/assistant', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'f82005fc-ed19-4b31-bf01-89577fc3de82',
          },
          body: JSON.stringify({ message: value }), // Send the message in the body
        });
        const jsonResponse = await response.json();
        return jsonResponse;
      }

      return null;
      // Check the content type of the response
  
    } catch (error:any) {
      console.error('Error in handling AI assistant:', error.message || error);
      return null;
    }
  };

  const handleSubmit = async () => {
    if (inputValue.trim() === '') return;

    setMessages((prev: any) => [...prev, { text: inputValue, isUser: true }]);

    try {
      setIsLoading(true);
      const aiResponse = await handleAiAssistant(inputValue);
      console.log(aiResponse, "check the aiResponse")
      if (aiResponse) {
        if (aiResponse.type === "image_ready") {
          setMessages((prev: any) => [...prev, {
            text: aiResponse.message,
            isUser: false,
            isImage: true,
            imageUrl: aiResponse.image_data.url
          }]);
        } else if ((aiResponse as any).routing?.agent === 'trading') {
          Keyboard.dismiss();
          setTradingData(aiResponse);
          setShowTradingView(true);
          setMessages((prev: any) => [...prev, {
            isUser: false,
            isTradingView: true,
            tradingData: aiResponse,
            text: 'Trading View Available'
          }]);
        } else if (aiResponse.response?.type === "deployment_ready") {
          Keyboard.dismiss();
          setDeployData(aiResponse.response);
          setShowDeployView(true);
          setMessages((prev: any) => [...prev, {
            text: aiResponse.response.message,
            isUser: false,
          }]);
        } else {
          setMessages((prev: any) => [...prev, {
            text: (aiResponse as any).response,
            isUser: false,
          }]);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }

    setInputValue('');
  };

  const handleAddLiquidityAlternative = async () => {
    try {
      if (!PRIVATE_KEY) throw new Error("Private key not found");
      const provider = new ethers.JsonRpcProvider('https://api.avax.network/ext/bc/C/rpc');
      const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
      const ROUTER_ADDRESS = "0xb4315e873dBcf96Ffd0acd8EA43f689D8c20fB30";

      // Get the pair address and active bin
      const FACTORY_ABI = [
        "function getLBPair(address tokenX, address tokenY, uint256 binStep) external view returns (address pair)"
      ];
      const PAIR_ABI = [
        "function getActiveId() external view returns (uint24)",
        "function getBin(uint24 id) external view returns (uint128 binReserveX, uint128 binReserveY)"
      ];

      const factoryContract = new ethers.Contract(
        await (new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, provider)).getFactory(),
        FACTORY_ABI,
        provider
      );

      const pairContract = new ethers.Contract('0xd446eb1660f766d533beceef890df7a69d26f7d1', PAIR_ABI, provider);
      const activeId = await pairContract.getActiveId();
      console.log("Active Bin ID:", activeId);

      // Set up amounts (1 USD worth of each)
      const avaxAmountWei = ethers.parseEther("0.023505151450810505"); // ~$1 worth of AVAX
      const usdcAmountWei = ethers.parseUnits("1", 6); // $1 USDC

      // Approve USDC
      const usdcContract = new ethers.Contract(
        tradingData.contract_addresses.usdc,
        ["function approve(address spender, uint256 amount) external returns (bool)"],
        wallet
      );
      
      const approveTx = await usdcContract.approve(ROUTER_ADDRESS, usdcAmountWei);
      await approveTx.wait();

      const PRECISION = ethers.parseUnits("1", 18);
      const mockLiquidityParameters = {
        tokenX: tradingData.contract_addresses.avax,
        tokenY: tradingData.contract_addresses.usdc,
        binStep: 20,
        amountX: avaxAmountWei,
        amountY: usdcAmountWei,
        amountXMin: (avaxAmountWei * 99n) / 100n,
        amountYMin: (usdcAmountWei * 99n) / 100n,
        activeIdDesired: activeId,
        idSlippage: 5,
        deltaIds: [-1, 0, 1],
        distributionX: [
          0n,
          PRECISION / 2n,
          PRECISION / 2n
        ],
        distributionY: [
          (PRECISION * 2n) / 3n,
          PRECISION / 3n,
          0n
        ],
        to: wallet.address,
        refundTo: wallet.address,
        deadline: Math.floor(Date.now() / 1000) + 1200
      };

      const routerContract = new ethers.Contract(
        ROUTER_ADDRESS,
        ROUTER_ABI,
        wallet
      );

      // Simulate first
      console.log("Simulating transaction...");
      await provider.call({
        to: ROUTER_ADDRESS,
        from: wallet.address,
        data: routerContract.interface.encodeFunctionData("addLiquidityNATIVE", [mockLiquidityParameters]),
        value: avaxAmountWei
      });

      // Execute transaction
      console.log("Executing transaction...");
      const tx = await routerContract.addLiquidityNATIVE(
        mockLiquidityParameters,
        { 
          value: avaxAmountWei,
          gasLimit: 3000000
        }
      );

      console.log("Transaction sent:", tx.hash);
      const receipt = await tx.wait();
      console.log("Transaction receipt:", receipt);
      setMessages((prev: any) => [...prev, {
        text: "Transaction successful",
        isUser: false,
        isTransaction: true,
        txHash: tx.hash
      }]);
      
      setShowTradingView(false);

      return true;

    } catch (error: any) {
      if (error.data) {
        const iface = new ethers.Interface(ROUTER_ABI);
        try {
          const decodedError = iface.parseError(error.data);
          console.error("Decoded error:", decodedError);
        } catch (e) {
          console.error("Could not decode error:", e);
        }
      }
      setMessages((prev: any) => [...prev, {
        text: `❌ Transaction failed: ${error.message}`,
        isUser: false,
      }]);
      console.error('Error in alternative add liquidity:', error);
      return false;
    }
  };

  const handleTradingViewClick = (data: any) => {
    Keyboard.dismiss();
    setTradingData(data);
    setShowTradingView(true);
  };

  const handleDeploy = async () => {
    try {
      // Connect to Unichain using ethers.js
      const provider = new ethers.JsonRpcProvider('https://sepolia.unichain.org');
      if (!PRIVATE_KEY) throw new Error("Private key not found");
      // Create a wallet instance using the private key
      const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

      // Extract contract data from deployData
      const { abi } = deployData.contract_data;
      const { constructor_args } = deployData;

      // Create a contract factory
      const contractFactory = new ethers.ContractFactory(abi, ERC20ByteCode, wallet);

      // Deploy the contract
      console.log('Deploying contract...');
      const contract = await contractFactory.deploy(...constructor_args);

      // Wait for the transaction to be mined
      await contract.waitForDeployment();
      let contractAddress = await contract.getAddress();
      console.log('Contract deployed at:', contractAddress);

      // Update the messages to show deployment success
      setMessages((prev: any) => [...prev, {
        text: `✅ Token deployed successfully at address: ${contractAddress}`,
        isUser: false,
      }]);

      // Close the deploy view
      setShowDeployView(false);

      return true;
    } catch (error: any) {
      console.error('Error deploying contract:', error);
      setMessages((prev: any) => [...prev, {
        text: `❌ Deployment failed: ${error.message}`,
        isUser: false,
      }]);
      return false;
    }
  };

  return (
    <ThemedView darkColor='#252222' style={{flex:1}} >
      <View style={styles.container}>
        <View style={styles.header}>
          {assistantId === '0' ? 
  (      <View style={styles.internalHeader}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={36} color={theme === 'dark' ? "#fff" : "#fff"} />
        </TouchableOpacity>
        <Image
          source={require('../../../assets/images/chat-bot.webp')}
          style={styles.profileImage}
        />
        <ThemedText lightColor='white'  darkColor='white' type="title" style={styles.name}>Sofia</ThemedText>
        <ThemedText lightColor='white'  darkColor='white' type="title" style={styles.number}>$12</ThemedText>
        </View>)
      :      (  <View style={styles.internalHeader}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <ArrowLeft size={36} color={theme === 'dark' ? "#fff" : "#fff"} />
      </TouchableOpacity>
      <Image
        source={require('../../../assets/images/chill-dark-investor.png')}
        style={styles.profileImage}
      />
      <ThemedText lightColor='white'  darkColor='white' type="title" style={styles.name}>Investor</ThemedText>
      <ThemedText lightColor='white'  darkColor='white' type="title" style={styles.number}>$500</ThemedText>
      </View>)
      }
        </View>

        <View style={styles.chatContainer}>
          <ChatComponent 
            messages={messages} 
            isLoading={isLoading}
            onTradingViewClick={handleTradingViewClick}
          />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.inputContainer}
        >
          <TextInput
            style={[styles.input, {backgroundColor: theme === 'dark' ? '#252222' : '#fff', color: theme === 'dark' ? 'white': 'black'}]}
            value={inputValue}
            placeholderTextColor={theme === 'dark' ? 'white' : 'black'}
            onChangeText={setInputValue}
            placeholder="Type a message..."
          />
          <TouchableOpacity onPress={handleSubmit} style={styles.sendButton}>
            <SendHorizontal size={24} color="#fff" />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
      
      {tradingData && showTradingView && (
        <TradingView 
          data={tradingData}
          onAddLiquidity={handleAddLiquidityAlternative}
          onClose={() => setShowTradingView(false)}
          visible={true}
        />
      )}
      {deployData && showDeployView && (
        <DeployView 
          data={deployData}
          onDeploy={handleDeploy}
          onClose={() => setShowDeployView(false)}
          visible={true}
        />
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    // marginRight:10,
    // marginLeft:10
  },
  header: {
    flexDirection: 'row',
    flex:1,
    maxHeight:110,
    alignItems: 'center',
    // padding: 10,
    backgroundColor: '#2C40F0',
    borderBottomEndRadius:20,
    borderBottomLeftRadius:20,
    // marginTop:50,
  },
  internalHeader:{
    marginTop:30,
    flexDirection: 'row',
    flex:1,
  },
  backButton: {
    marginRight: 15,
    marginLeft:15,
    marginTop:5
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  number: {
    fontSize: 20,
    marginRight:15
  },
  chatContainer: {
    flex: 1,
    // Add styles for chat messages container
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    marginBottom:50,
  },
  input: {
    flex: 1,
    borderColor:'#2C40F0',
    borderWidth:2,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#2C40F0',
    padding:12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:10
  },
});

export default ChatScreen;