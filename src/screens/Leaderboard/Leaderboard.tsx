import React from 'react';
import { StyleSheet, View } from 'react-native';

import LeaderboardList from './components/LeaderboardList';
import LeaderboardPlayer from './components/LeaderboardPlayer';

import useLeaderboardList from './components/useLeaderboardList';
import useLeaderboard from './useLeaderboard';

export default function Leaderboard() {
  const {
    selectedPlayer,
    setSelectedPlayer,
  } = useLeaderboard();

  const { leaderboardCollected } = useLeaderboardList();

  return (
    <View style={styles.screenContainer}>
      {selectedPlayer
        ? (
          <LeaderboardPlayer
            player={selectedPlayer}
            setSelectedPlayer={setSelectedPlayer}
            leaderboardCollected={leaderboardCollected}
          />
        )
        : <LeaderboardList setSelectedPlayer={setSelectedPlayer} />}
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#090907',
  },
});
