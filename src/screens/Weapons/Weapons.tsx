import React, { Suspense } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import Paragraph from '../../components/Paragraph';
import WeaponsTested from './components/WeaponsTested';

// const WeaponStaticTable = React.lazy(() => import('./components/WeaponStaticTable'));

export default function Weapons() {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <Paragraph>PUBG Stats!</Paragraph>
        <Paragraph>Weapons Data</Paragraph>
      </View>
      <Suspense fallback={(
        <View>
          <ActivityIndicator size="large" color="#BA5F16" />
        </View>
      )}
      >
        {/* <WeaponStaticTable /> */}
        <WeaponsTested />
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
