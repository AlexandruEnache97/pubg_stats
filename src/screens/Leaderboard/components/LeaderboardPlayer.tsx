import {
  Dispatch, SetStateAction, useState,
} from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Player } from '../../../utils/interfaces';
import PlayerLeaderboardDetails from './PlayerMenuScreens/PlayerLeaderboardDetails';
import playerTabs from '../../../utils/constants';
import Home from '../../Home';
import PlayerWeaponMastery from './PlayerMenuScreens/PlayerWeaponMastery';
import PlayerSurvivalMastery from './PlayerMenuScreens/PlayerSurvivalMastery';
import Paragraph from '../../../components/Paragraph';

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
          <Paragraph style={styles.textTitle}>PLAYER DATA</Paragraph>
        </View>
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={() => onTabClicked(playerTabs.MAIN_STATISTICS)}>
          <Paragraph style={activeTab === playerTabs.MAIN_STATISTICS && styles.activeTextMenu}>
            STATISTICS
          </Paragraph>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTabClicked(playerTabs.WEAPON_MASTERY)}>
          <Paragraph style={activeTab === playerTabs.WEAPON_MASTERY && styles.activeTextMenu}>
            WEAPON MASTERY
          </Paragraph>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTabClicked(playerTabs.SURVIVAL_MASTERY)}>
          <Paragraph style={activeTab === playerTabs.SURVIVAL_MASTERY && styles.activeTextMenu}>
            SURVIVAL MASTERY
          </Paragraph>
        </TouchableOpacity>
      </View>
      {renderCurrentTab()}
    </View>
  );
}

export default LeaderboardPlayer;

const styles = StyleSheet.create({
  textTitle: {
    fontFamily: 'boldDroidSans',
    fontSize: 28,
  },
  screenContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    marginTop: 30,
    paddingBottom: 15,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    borderTopColor: '#fff',
    borderTopWidth: 1,
    borderLeftColor: '#fff',
    borderLeftWidth: 1,
    borderRightColor: '#fff',
    borderRightWidth: 1,
  },
  headerTitleContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingRight: 20,
  },
  activeTextMenu: {
    color: '#DE8D00',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    paddingTop: 15,
    paddingBottom: 15,
    borderLeftColor: '#fff',
    borderLeftWidth: 1,
    borderRightColor: '#fff',
    borderRightWidth: 1,
  },
});
