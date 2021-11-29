
import './App.css';
import { useMoralis } from "react-moralis"
import { Routes, Route, Link } from 'react-router-dom'
/*import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
*/
import { Button, Flex } from '@chakra-ui/react'
import { Container, VStack } from '@chakra-ui/layout'
import { Footer } from './components/Footer'
import { Auth } from './components/Auth'
import { Play } from './components/Play'
import { Stats } from './components/Stats'


let intervalId = null
let firstTime = true

function App() {
  const { isAuthenticated, isAuthenticating, user, Moralis, web3, logout, ...rest } = useMoralis();

  const logOut = async () => {
    clearInterval(intervalId)
    await logout()
    //setAssetsData([])
    firstTime = true
  }

  const LogoutButton = () => {
    //const { logout, isAuthenticating } = useMoralis();
  
    return (
      <Button onClick={() => logOut()} disabled={isAuthenticating}>
        Logout
      </Button>
    )
  }

  const listenToUpdates = async () => {
    const query = new Moralis.Query("EthTransactions")
    const subscription = await query.subscribe()

    subscription.on("create", (object) => {
      console.log('new transaction!!')
      console.log(object)
      //getAssets()
    })
  }

    console.log('isAuthenticated=', isAuthenticated)
    if (!isAuthenticated) {
      return (
        <VStack spacing={20}>
          <Auth/>
          
          <Footer/>
        </VStack>
        
      )
      }
  
    console.log('user=', user)
    console.log('rest=', rest)


    return (
      <Container>
        <Flex my={6}>
          <Link to='/'>
          <Button mr={3}>Play</Button>
          </Link>
          <Link to='/stats'>
          <Button mr={3}>Stats</Button>
          </Link>
          <LogoutButton/>
        </Flex>
        <Routes>
          <Route path="/" element={<Play/>}>  
          </Route>
          <Route path='/stats' element={<Stats/>}>
          </Route>
        </Routes>
        <Flex my={20}>
          <Footer/>
        </Flex>
      </Container>
      
  
    )
  }

export default App;
