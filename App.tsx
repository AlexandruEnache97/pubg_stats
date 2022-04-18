import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  MaterialIcons, Entypo, FontAwesome, Ionicons,
} from '@expo/vector-icons';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import Leaderboard from './src/screens/Leaderboard/Leaderboard';
import Home from './src/screens/Home';
import Weapons from './src/screens/Weapons/Weapons';
import Maps from './src/screens/Maps/Maps';

const Tab = createBottomTabNavigator();

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

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={() => ({
          tabBarActiveBackgroundColor: '#090907',
          tabBarInactiveBackgroundColor: '#090907',
          tabBarActiveTintColor: '#DE8D00',
          tabBarInactiveTintColor: '#FFDE40',
        })}
        >
          <Tab.Screen
            name="Home page"
            component={Home}
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <Entypo name="home" size={24} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Leaderboards"
            component={Leaderboard}
            options={{ headerShown: false, tabBarIcon: ({ color }) => (<MaterialIcons name="leaderboard" size={20} color={color} />) }}
          />
          <Tab.Screen
            name="Weapons"
            component={Weapons}
            options={{ headerShown: false, tabBarIcon: ({ color }) => (<FontAwesome name="bar-chart" size={24} color={color} />) }}
          />
          <Tab.Screen
            name="Map"
            component={Maps}
            options={{ headerShown: false, tabBarIcon: ({ color }) => (<Entypo name="map" size={20} color={color} />) }}
          />
          <Tab.Screen
            name="About us"
            component={Home}
            options={{ headerShown: false, tabBarIcon: ({ color }) => (<Ionicons name="information-circle" size={24} color={color} />) }}
          />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar translucent style="light" />
    </PaperProvider>
  );
}
