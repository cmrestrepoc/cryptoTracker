/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import CoinStack from './src/components/coins/CoinsStack'

const App = () => {
  return (
    <NavigationContainer>
      <CoinStack />
    </NavigationContainer>
  )
}

export default App
