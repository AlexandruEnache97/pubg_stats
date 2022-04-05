import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import {
  ScrollView, StyleSheet, Text, View, ActivityIndicator,
} from 'react-native';

import { getLeaderboardData } from '../services/leaderboardService';
import { Player } from '../utils/interfaces';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<Array<Player>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [region, setRegion] = useState<string>('na');
  const [gameMode, setGameMode] = useState<string>('squad');

  const getLeaderboard = async () => {
    setLoading(true);
    const regionBuilder = `psn-${region}`;

    const { data } = await getLeaderboardData(regionBuilder, gameMode);
    setLeaderboard(data);
    setLoading(false);
  };

  useEffect(() => {
    getLeaderboard();
  }, [gameMode, region]);

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.text}>PUBG Stats!</Text>
        <Text style={styles.text}>Leaderboard Data</Text>
      </View>
      <View style={styles.fieldsContainer}>
        <View style={styles.pickerContainer}>
          <Text style={styles.text}>Region</Text>
          <Picker
            selectedValue={region}
            onValueChange={(value) => setRegion(value)}
            mode="dropdown"
            style={styles.picker}
            dropdownIconColor="#fff"
          >
            <Picker.Item label="NA" value="na" />
            <Picker.Item label="EU" value="eu" />
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Text style={styles.text}>Game mode</Text>
          <Picker
            selectedValue={gameMode}
            onValueChange={(value) => setGameMode(value)}
            mode="dropdown"
            style={styles.picker}
            dropdownIconColor="#fff"
          >
            <Picker.Item label="SQUAD" value="squad" />
            <Picker.Item label="SQUAD-FPP" value="squad-fpp" />
          </Picker>
        </View>
      </View>
      {
        loading
          ? (
            <View>
              <ActivityIndicator size="large" color="#BA5F16" />
            </View>
          )
          : (
            <ScrollView>
              {leaderboard.map((player) => (
                <View style={styles.playerContainer} key={player.id}>
                  <Text style={styles.text}>
                    {player.attributes.name}
                    : Rank
                    {' '}
                    {player.attributes.rank}
                  </Text>
                  <Text style={styles.text}>
                    {player.attributes.stats.tier}
                    {' '}
                    -
                    {' '}
                    {player.attributes.stats.subTier}
                    {' '}
                    with
                    {' '}
                    {player.attributes.stats.rankPoints}
                    {' '}
                    rank points
                  </Text>
                </View>
              ))}
            </ScrollView>
          )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#090907',
  },
  headerContainer: {
    margin: 30,
    alignItems: 'center',
  },
  playerContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#000',
    width: '100%',
    alignItems: 'center',
  },
  text: {
    color: '#efefef',
  },
  fieldsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginBottom: 15,
  },
  pickerContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  picker: {
    marginHorizontal: 30,
    // marginVertical: 15,
    width: 150,
    height: 40,
    color: '#fff',
    borderRadius: 20,
    borderWidth: 20,
    borderColor: '#fff',
  },
});
