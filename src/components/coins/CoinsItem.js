import React from 'react'
import { View, Text, Image, StyleSheet, Platform, Pressable } from 'react-native'
import Colors from '../../res/Colors'

const CoinsItem = ({ item, onPress }) => {
  const getImageArrow = () => {
    if (item.percent_change_1h > 0) {
      return require('../../assets/arrow_up.png')
    }
    return require('../../assets/arrow_down.png')
  }

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.symbolText}>{item.symbol}</Text>
        <Text style={styles.priceUSD}>{`$${item.price_usd}`}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.percentText}>{item.percent_change_1h}</Text>
        <Image source={getImageArrow()} style={styles.imgIcon} />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: Colors.zircon,
    borderBottomWidth: 1,
    marginLeft: Platform.OS === 'ios' ? 16 : 0,
    paddingLeft: Platform.OS === 'ios' ? 0 : 16,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  nameText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 16,
  },
  symbolText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 12,
  },
  priceUSD: {
    color: '#fff',
    fontSize: 14,
  },
  percentText: {
    color: '#fff',
    fontSize: 12,
    marginRight: 8,
  },
  imgIcon: {
    width: 22,
    height: 22,
  },
})

export default CoinsItem
