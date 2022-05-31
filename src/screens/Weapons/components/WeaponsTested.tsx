import { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';

import Paragraph from '../../../components/Paragraph';
import { getTestedWeapons } from '../../../services/playerDataService';

export default function WeaponsTested() {
  const [weaponsTested, setWeaponsTested] = useState<any>(null);

  const getWeaponsTested = async () => {
    const { data } = await getTestedWeapons();
    console.log(data);

    const sortedWeaponsTested = Object.entries(data[0]).sort(
      (a: any, b: any) => a[1] - b[1],
    );
    setWeaponsTested(sortedWeaponsTested);
  };

  useEffect(() => {
    getWeaponsTested();
  }, []);

  return (
    <View style={styles.pageContainer}>
      <ScrollView>
        {weaponsTested && weaponsTested.map((item) => {
          if (item[0] !== '_id' && item[0] !== '__v') {
            return (
              <View
                key={item[0]}
                style={{
                  flexDirection: 'row', flex: 1, justifyContent: 'space-between', marginHorizontal: 30,
                }}
              >
                <View>
                  <Paragraph>{item[0].slice(11)}</Paragraph>
                </View>
                <View>
                  <Paragraph>{item[1]}</Paragraph>
                </View>
              </View>
            );
          }
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
});
