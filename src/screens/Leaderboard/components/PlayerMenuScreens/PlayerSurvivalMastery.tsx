import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { getMaxPlayerSurvivalMastery, getPlayerSurvivalMastery } from '../../../../services/playerDataService';
import { Player } from '../../../../utils/interfaces';
import { SET_MAX_SURVIVAL_MASTERIES } from '../../contexts/constants';
import { useLeaderboardGlobalContext } from '../../contexts/LeaderboardContext';
import RadarGraph from './RadarGraph/RadarGraph';
import Paragraph from '../../../../components/Paragraph';

export default function PlayerSurvivalMastery(
  { player }: { player: Player, },
) {
  const {
    state: {
      platform,
      maxSurvivalMasteries,
    },
    dispatch: leaderboardDispatch,
  }: { state?: any, dispatch?: any } = useLeaderboardGlobalContext();

  const [playerSurvivalMastery, setPlayerSurvivalMastery] = useState<any>(null);

  const getSurvivalMastery = async () => {
    let playerSurvival;
    if (player.id === 'account.fc0d2522f004475093b3740538845f14') {
      playerSurvival = await getPlayerSurvivalMastery('steam', player.id);
    } else {
      playerSurvival = await getPlayerSurvivalMastery(platform, player.id);
    }
    setPlayerSurvivalMastery(playerSurvival.data.data);
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
    <View style={styles.pageContainer}>
      <View style={styles.headerContainer}>
        <Paragraph>
          {`Survival mastery for ${player.attributes.name}`}
        </Paragraph>
      </View>
      <ScrollView>
        <RadarGraph
          playerSurvivalMastery={playerSurvivalMastery}
          maxSurvivalMasteries={maxSurvivalMasteries}
        />
        {playerSurvivalMastery && (
          <View style={styles.dataContainer}>
            <Paragraph style={styles.text}>
              ---------------------------------------------
            </Paragraph>
            <Paragraph style={styles.text}>
              {`Level ${playerSurvivalMastery.attributes.level}`}
            </Paragraph>
            <Paragraph style={styles.text}>
              {`Total matches played ${playerSurvivalMastery.attributes.totalMatchesPlayed}`}
            </Paragraph>
            <Paragraph style={styles.text}>
              {`Top 10 in ${playerSurvivalMastery.attributes.stats.top10.total} games`}
            </Paragraph>
            <Paragraph style={styles.text}>
              ---------------------------------------------
            </Paragraph>
            <Paragraph style={styles.text}>
              {`Air drop called ${playerSurvivalMastery.attributes.stats.airDropsCalled.total}. Career best ${playerSurvivalMastery.attributes.stats.airDropsCalled.careerBest}`}
            </Paragraph>
            <Paragraph style={styles.text}>
              {`Average damage dealt ${Math.round(playerSurvivalMastery.attributes.stats.damageDealt.average
                * 100) / 100}`}
            </Paragraph>
            <Paragraph style={styles.text}>
              {`Career best damage dealt ${Math.round(playerSurvivalMastery.attributes.stats.damageDealt.careerBest
                * 100) / 100}`}
            </Paragraph>
            <Paragraph style={styles.text}>
              {`Average damage taken ${Math.round(playerSurvivalMastery.attributes.stats.damageTaken.average
                * 100) / 100}`}
            </Paragraph>
            <Paragraph style={styles.text}>
              {`Average distance by swimming ${Math.round(playerSurvivalMastery.attributes.stats.distanceBySwimming.average
                * 100) / 100}`}
            </Paragraph>
            <Paragraph style={styles.text}>
              {`Average distance by vehicle ${Math.round(playerSurvivalMastery.attributes.stats.distanceByVehicle.average
                * 100) / 100}`}
            </Paragraph>
            <Paragraph style={styles.text}>
              {`Average distance by foot ${Math.round(playerSurvivalMastery.attributes.stats.distanceOnFoot.average
                * 100) / 100}`}
            </Paragraph>
            <Paragraph style={styles.text}>
              {`Average enemy crates looted ${Math.round(playerSurvivalMastery.attributes.stats.enemyCratesLooted.average
                * 100) / 100}`}
            </Paragraph>
            <Paragraph style={styles.text}>
              {`Career best crates looted ${Math.round(playerSurvivalMastery.attributes.stats.enemyCratesLooted.careerBest
                * 100) / 100}`}
            </Paragraph>
            <Paragraph style={styles.text}>
              {`Average heal ${Math.round(playerSurvivalMastery.attributes.stats.healed.average
                * 100) / 100}`}
            </Paragraph>
            <Paragraph style={styles.text}>
              {`Average position in game ${Math.round(playerSurvivalMastery.attributes.stats.position.average
                * 100) / 100}`}
            </Paragraph>
            <Paragraph style={styles.text}>
              {`Average throwables used ${Math.round(playerSurvivalMastery.attributes.stats.throwablesThrown.average
                * 100) / 100}`}
            </Paragraph>
            <Paragraph style={styles.text}>
              {`Average time survived ${Math.round(playerSurvivalMastery.attributes.stats.timeSurvived.average
                * 100) / 100}`}
            </Paragraph>
            <Paragraph style={styles.text}>
              {`Average items looted ${Math.round(playerSurvivalMastery.attributes.stats.uniqueItemsLooted.average
                * 100) / 100}`}
            </Paragraph>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    borderLeftWidth: 1,
    borderLeftColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#fff',
  },
  text: {
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
