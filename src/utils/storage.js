import AsyncStorage from '@react-native-community/async-storage';
import { Toast } from 'native-base';

export async function storeData(key, value) {
  try {
    await AsyncStorage.setItem(`@${key}`, value)
  } catch (e) {
    Toast.show({ text: `Erro ao salvar ${key}` });
  }
}

export async function getData(key) {
  try {
    const value = await AsyncStorage.getItem(`@${key}`);
    if(value !== null) {
      return value;
    }
    return '';
  } catch(e) {
    Toast.show({ text: `Erro ao obter ${key}` });
  }
}