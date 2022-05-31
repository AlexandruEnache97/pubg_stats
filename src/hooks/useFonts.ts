/* eslint-disable global-require */
import * as Font from 'expo-font';

const useFonts = async () => Font.loadAsync({
  regularDroidSans: require('../../assets/fonts/DroidSans.ttf'),
  boldDroidSans: require('../../assets/fonts/DroidSans-Bold.ttf'),
});

export default useFonts;
