// import { Picker } from '@react-native-picker/picker';
import React, { Dispatch, SetStateAction } from 'react';
import {
  ScrollView, StyleSheet, View, ActivityIndicator, TouchableOpacity,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import Paragraph from '../../../components/Paragraph';
import { Player } from '../../../utils/interfaces';
import { SET_REGION_PLATFORM } from '../contexts/constants';
import { useLeaderboardGlobalContext } from '../contexts/LeaderboardContext';

import useLeaderboardList from './useLeaderboardList';

interface LeaderboardProps {
  setSelectedPlayer: Dispatch<SetStateAction<Player | null>>
}

function LeaderboardList({ setSelectedPlayer }: LeaderboardProps) {
  const {
    leaderboard, loading, /* regionPlatform, gameMode, */ setGameMode,
  } = useLeaderboardList();

  const {
    dispatch: leaderboardDispatch,
  } = useLeaderboardGlobalContext();

  return (
    <>
      <View style={styles.headerContainer}>
        <Paragraph style={styles.textTitle}>LEADERBOARDS</Paragraph>
      </View>
      <View style={styles.fieldsContainer}>
        <View style={styles.pickerContainer}>
          <View style={styles.pickerLeftTextContainer}>
            <Paragraph style={styles.pickerText}>REGION</Paragraph>
          </View>
          <View style={styles.pickerLeftContainer}>
            <SelectDropdown
              data={[
                { label: 'PS NA', value: 'psn-na' },
                { label: 'PS EU', value: 'psn-eu' },
                { label: 'XBOX NA', value: 'xbox-na' },
                { label: 'XBOX EU', value: 'xbox-eu' },
              ]}
              defaultValueByIndex={0}
              onSelect={(selectedItem) => leaderboardDispatch(
                { type: SET_REGION_PLATFORM, data: { regionPlatform: selectedItem.value } },
              )}
              buttonTextAfterSelection={(selectedItem) => selectedItem.label}
              rowTextForSelection={(item) => item.label}
              buttonStyle={styles.dropdownButtonLeft}
              buttonTextStyle={styles.dropdownText}
              rowTextStyle={styles.dropdownMenuText}
              statusBarTranslucent
            />
            {/* <Picker
              selectedValue={regionPlatform}
              onValueChange={(value) => leaderboardDispatch(
                { type: SET_REGION_PLATFORM, data: { regionPlatform: value } },
              )}
              mode="dropdown"
              style={styles.picker}
              dropdownIconColor="#fff"
            >
              <Picker.Item label="PS NA" value="psn-na" />
              <Picker.Item label="PS EU" value="psn-eu" />
              <Picker.Item label="XBOX NA" value="xbox-na" />
              <Picker.Item label="XBOX EU" value="xbox-eu" />
            </Picker> */}
          </View>
        </View>
        <View style={styles.pickerContainer}>
          <View style={styles.pickerRightTextContainer}>
            <Paragraph style={styles.pickerText}>GAME MODE</Paragraph>
          </View>
          <View style={styles.pickerRightContainer}>
            <SelectDropdown
              data={[
                { label: 'SQUAD', value: 'squad' },
                { label: 'SQUAD-FPP', value: 'squad-fpp' },
              ]}
              defaultValueByIndex={0}
              onSelect={(selectedItem) => setGameMode(selectedItem.value)}
              buttonTextAfterSelection={(selectedItem) => selectedItem.label}
              rowTextForSelection={(item) => item.label}
              buttonStyle={styles.dropdownButtonRight}
              buttonTextStyle={styles.dropdownText}
              rowTextStyle={styles.dropdownMenuText}
              statusBarTranslucent
            />
            {/* <Picker
              selectedValue={gameMode}
              onValueChange={(value) => setGameMode(value)}
              mode="dropdown"
              style={styles.picker}
              dropdownIconColor="#fff"
            >
              <Picker.Item label="SQUAD" value="squad" fontFamily="boldDroidSans" />
              <Picker.Item label="SQUAD-FPP" value="squad-fpp" />
            </Picker> */}
          </View>
        </View>
      </View>
      {
        loading
          ? (
            <View style={{
              flex: 1,
              justifyContent: 'center',
              borderLeftWidth: 1,
              borderLeftColor: '#fff',
              borderRightWidth: 1,
              borderRightColor: '#fff',
            }}
            >
              <ActivityIndicator size="large" color="#BA5F16" />
            </View>
          )
          : (
            <ScrollView>
              {leaderboard.map((player) => (
                <TouchableOpacity
                  onPress={() => { setSelectedPlayer(player); }}
                  key={player.id}
                >
                  <View style={styles.playerContainer}>
                    <Paragraph style={styles.leaderboardText}>
                      {`${player.attributes.name}: Rank ${player.attributes.rank}`}
                    </Paragraph>
                    <Paragraph style={styles.leaderboardText}>
                      {`${player.attributes.stats.tier} - ${player.attributes.stats.subTier} with ${player.attributes.stats.rankPoints} rank points`}
                    </Paragraph>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )
      }
    </>
  );
}

export default LeaderboardList;

const styles = StyleSheet.create({
  textTitle: {
    fontFamily: 'boldDroidSans',
    fontSize: 28,
  },
  headerContainer: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginTop: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  pickerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  pickerText: {
    fontFamily: 'boldDroidSans',
    fontSize: 18,
  },
  pickerLeftTextContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    borderLeftWidth: 1,
    borderLeftColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#fff',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 13,
  },
  pickerLeftContainer: {
    width: '100%',
    alignItems: 'center',
  },
  pickerRightTextContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#fff',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 13,
  },
  pickerRightContainer: {
    width: '100%',
    alignItems: 'center',
  },
  playerContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    borderLeftWidth: 1,
    borderLeftColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#fff',
    width: '100%',
    alignItems: 'center',
  },
  fieldsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  picker: {
    width: 117,
    color: '#fff',
  },
  dropdownButtonLeft: {
    backgroundColor: '#000',
    borderLeftWidth: 1,
    borderLeftColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  dropdownButtonRight: {
    backgroundColor: '#000',
    borderRightWidth: 1,
    borderRightColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  dropdownText: {
    color: '#efefef',
    fontFamily: 'boldDroidSans',
  },
  dropdownMenuText: {
    fontFamily: 'boldDroidSans',
  },
  leaderboardText: {
    fontFamily: 'boldDroidSans',
    fontSize: 15,
    textTransform: 'uppercase',
  },
});
