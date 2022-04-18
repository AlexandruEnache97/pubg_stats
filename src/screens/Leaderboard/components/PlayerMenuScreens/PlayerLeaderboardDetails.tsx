import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LeaderboardCollectedData, Player } from '../../../../utils/interfaces';

export default function PlayerLeaderboardDetails({ player, leaderboardCollected }: {
  player: Player,
  leaderboardCollected: Array<LeaderboardCollectedData>
}) {
  const [topCollectedData, setTopCollectedData] = useState<number>(100);
  // eslint-disable-next-line max-len
  const [leaderboardStats, setLeaderboardStats] = useState<LeaderboardCollectedData | undefined | null>(null);

  useEffect(() => {
    const getSelectedLeaderboardStats = leaderboardCollected.find(
      (item) => item.topNumberOfPlayers === topCollectedData,
    );

    setLeaderboardStats(getSelectedLeaderboardStats);
  }, [topCollectedData]);

  return (
    <>
      <View style={styles.topSelectorContainer}>
        <Text style={styles.textHeader}>Data is compared with top players: </Text>
        <Picker
          selectedValue={topCollectedData}
          onValueChange={(value) => setTopCollectedData(value)}
          mode="dropdown"
          style={styles.picker}
          dropdownIconColor="#fff"
        >
          <Picker.Item label="100" value={100} />
          <Picker.Item label="50" value={50} />
          <Picker.Item label="10" value={10} />
          <Picker.Item label="1" value={1} />
        </Picker>
      </View>
      {
        leaderboardStats && (
          <View style={styles.dataContainer}>
            <Text style={styles.text}>
              Player name:
              {' '}
              {player.attributes.name}
              {` (Top ${leaderboardStats.topNumberOfPlayers})`}
            </Text>
            <Text style={styles.text}>---------------------------------------------</Text>
            <Text style={styles.text}>
              Rank:
              {' '}
              {player.attributes.rank}
            </Text>
            <Text style={styles.text}>
              Tier:
              {' '}
              {player.attributes.stats.tier}
              {' '}
              {player.attributes.stats.subTier}
            </Text>
            <Text style={styles.text}>---------------------------------------------</Text>
            <Text style={styles.text}>
              {' '}
              Total number of games:
              {' '}
              {player.attributes.stats.games}
              {' ('}
              {leaderboardStats.games / leaderboardStats.topNumberOfPlayers}
              )
            </Text>
            <Text style={styles.text}>
              {' '}
              Total number of wins:
              {' '}
              {player.attributes.stats.wins}
              {' ('}
              {leaderboardStats.wins / leaderboardStats.topNumberOfPlayers}
              )
            </Text>
            <Text style={styles.text}>
              {' '}
              Win ratio:
              {' '}
              {Math.round(
                (player.attributes.stats.wins / player.attributes.stats.games) * 100 * 100,
              ) / 100}
              %
              {' ('}
              {Math.round(
                (leaderboardStats.winRatio / leaderboardStats.topNumberOfPlayers) * 100,
              ) / 100}
              %)
            </Text>
            <Text style={styles.text}>
              {' '}
              Average match rank:
              {' '}
              {Math.round(player.attributes.stats.averageRank * 100) / 100}
              {' ('}
              {Math.round(
                (leaderboardStats.averageRank / leaderboardStats.topNumberOfPlayers) * 100,
              ) / 100}
              )
            </Text>
            <Text style={styles.text}>---------------------------------------------</Text>
            <Text style={styles.text}>
              {' '}
              Average damage dealt:
              {' '}
              {Math.round(player.attributes.stats.averageDamage * 100) / 100}
              {' ('}
              {Math.round(
                (leaderboardStats.averageDamage / leaderboardStats.topNumberOfPlayers) * 100,
              ) / 100}
              )
            </Text>
            <Text style={styles.text}>
              {' '}
              Total number of kills:
              {' '}
              {player.attributes.stats.kills}
              {' ('}
              {leaderboardStats.kills / leaderboardStats.topNumberOfPlayers}
              )
            </Text>
            <Text style={styles.text}>
              {' '}
              KDA:
              {' '}
              {Math.round(player.attributes.stats.kda * 100) / 100}
              {' ('}
              {Math.round((leaderboardStats.kda / leaderboardStats.topNumberOfPlayers) * 100) / 100}
              )
            </Text>
          </View>
        )
      }
    </>
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
  dataContainer: {
    flexGrow: 1,
    marginVertical: 80,
    paddingHorizontal: 30,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  topSelectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  picker: {
    marginHorizontal: 30,
    width: 100,
    height: 40,
    color: '#fff',
    borderRadius: 20,
    borderWidth: 20,
    borderColor: '#fff',
  },
});
