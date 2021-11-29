import { Container } from "@chakra-ui/layout"
import { Box, Input, InputGroup, Button, Spacer, Radio, RadioGroup, Stack  } from '@chakra-ui/react'
import { Text } from "@chakra-ui/react"
import React from 'react'
import { useState } from 'react'
import { useMoralis } from "react-moralis"

// TEST
//import { contractAbi } from '../contracts/RandomNumberConsumer.json'

//console.log('contractAbi=', contractAbi)


export const Play = () => {
  const { Moralis } = useMoralis();
  const [betSel, setBetSel] = useState("1")
  const [betAmount, setBetAmount] = useState(0)
  const [playDisabled, setPlayDisabled] = useState(true)

  const betAmountInput = React.createRef()

  const handleBetAmount = () => {
    console.log('betAmountInput =', betAmountInput.current.value)
    const amount = betAmountInput.current.value
    setPlayDisabled(true)
    if(amount<=0) return
    setBetAmount(amount)
    setPlayDisabled(false)
  }

  const handlePlay = () => {
    const senderAddress = Moralis.User.current().get("ethAddress")
    console.log('PLAY Pressed!', 'betAmount=', betAmount, 'betSel=', betSel)
    console.log('senderAddress=', senderAddress)
    testWeb3()
    // RandomNumberConsumer.sol address
    // 0xae1a2772C7b9298dd343805804713b75c9066f93
  }

  const RandomNumberConsumerAddress = '0xae1a2772C7b9298dd343805804713b75c9066f93'
  const RandomNumberConsumerABI = 
  [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "getRandomNumber",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "requestId",
          "type": "bytes32"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "randomResult",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "requestId",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "randomness",
          "type": "uint256"
        }
      ],
      "name": "rawFulfillRandomness",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

  const testWeb3 = async () => {
    
    const web3 = await Moralis.enableWeb3()
    const contract = new web3.eth.Contract(RandomNumberConsumerABI, RandomNumberConsumerAddress)
    console.log('contract=', contract)
    const options = {
      contractAddress: RandomNumberConsumerAddress,
      //functionName: "getRandomNumber",
      functionName: "randomResult",
      abi: RandomNumberConsumerABI,
      params: {        
      },
    };
    const res = await Moralis.executeFunction(options)
    console.log('res=', res)
    /*
    contract.methods.randomResult().call(function(err, res){
      //do something with res here
      console.log(res); //for example
    }
    */
    //const rand = await contract.methods.
  }
  
  
  //const web3 = Moralis.web3ByChain("0x13881"); // Mumbai (Matic Testnet)
  //const abi = Moralis.Web3.abis.erc20;
  //const address = "0x...."

  
  return(
    
    <Container align="center">
      
      <Text fontSize="lg">Choose your beer</Text>
      
      <Box align="center" mt={5} maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Text>Place your bet</Text>
        <RadioGroup onChange={setBetSel} value={betSel} ml={3} mt={3}>
          <Stack>
            <Radio value="1">Beck's</Radio>
            <Radio value="2">Corona</Radio>
            <Radio value="3">Heineken</Radio>
            <Radio value="4">Peroni</Radio>
          </Stack>
        </RadioGroup>
        <InputGroup mt={3} ml={3}>
          <Input ref={betAmountInput} onChange={handleBetAmount} placeholder="Enter amount" width="50%" />
        </InputGroup>
        
        <Button onClick={handlePlay} mt={4} mb={4} isDisabled={playDisabled}>PLAY</Button>
        
        
      </Box>
      <Spacer mt={5}/>
      <Text fontSize="lg">Odds 2-1</Text>  
      
    </Container>
    
  )
}