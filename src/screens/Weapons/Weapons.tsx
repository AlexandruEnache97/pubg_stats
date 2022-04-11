import {
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { DataTable } from 'react-native-paper';

import weaponJson from '../../utils/Weapons.json';

export default function Weapons() {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.text}>PUBG Stats!</Text>
        <Text style={styles.text}>Weapons Data</Text>
      </View>
      <View style={styles.tableContainer}>
        <DataTable>
          <ScrollView horizontal>
            <View>
              <DataTable.Header style={{ width: 700 }}>
                <DataTable.Title style={styles.tableHeaderBorder} textStyle={{ color: '#FFDE40' }}>Weapon</DataTable.Title>
                <DataTable.Title style={styles.tableHeaderBorder} textStyle={{ color: '#FFDE40' }}>Dmg</DataTable.Title>
                <DataTable.Title style={styles.tableHeaderBorder} textStyle={{ color: '#FFDE40' }}>Fire rate</DataTable.Title>
                <DataTable.Title style={styles.tableHeaderBorder} textStyle={{ color: '#FFDE40' }}>Reload</DataTable.Title>
                <DataTable.Title style={styles.tableHeaderBorder} textStyle={{ color: '#FFDE40' }}>Spawn</DataTable.Title>
                <DataTable.Title style={styles.tableHeaderBorder} textStyle={{ color: '#FFDE40' }}>Accuracy</DataTable.Title>
                <DataTable.Title style={styles.tableEndHeaderBorder} textStyle={{ color: '#FFDE40' }}>Kill distance</DataTable.Title>
              </DataTable.Header>
              <ScrollView>
                {weaponJson.map((item) => (
                  <DataTable.Row key={item.weaponName} style={{ width: 700 }}>
                    <DataTable.Cell style={styles.tableBorder}>
                      <Text style={styles.text}>{item.weaponName}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.tableBorder}>
                      <Text style={styles.text}>{item.baseDamage}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.tableBorder}>
                      <Text style={styles.text}>{item.fireRate}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.tableBorder}>
                      <Text style={styles.text}>{item.reloadTime}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.tableBorder}>
                      <Text style={styles.text}>{item.spawnRate}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.tableBorder}>
                      <Text style={styles.text}>{item.accuracy}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.tableEndCellBorder}>
                      <Text style={styles.text}>{item.killDistance}</Text>
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}
              </ScrollView>
            </View>
          </ScrollView>
        </DataTable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#090907',
  },
  headerContainer: {
    marginTop: 50,
    marginBottom: 30,
    marginHorizontal: 30,
    alignItems: 'center',
  },
  tableContainer: {
    marginBottom: 120,
  },
  text: {
    color: '#efefef',
  },
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
});
