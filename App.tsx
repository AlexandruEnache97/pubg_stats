import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  MaterialIcons, Entypo, FontAwesome, Ionicons,
} from '@expo/vector-icons';

import Leaderboard from './src/screens/Leaderboard';
import Home from './src/screens/Home';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
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
            component={Home}
            options={{ headerShown: false, tabBarIcon: ({ color }) => (<FontAwesome name="bar-chart" size={24} color={color} />) }}
          />
          <Tab.Screen
            name="Map"
            component={Home}
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
    </>
  );
}
