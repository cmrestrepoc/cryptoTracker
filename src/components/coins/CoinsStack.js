import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import CoinsScreen from './CoinsScreen'
import CoinDetailScreen from '../coinDetail/CoinDetailScreen'
import Colors from '../../res/Colors'

const Stack = createStackNavigator()

const CoinStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.blackPearl,
          shadowOpacity: 0,
          // shadowColor: Colors.blackPearl  //has the same result as above
        },
        headerTintColor: Colors.white,
      }}
    >
      <Stack.Screen name="Coins" component={CoinsScreen} />
      <Stack.Screen name="CoinDetail" component={CoinDetailScreen} />
    </Stack.Navigator>
  )
}

export default CoinStack
