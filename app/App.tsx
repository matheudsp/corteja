import './global.css';
import { GluestackUIProvider } from 'components/ui/gluestack-ui-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StatusBar } from './components/ui/status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import AuthProvider from '@/providers/AuthProvider'
import Navigation from '@/navigation/Navigation'
import React, { useEffect } from 'react';
import * as Linking from "expo-linking";
import { ThemeContext } from '@/providers/ThemeContext';
import store from '@/store/store';
import * as SplashScreen from "expo-splash-screen";

import { useFonts } from 'expo-font';
import {
    Rubik_300Light,
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_600SemiBold,
    Rubik_700Bold,
    Rubik_800ExtraBold,
    Rubik_900Black,
} from '@expo-google-fonts/rubik'
import {RubikMonoOne_400Regular} from '@expo-google-fonts/rubik-mono-one'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})

// queryClient.clear();
// const clearStorage = async () => {
// 	try {
// 		await AsyncStorage.clear();
// 		console.log('Storage successfully cleared!');
// 	} catch (e) {
// 		console.log('Failed to clear the async storage.');
// 	}
// };
// clearStorage();



let defaultTheme: "dark" | "light" = "light";

Linking.getInitialURL().then((url: any) => {
    let { queryParams } = Linking.parse(url) as any;
    defaultTheme = queryParams?.iframeMode ?? defaultTheme;
});


export default function App() {



    const [colorMode, setColorMode] = React.useState<"dark" | "light">(
        defaultTheme
    );

    const toggleColorMode = async () => {
        setColorMode((prev) => (prev === "light" ? "dark" : "light"));
    };

    const [loaded] = useFonts({
        Rubik_300Light,
        Rubik_400Regular,
        Rubik_500Medium,
        Rubik_600SemiBold,
        Rubik_700Bold,
        Rubik_800ExtraBold,
        Rubik_900Black,
        RubikMonoOne_400Regular
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }
    return (

        <ThemeContext.Provider value={{ colorMode, toggleColorMode }}>
            <GluestackUIProvider mode={colorMode} >
                <QueryClientProvider client={queryClient}>
                    <Provider store={store}>
                        {/* <PersistGate persistor={persistor} loading={null}> */}
                        <AuthProvider>
                            <SafeAreaProvider>
                                <StatusBar />
                                <Navigation />
                            </SafeAreaProvider>
                        </AuthProvider>
                        {/* </PersistGate> */}
                    </Provider>
                </QueryClientProvider>
            </GluestackUIProvider>
        </ThemeContext.Provider>


    );
}