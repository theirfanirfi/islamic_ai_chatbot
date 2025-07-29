import { useColorScheme } from '@/hooks/useColorScheme';
import { store } from "@/store/store";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Provider } from 'react-redux';


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    // This is a placeholder for any side effects you might want to run on mount.
    // For example, you could fetch initial data or set up listeners.
    // hide the expo default splash screen
    // SplashScreen.hideAsync();
    // Note: If you want to use the splash screen, you can import and use it here.
    // SplashScreen.preventAutoHideAsync();
    // This will prevent the splash screen from hiding automatically.
    // You can then hide it manually when your app is ready.
    SplashScreen.hideAsync();
  }, []);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
     <Provider store={store}>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName='(splash)'>
        <Stack.Screen name="(splash)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(chatbot)" options={{ headerShown: false }} />
        <Stack.Screen name="(walkthrough)" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="setting" options={{ headerShown: false }} />
        <Stack.Screen name="feedback" options={{ headerShown: false }} />
        <Stack.Screen name="privacy" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
    </Provider>
  );
}
