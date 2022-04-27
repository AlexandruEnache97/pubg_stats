import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { getPlayerWeaponMastery } from '../../../../services/playerDataService';
import { Player } from '../../../../utils/interfaces';
import { useLeaderboardGlobalContext } from '../../contexts/LeaderboardContext';

export default function PlayerWeaponMastery(
  { player }: { player: Player, },
) {
  const { state: { platform } }: { state?: LeaderboardContextAPI } = useLeaderboardGlobalContext();

  const [playerWeaponMastery, setPlayerWeaponMastery] = useState<any>(null);

  const getWeaponMastery = async () => {
    const { data } = await getPlayerWeaponMastery(platform, player.id);
    setPlayerWeaponMastery(data.data);
  };

  useEffect(() => {
    getWeaponMastery();
  }, []);

  return (
    <ScrollView>
      {!playerWeaponMastery ? (
        <View>
          <ActivityIndicator size="large" color="#BA5F16" />
        </View>
      )
        : Object.entries(playerWeaponMastery.attributes.weaponSummaries).map((weapon: any) => (
          <View style={styles.weaponContainer} key={weapon[0]}>
            <Text style={styles.text}>{weapon[0].substring(12)}</Text>
            <Text style={styles.text}>
              Current level:
              {' '}
              {weapon[1].LevelCurrent}
            </Text>
            <Text style={styles.text}>
              Current tier:
              {' '}
              {weapon[1].TierCurrent}
            </Text>
            <Text style={styles.text}>
              Total XP:
              {' '}
              {weapon[1].XPTotal}
            </Text>
            <Text style={styles.text}>
              -------------------------------
            </Text>
            <Text style={styles.text}>
              Damage players:
              {' '}
              {Math.round(weapon[1].StatsTotal.DamagePlayer * 100) / 100}
            </Text>
            <Text style={styles.text}>
              Defeats:
              {' '}
              {weapon[1].StatsTotal.Defeats}
            </Text>
            <Text style={styles.text}>
              Groggies:
              {' '}
              {weapon[1].StatsTotal.Groggies}
            </Text>
            <Text style={styles.text}>
              HeadShots:
              {' '}
              {weapon[1].StatsTotal.HeadShots}
            </Text>
            <Text style={styles.text}>
              Kills:
              {' '}
              {weapon[1].StatsTotal.Kills}
            </Text>
            <Text style={styles.text}>
              Long range defeats:
              {' '}
              {weapon[1].StatsTotal.LongRangeDefeats}
            </Text>
            <Text style={styles.text}>
              Longest defeat:
              {' '}
              {Math.round(weapon[1].StatsTotal.LongestDefeat * 100) / 100}
              m
            </Text>
            <Text style={styles.text}>
              Most damaged player in a game:
              {' '}
              {Math.round(weapon[1].StatsTotal.MostDamagePlayerInAGame * 100) / 100}
            </Text>
            <Text style={styles.text}>
              Most defeats in a game:
              {' '}
              {weapon[1].StatsTotal.MostDefeatsInAGame}
            </Text>
            <Text style={styles.text}>
              Most groggies in a game:
              {' '}
              {weapon[1].StatsTotal.MostGroggiesInAGame}
            </Text>
            <Text style={styles.text}>
              Most headshots in a game:
              {' '}
              {weapon[1].StatsTotal.MostHeadShotsInAGame}
            </Text>
            <Text style={styles.text}>
              Most kills in a game:
              {' '}
              {weapon[1].StatsTotal.MostKillsInAGame}
            </Text>
          </View>
        ))}
    </ScrollView>
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
  weaponContainer: {
    borderTopColor: '#fff',
    borderTopWidth: 0.5,
    paddingVertical: 15,
    paddingLeft: 20,
  },
});
