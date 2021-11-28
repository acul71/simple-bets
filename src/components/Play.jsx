import { Container } from "@chakra-ui/layout"
import { Flex, Image, Box, Input, InputGroup, Button, Spacer, Radio, RadioGroup, Stack  } from '@chakra-ui/react'
import { Text } from "@chakra-ui/react"
import React from 'react'
import { useState } from 'react'

export const Play = () => {
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
    console.log('PLAY Pressed!', 'betAmount=', betAmount, 'betSel=', betSel)
  }


  return(
    
    <Container align="center">
      
      <Text fontSize="lg">Choose your beer</Text>
      
      <Box align="center" mt={5} maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Text>Place your bet</Text>
        <RadioGroup onChange={setBetSel} value={betSel} ml={3} mt={3}>
          <Stack>
            <Radio value="1">Becks</Radio>
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