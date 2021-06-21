import React, { Component } from 'react'
import { View, Image, StyleSheet, SectionList, FlatList, Text, Pressable, Alert } from 'react-native'
import Http from '../../libs/Http'
import Colors from '../../res/Colors'
import CoinDetailMarketItem from './CoinMarketItem'
import Storage from '../../libs/storage'

class CoinDetailScreen extends Component {
  state = {
    coin: {},
    markets: [],
    isFavorite: false,
  }

  getSymbolIcon = name => {
    if (name) {
      const nameParam = name.toLowerCase().replace(' ', '-')
      return `https://c1.coinlore.com/img/16x16/${nameParam}.png`
    }
  }

  getSections = coin => {
    const sections = [
      {
        title: 'Market cap',
        data: [coin.market_cap_usd],
      },
      {
        title: 'Volume 24h',
        data: [coin.volume24],
      },
      {
        title: 'Change 24h',
        data: [coin.percent_change_24h],
      },
    ]

    return sections
  }

  getMarkets = async coinId => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`
    const markets = await Http.instance.get(url)
    this.setState({ markets })
  }

  toogleFavorite = () => {
    const key = `favorite-${this.state.coin.id}`
    if (this.state.isFavorite) {
      this.removeFavorite(key)
    } else {
      this.addFavorite(key)
    }
  }

  addFavorite = async key => {
    const coin = JSON.stringify(this.state.coin)

    await Storage.instance.store(key, coin)
    const getStored = await Storage.instance.get(key)

    if (getStored) {
      this.setState({ isFavorite: true })
    }
  }

  removeFavorite = key => {
    Alert.alert('Remove favorite', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Remove',
        onPress: async () => {
          await Storage.instance.remove(key)
          this.setState({ isFavorite: false })
        },
        style: 'destructive',
      },
    ])
  }

  getFavorite = async () => {
    try {
      const key = `favorite-${this.state.coin.id}`
      const favStr = await Storage.instance.get(key)
      favStr && this.setState({ isFavorite: true })
    } catch (error) {
      console.log('error pulling from asyncStorage', error)
    }
  }

  componentDidMount = () => {
    const { coin } = this.props.route.params
    this.props.navigation.setOptions({ title: coin.symbol })
    this.getMarkets(coin.id)
    this.setState({ coin }, () => this.getFavorite())
  }

  render() {
    const { coin, markets, isFavorite } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <View style={styles.row}>
            <Image style={styles.iconImage} source={{ uri: this.getSymbolIcon(coin.name) }} />
            <Text style={styles.titleText}>{coin.name}</Text>
          </View>
          <Pressable
            onPress={this.toogleFavorite}
            style={[styles.btnFavorite, isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd]}>
            <Text style={styles.btnFavoriteText}>{isFavorite ? 'Remove favorite' : 'Add Favorite'}</Text>
          </Pressable>
        </View>

        <SectionList
          style={styles.section}
          sections={this.getSections(coin)}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <View style={styles.sectionItem}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          )}
          renderSectionHeader={({ section }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionText}>{section.title}</Text>
            </View>
          )}
        />

        <Text style={styles.marketTittle}>Markets</Text>
        <FlatList
          style={styles.horizontalList}
          data={markets}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => <CoinDetailMarketItem item={item} />}
          horizontal={true}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  iconImage: {
    width: 25,
    height: 25,
  },
  subHeader: {
    backgroundColor: 'rgba(0,0,0, 0.1)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0, 0.2)',
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: Colors.white,
    fontSize: 14,
  },
  sectionText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  marketTittle: {
    color: Colors.white,
    marginBottom: 16,
    fontSize: 16,
    marginLeft: 16,
    fontWeight: 'bold',
  },
  section: {
    maxHeight: 220,
  },
  horizontalList: {
    maxHeight: 100,
    paddingLeft: 16,
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8,
  },
  btnFavoriteText: {
    color: Colors.white,
  },
  btnFavoriteAdd: {
    backgroundColor: Colors.picton,
  },
  btnFavoriteRemove: {
    backgroundColor: Colors.carmine,
  },
})

export default CoinDetailScreen
