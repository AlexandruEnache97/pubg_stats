import { StatusBar } from 'expo-status-bar';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import AppLoading from 'expo-app-loading';

import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useFonts from './src/hooks/useFonts';
import BottomNavigation from './src/components/BottomNavigation';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      tableColor: string;
    }
  }
}

export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      tableColor: '#FFDE40',
    },
  };

  const [isReady, setIsReady] = useState(false);

  const LoadFonts = async () => {
    await useFonts();
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => setIsReady(true)}
        onError={() => { }}
      />
    );
  }

  return (
    <SafeAreaProvider style={{ backgroundColor: 'black' }}>
      <PaperProvider theme={theme}>
        <StatusBar translucent style="light" backgroundColor="black" />
        <BottomNavigation />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
