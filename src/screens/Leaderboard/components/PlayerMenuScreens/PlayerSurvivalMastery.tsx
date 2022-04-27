import { useEffect, useState } from 'react';
import {
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { getMaxPlayerSurvivalMastery, getPlayerSurvivalMastery } from '../../../../services/playerDataService';
import { LeaderboardContextAPI, Player } from '../../../../utils/interfaces';
import { SET_MAX_SURVIVAL_MASTERIES } from '../../contexts/constants';
import { useLeaderboardGlobalContext } from '../../contexts/LeaderboardContext';
import RadarGraph from './RadarGraph/RadarGraph';

export default function PlayerSurvivalMastery(
  { player }: { player: Player, },
) {
  const {
    state: {
      platform,
      maxSurvivalMasteries,
    },
    dispatch: leaderboardDispatch,
  }: { state?: LeaderboardContextAPI, dispatch?: any } = useLeaderboardGlobalContext();

  const [playerSurvivalMastery, setPlayerSurvivalMastery] = useState<any>(null);

  const getSurvivalMastery = async () => {
    const { data } = await getPlayerSurvivalMastery(platform, player.id);
    setPlayerSurvivalMastery(data.data);
  };

  const getMaxSurvivalMasteries = async () => {
    const { data } = await getMaxPlayerSurvivalMastery(platform);
    leaderboardDispatch({ type: SET_MAX_SURVIVAL_MASTERIES, data: { maxSurvivalMasteries: data } });
  };

  useEffect(() => {
    getSurvivalMastery();
    if (!maxSurvivalMasteries) getMaxSurvivalMasteries();
  }, []);

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.textHeader}>
          Survival mastery for
          {' '}
          {player.attributes.name}
        </Text>
      </View>
      <ScrollView>
        <RadarGraph
          playerSurvivalMastery={playerSurvivalMastery}
          maxSurvivalMasteries={maxSurvivalMasteries}
        />
        {playerSurvivalMastery && (
          <View style={styles.dataContainer}>
            <Text style={styles.text}>
              ---------------------------------------------
            </Text>
            <Text style={styles.text}>
              Level
              {' '}
              {playerSurvivalMastery.attributes.level}
            </Text>
            <Text style={styles.text}>
              Total matches played
              {' '}
              {playerSurvivalMastery.attributes.totalMatchesPlayed}
            </Text>
            <Text style={styles.text}>
              Top 10 in
              {' '}
              {playerSurvivalMastery.attributes.stats.top10.total}
              {' '}
              games
            </Text>
            <Text style={styles.text}>
              ---------------------------------------------
            </Text>
            <Text style={styles.text}>
              Air drop called
              {' '}
              {playerSurvivalMastery.attributes.stats.airDropsCalled.total}
              .
              Career best
              {' '}
              {playerSurvivalMastery.attributes.stats.airDropsCalled.careerBest}
            </Text>
            <Text style={styles.text}>
              Average damage dealt
              {' '}
              {Math.round(playerSurvivalMastery.attributes.stats.damageDealt.average
                * 100) / 100}
              .
            </Text>
            <Text style={styles.text}>
              Career best damage dealt
              {' '}
              {Math.round(playerSurvivalMastery.attributes.stats.damageDealt.careerBest
                * 100) / 100}
            </Text>
            <Text style={styles.text}>
              Average damage taken
              {' '}
              {Math.round(playerSurvivalMastery.attributes.stats.damageTaken.average
                * 100) / 100}
            </Text>
            <Text style={styles.text}>
              Average distance by swimming
              {' '}
              {Math.round(playerSurvivalMastery.attributes.stats.distanceBySwimming.average
                * 100) / 100}
            </Text>
            <Text style={styles.text}>
              Average distance by vehicle
              {' '}
              {Math.round(playerSurvivalMastery.attributes.stats.distanceByVehicle.average
                * 100) / 100}
            </Text>
            <Text style={styles.text}>
              Average distance by foot
              {' '}
              {Math.round(playerSurvivalMastery.attributes.stats.distanceOnFoot.average
                * 100) / 100}
            </Text>
            <Text style={styles.text}>
              Average enemy crates looted
              {' '}
              {Math.round(playerSurvivalMastery.attributes.stats.enemyCratesLooted.average
                * 100) / 100}
              .
            </Text>
            <Text style={styles.text}>
              Career best crates looted
              {' '}
              {Math.round(playerSurvivalMastery.attributes.stats.enemyCratesLooted.careerBest
                * 100) / 100}
            </Text>
            <Text style={styles.text}>
              Average heal
              {' '}
              {Math.round(playerSurvivalMastery.attributes.stats.healed.average
                * 100) / 100}
            </Text>
            <Text style={styles.text}>
              Average position in game
              {' '}
              {Math.round(playerSurvivalMastery.attributes.stats.position.average
                * 100) / 100}
            </Text>
            <Text style={styles.text}>
              Average throwables used
              {' '}
              {Math.round(playerSurvivalMastery.attributes.stats.throwablesThrown.average
                * 100) / 100}
            </Text>
            <Text style={styles.text}>
              Average time survived
              {' '}
              {Math.round(playerSurvivalMastery.attributes.stats.timeSurvived.average
                * 100) / 100}
            </Text>
            <Text style={styles.text}>
              Average items looted
              {' '}
              {Math.round(playerSurvivalMastery.attributes.stats.uniqueItemsLooted.average
                * 100) / 100}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  textHeader: {
    color: '#efefef',
  },
  text: {
    color: '#efefef',
    fontSize: 17,
  },
  headerContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
  dataContainer: {
    flexGrow: 1,
    paddingHorizontal: 30,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 250,
  },
});
