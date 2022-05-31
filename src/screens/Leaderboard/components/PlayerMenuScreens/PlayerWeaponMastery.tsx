import { useEffect, useState } from 'react';
import {
  ActivityIndicator, ScrollView, StyleSheet, View,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Paragraph from '../../../../components/Paragraph';
import { getPlayerWeaponMastery } from '../../../../services/playerDataService';
import { Player } from '../../../../utils/interfaces';
import { useLeaderboardGlobalContext } from '../../contexts/LeaderboardContext';

export default function PlayerWeaponMastery(
  { player }: { player: Player, },
) {
  const { state: { platform } }: { state?: any } = useLeaderboardGlobalContext();

  const [playerWeaponMastery, setPlayerWeaponMastery] = useState<any>(null);
  const [renderedWeaponMastery, setRenderedWeaponMastery] = useState<any>(null);
  const [sortingWeapons, setSortingWeapons] = useState<string>('All');

  const getWeaponMastery = async () => {
    let playerWeapons;
    if (player.id === 'account.fc0d2522f004475093b3740538845f14') {
      playerWeapons = await getPlayerWeaponMastery('steam', player.id);
    } else {
      playerWeapons = await getPlayerWeaponMastery(platform, player.id);
    }
    setPlayerWeaponMastery(playerWeapons.data.data);
  };

  const sortWeaponList = (parameter: string) => {
    switch (parameter) {
      case 'All':
        setRenderedWeaponMastery(Object.entries(
          playerWeaponMastery.attributes.weaponSummaries,
        ));
        break;
      case 'Damage':
        setRenderedWeaponMastery(Object.entries(
          playerWeaponMastery.attributes.weaponSummaries,
        ).sort((a: any, b: any) => b[1].StatsTotal.DamagePlayer - a[1].StatsTotal.DamagePlayer));
        break;
      case 'Kills':
        setRenderedWeaponMastery(Object.entries(
          playerWeaponMastery.attributes.weaponSummaries,
        ).sort((a: any, b: any) => b[1].StatsTotal.Kills - a[1].StatsTotal.Kills));
        break;
      case 'HeadShots':
        setRenderedWeaponMastery(Object.entries(
          playerWeaponMastery.attributes.weaponSummaries,
        ).sort((a: any, b: any) => b[1].StatsTotal.HeadShots - a[1].StatsTotal.HeadShots));
        break;
      case 'Long range kills':
        setRenderedWeaponMastery(Object.entries(
          playerWeaponMastery.attributes.weaponSummaries,
        ).sort(
          (a: any, b: any) => b[1].StatsTotal.LongRangeDefeats - a[1].StatsTotal.LongRangeDefeats,
        ));
        break;
      default:
        setRenderedWeaponMastery(Object.entries(
          playerWeaponMastery.attributes.weaponSummaries,
        ));
        break;
    }
  };

  useEffect(() => {
    getWeaponMastery();
  }, []);

  useEffect(() => {
    if (playerWeaponMastery) {
      sortWeaponList(sortingWeapons);
    }
  }, [playerWeaponMastery, sortingWeapons]);

  return (
    <View>
      <View style={styles.menuContainer}>
        <View style={styles.menuTextContainer}>
          <Paragraph style={styles.infoText}>Sort data based on</Paragraph>
        </View>
        <SelectDropdown
          data={['All', 'Damage', 'Kills', 'HeadShots', 'Long range kills']}
          defaultValueByIndex={0}
          onSelect={(selectedItem) => {
            setRenderedWeaponMastery(null);
            setSortingWeapons(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem) => selectedItem}
          rowTextForSelection={(item) => item}
          buttonStyle={styles.dropdownButton}
          buttonTextStyle={styles.dropdownText}
          // rowTextStyle={styles.dropdownMenuText}
          statusBarTranslucent
        />
      </View>
      <ScrollView style={{
        borderLeftWidth: 1,
        borderLeftColor: '#fff',
        borderRightWidth: 1,
        borderRightColor: '#fff',
      }}
      >
        {!renderedWeaponMastery ? (
          <View>
            <ActivityIndicator size="large" color="#BA5F16" />
          </View>
        )
          : renderedWeaponMastery.map((weapon: any) => (
            <View style={styles.weaponContainer} key={weapon[0]}>
              <Paragraph style={styles.text}>{weapon[0].substring(12)}</Paragraph>
              <Paragraph style={styles.text}>
                {`Current level: ${weapon[1].LevelCurrent}`}
              </Paragraph>
              <Paragraph style={styles.text}>
                {`Current tier: ${weapon[1].TierCurrent}`}
              </Paragraph>
              <Paragraph style={styles.text}>
                {`Total XP: ${weapon[1].XPTotal}`}
              </Paragraph>
              <Paragraph style={styles.text}>-------------------------------</Paragraph>
              <Paragraph style={styles.text}>
                {`Damage players: ${Math.round(weapon[1].StatsTotal.DamagePlayer * 100) / 100}`}
              </Paragraph>
              <Paragraph style={styles.text}>
                {`Defeats: ${weapon[1].StatsTotal.Defeats}`}
              </Paragraph>
              <Paragraph style={styles.text}>
                {`Groggies: ${weapon[1].StatsTotal.Groggies}`}
              </Paragraph>
              <Paragraph style={styles.text}>
                {`HeadShots: ${weapon[1].StatsTotal.HeadShots}`}
              </Paragraph>
              <Paragraph style={styles.text}>
                {`Kills: ${weapon[1].StatsTotal.Kills}`}
              </Paragraph>
              <Paragraph style={styles.text}>
                {`Long range defeats: ${weapon[1].StatsTotal.LongRangeDefeats}`}
              </Paragraph>
              <Paragraph style={styles.text}>
                {`Longest defeat: ${Math.round(weapon[1].StatsTotal.LongestDefeat * 100) / 100}m`}
              </Paragraph>
              <Paragraph style={styles.text}>
                {`Most damaged player in a game: ${Math.round(weapon[1].StatsTotal.MostDamagePlayerInAGame * 100) / 100}`}
              </Paragraph>
              <Paragraph style={styles.text}>
                {`Most defeats in a game: ${weapon[1].StatsTotal.MostDefeatsInAGame}`}
              </Paragraph>
              <Paragraph style={styles.text}>
                {`Most groggies in a game: ${weapon[1].StatsTotal.MostGroggiesInAGame}`}
              </Paragraph>
              <Paragraph style={styles.text}>
                {`Most headshots in a game: ${weapon[1].StatsTotal.MostHeadShotsInAGame}`}
              </Paragraph>
              <Paragraph style={styles.text}>
                {`Most kills in a game: ${weapon[1].StatsTotal.MostKillsInAGame}`}
              </Paragraph>
            </View>
          ))}
      </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  textHeader: {
    color: '#efefef',
  },
  text: {
    fontSize: 17,
  },
  weaponContainer: {
    flex: 1,
    borderTopColor: '#fff',
    borderTopWidth: 0.5,
    paddingVertical: 15,
    paddingLeft: 20,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  menuTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  infoText: {
    fontFamily: 'boldDroidSans',
    fontSize: 17,
  },
  dropdownText: {
    color: '#efefef',
    fontFamily: 'boldDroidSans',
    fontSize: 17,
  },
  dropdownButton: {
    flex: 1,
    backgroundColor: '#090907',
    borderRightWidth: 1,
    borderRightColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
});
