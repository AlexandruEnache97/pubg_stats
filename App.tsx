import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  MaterialIcons, Entypo, FontAwesome, Ionicons,
} from '@expo/vector-icons';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import AppLoading from 'expo-app-loading';

import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import Leaderboard from './src/screens/Leaderboard/Leaderboard';
import Home from './src/screens/Home';
import Weapons from './src/screens/Weapons/Weapons';
import Maps from './src/screens/Maps/Maps';
import useFonts from './src/hooks/useFonts';

const Tab = createBottomTabNavigator();

const { width } = Dimensions.get('window');

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      tableColor: string;
    }
  }
}

export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      tableColor: '#FFDE40',
    },
  };

  const [isReady, setIsReady] = useState(false);

  const LoadFonts = async () => {
    await useFonts();
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => setIsReady(true)}
        onError={() => { }}
      />
    );
  }

  return (
    <SafeAreaProvider style={{ backgroundColor: 'black' }}>
      <PaperProvider theme={theme}>
        <StatusBar translucent style="light" backgroundColor="black" />
        <NavigationContainer>
          <Tab.Navigator screenOptions={() => ({
            tabBarActiveBackgroundColor: '#090907',
            tabBarInactiveBackgroundColor: '#090907',
            tabBarActiveTintColor: '#DE8D00',
            tabBarInactiveTintColor: '#fff',
            tabBarIconStyle: { display: 'none' },
            tabBarStyle: {
              height: 60,
            },
            tabBarLabelStyle: {
              position: 'absolute',
              fontSize: 14,
              fontFamily: 'boldDroidSans',
              borderWidth: 1,
              borderColor: '#fff',
              paddingVertical: 21,
              width: width / 5,
            },
          })}
          >
            <Tab.Screen
              name="HOME"
              component={Home}
              options={{
                headerShown: false,
                tabBarIcon: ({ color }) => (
                  <Entypo name="home" size={24} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="RANKS"
              component={Leaderboard}
              options={{ headerShown: false, tabBarIcon: ({ color }) => (<MaterialIcons name="leaderboard" size={20} color={color} />) }}
            />
            <Tab.Screen
              name="WEAPONS"
              component={Weapons}
              options={{ headerShown: false, tabBarIcon: ({ color }) => (<FontAwesome name="bar-chart" size={24} color={color} />) }}
            />
            <Tab.Screen
              name="MAP"
              component={Maps}
              options={{ headerShown: false, tabBarIcon: ({ color }) => (<Entypo name="map" size={20} color={color} />) }}
            />
            <Tab.Screen
              name="ABOUT"
              component={Home}
              options={{ headerShown: false, tabBarIcon: ({ color }) => (<Ionicons name="information-circle" size={24} color={color} />) }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
