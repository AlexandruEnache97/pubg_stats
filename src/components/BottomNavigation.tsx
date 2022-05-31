import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions } from 'react-native';
import {
  MaterialIcons, Entypo, FontAwesome, Ionicons,
} from '@expo/vector-icons';

import Leaderboard from '../screens/Leaderboard/Leaderboard';
import Home from '../screens/Home';
import Weapons from '../screens/Weapons/Weapons';
import Maps from '../screens/Maps/Maps';

const Tab = createBottomTabNavigator();

const { width } = Dimensions.get('window');

function BottomNavigation() {
  return (
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
  );
}

export default BottomNavigation;
