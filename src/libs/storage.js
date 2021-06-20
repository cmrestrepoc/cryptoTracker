import AsyncStorage from '@react-native-community/async-storage'

class Storage {
  static instance = Storage()

  store = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (err) {
      console.log('Storage store error', err)
      return false
    }
  }

  get = async key => {
    try {
      return await AsyncStorage.getItem(key)
    } catch (err) {
      console.log('Storage get error', err)
      throw Error(err)
    }
  }

  multiGet = async keys => {
    try {
      return await AsyncStorage.multiGet(keys)
    } catch (err) {
      console.log('Storage multiGet error', err)
      throw Error(err)
    }
  }

  getAllkeys = async () => {
    try {
      return await AsyncStorage.getAllkeys()
    } catch (err) {
      console.log('Storage getAllkeys error', err)
      throw Error(err)
    }
  }

  remove = async key => {
    try {
      return await AsyncStorage.removeItem(key)
    } catch (err) {
      console.log('Storage remove error', err)
      throw Error(err)
    }
  }
}

export default Storage
