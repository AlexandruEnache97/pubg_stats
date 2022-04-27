import {
  Dispatch, SetStateAction, useState,
} from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Player } from '../../../utils/interfaces';
import PlayerLeaderboardDetails from './PlayerMenuScreens/PlayerLeaderboardDetails';
import playerTabs from '../../../utils/constants';
import Home from '../../Home';
import PlayerWeaponMastery from './PlayerMenuScreens/PlayerWeaponMastery';
import PlayerSurvivalMastery from './PlayerMenuScreens/PlayerSurvivalMastery';

function LeaderboardPlayer(
  {
    player,
    setSelectedPlayer,
  }: {
    player: Player,
    setSelectedPlayer: Dispatch<SetStateAction<Player | null>>,
  },
) {
  const [activeTab, setActiveTab] = useState<string>(playerTabs.MAIN_STATISTICS);

  const onTabClicked = (tab: string) => {
    setActiveTab(tab);
  };

  const renderCurrentTab = () => {
    switch (activeTab) {
      case playerTabs.MAIN_STATISTICS:
        return (
          <PlayerLeaderboardDetails
            player={player}
          />
        );
      case playerTabs.WEAPON_MASTERY:
        return (<PlayerWeaponMastery player={player} />);
      case playerTabs.SURVIVAL_MASTERY:
        return (<PlayerSurvivalMastery player={player} />);
      default:
        return (
          <Home />
        );
    }
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <View>
          <TouchableOpacity onPress={() => setSelectedPlayer(null)}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.textHeader}>PUBG Stats!</Text>
          <Text style={styles.textHeader}>Player leaderboard data</Text>
        </View>
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={() => onTabClicked(playerTabs.MAIN_STATISTICS)}>
          <Text style={activeTab === playerTabs.MAIN_STATISTICS
            ? styles.activeTextMenu : styles.textHeader}
          >
            Main statistics
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTabClicked(playerTabs.WEAPON_MASTERY)}>
          <Text style={activeTab === playerTabs.WEAPON_MASTERY
            ? styles.activeTextMenu : styles.textHeader}
          >
            Weapon mastery
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTabClicked(playerTabs.SURVIVAL_MASTERY)}>
          <Text style={activeTab === playerTabs.SURVIVAL_MASTERY
            ? styles.activeTextMenu : styles.textHeader}
          >
            Survival mastery
          </Text>
        </TouchableOpacity>
      </View>
      {renderCurrentTab()}
    </View>
  );
}

export default LeaderboardPlayer;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    marginTop: 50,
    paddingBottom: 15,
    marginBottom: 15,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
  headerTitleContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingRight: 20,
  },
  textHeader: {
    color: '#efefef',
  },
  activeTextMenu: {
    color: '#DE8D00',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    paddingBottom: 15,
    marginBottom: 15,
  },
});
