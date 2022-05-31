import { ScrollView, View, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';

import Paragraph from '../../../components/Paragraph';
import weaponJson from '../../../utils/Weapons.json';

export default function WeaponStaticTable() {
  return (
    <View style={styles.tableContainer}>
      <DataTable>
        <ScrollView horizontal>
          <View>
            <DataTable.Header style={{ width: 700 }}>
              <DataTable.Title
                style={styles.tableHeaderBorder}
                textStyle={{ color: '#FFDE40', fontFamily: 'boldDroidSans' }}
              >
                WEAPON
              </DataTable.Title>
              <DataTable.Title
                style={styles.tableHeaderBorder}
                textStyle={{ color: '#FFDE40', fontFamily: 'boldDroidSans' }}
              >
                DAMAGE
              </DataTable.Title>
              <DataTable.Title
                style={styles.tableHeaderBorder}
                textStyle={{ color: '#FFDE40', fontFamily: 'boldDroidSans' }}
              >
                FIRE RATE
              </DataTable.Title>
              <DataTable.Title
                style={styles.tableHeaderBorder}
                textStyle={{ color: '#FFDE40', fontFamily: 'boldDroidSans' }}
              >
                RELOAD
              </DataTable.Title>
              <DataTable.Title
                style={styles.tableHeaderBorder}
                textStyle={{ color: '#FFDE40', fontFamily: 'boldDroidSans' }}
              >
                SPAWN
              </DataTable.Title>
              <DataTable.Title
                style={styles.tableHeaderBorder}
                textStyle={{ color: '#FFDE40', fontFamily: 'boldDroidSans' }}
              >
                ACCURACY
              </DataTable.Title>
              <DataTable.Title
                style={styles.tableEndHeaderBorder}
                textStyle={{ color: '#FFDE40', fontFamily: 'boldDroidSans' }}
              >
                KILL DISTANCE
              </DataTable.Title>
            </DataTable.Header>
            <ScrollView>
              {weaponJson.map((item) => (
                <DataTable.Row key={item.weaponName} style={{ width: 700 }}>
                  <DataTable.Cell style={styles.tableBorder}>
                    <Paragraph>{item.weaponName}</Paragraph>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableBorder}>
                    <Paragraph>{item.baseDamage}</Paragraph>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableBorder}>
                    <Paragraph>{item.fireRate}</Paragraph>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableBorder}>
                    <Paragraph>{item.reloadTime}</Paragraph>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableBorder}>
                    <Paragraph>{item.spawnRate}</Paragraph>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableBorder}>
                    <Paragraph>{item.accuracy}</Paragraph>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableEndCellBorder}>
                    <Paragraph>{item.killDistance}</Paragraph>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </DataTable>
    </View>
  );
}

const styles = StyleSheet.create({
  tableHeaderBorder: {
    paddingLeft: 10,
    borderLeftWidth: 0.2,
    borderLeftColor: '#fff',
    borderTopWidth: 0.2,
    borderTopColor: '#fff',
    borderBottomWidth: 0.2,
    borderBottomColor: '#fff',
  },
  tableEndHeaderBorder: {
    paddingLeft: 10,
    borderLeftWidth: 0.2,
    borderLeftColor: '#fff',
    borderTopWidth: 0.2,
    borderTopColor: '#fff',
    borderBottomWidth: 0.2,
    borderBottomColor: '#fff',
    borderRightWidth: 0.2,
    borderRightColor: '#fff',
  },
  tableEndCellBorder: {
    paddingLeft: 10,
    borderLeftWidth: 0.2,
    borderLeftColor: '#fff',
    borderRightWidth: 0.2,
    borderRightColor: '#fff',
  },
  tableBorder: {
    paddingLeft: 10,
    borderLeftWidth: 0.2,
    borderLeftColor: '#fff',
  },
  tableContainer: {
    marginBottom: 120,
  },
  text: {
    color: '#efefef',
  },
});
