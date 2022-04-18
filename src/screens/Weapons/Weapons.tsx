import React, { Suspense } from 'react';
import {
  StyleSheet, Text, View, ActivityIndicator,
} from 'react-native';

const WeaponStaticTable = React.lazy(() => import('./components/WeaponStaticTable'));

export default function Weapons() {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.text}>PUBG Stats!</Text>
        <Text style={styles.text}>Weapons Data</Text>
      </View>
      <Suspense fallback={(
        <View>
          <ActivityIndicator size="large" color="#BA5F16" />
        </View>
      )}
      >
        <WeaponStaticTable />
      </Suspense>
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
  text: {
    color: '#efefef',
  },
});
