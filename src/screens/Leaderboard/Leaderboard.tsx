import React from 'react';
import { StyleSheet, View } from 'react-native';

import LeaderboardList from './components/LeaderboardList';
import LeaderboardPlayer from './components/LeaderboardPlayer';
import useLeaderboard from './useLeaderboard';

import { LeaderboardContextProvider } from './contexts/LeaderboardContext';

export default function Leaderboard() {
  const {
    selectedPlayer,
    setSelectedPlayer,
  } = useLeaderboard();

  return (
    <LeaderboardContextProvider>
      <View style={styles.screenContainer}>
        {selectedPlayer
          ? (
            <LeaderboardPlayer
              player={selectedPlayer}
              setSelectedPlayer={setSelectedPlayer}
            />
          )
          : <LeaderboardList setSelectedPlayer={setSelectedPlayer} />}
      </View>
    </LeaderboardContextProvider>

  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#090907',
  },
});
