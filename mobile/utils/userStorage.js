import { Toast } from "react-native-toast-message/lib/src/Toast"
import AsyncStorage from '@react-native-async-storage/async-storage';


export const readUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('user');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
    Toast.show({
      type: 'error',
      text1: 'Ошибка',
      text2: 'Не удалось прочитать данные пользователя. Обратитесь к разработчику.'
    })
  }
};

export const clearUser = async () => {
  try {
    await AsyncStorage.setItem(
      'user',
      null
    )
  } catch (e) {
    console.log(e);
    Toast.show({
      type: 'error',
      text1: 'Ошибка',
      text2: 'Не удалось удалить данные пользователя. Обратитесь к разработчику.'
    })
  }
};