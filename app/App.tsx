import { StripeProvider } from '@stripe/stripe-react-native'
import './global.css';
import { GluestackUIProvider } from 'components/ui/gluestack-ui-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StatusBar } from './components/ui/status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
// import { PersistGate } from 'redux-persist/integration/react'
// import Toast from '@/components/ui/Toast'
import AuthProvider from '@/providers/AuthProvider'
import Navigation from '@/navigation/Navigation'
// import { persistor, store } from '@/store/store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react';
import React from 'react';

import * as Linking from "expo-linking";
import { ThemeContext } from '@/providers/ThemeContext';

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

    return (

        <ThemeContext.Provider value={{ colorMode, toggleColorMode }}>
            <GluestackUIProvider mode={colorMode}>
                <QueryClientProvider client={queryClient}>
                    {/* <Provider store={store}> */}
                    {/* <PersistGate persistor={persistor} loading={null}> */}
                    <AuthProvider>

                        <SafeAreaProvider>
                            {/* <StripeProvider
                                    publishableKey={
                                        process.env.STRIPE_KEY as string
                                    }
                                > */}
                            <StatusBar />
                            <Navigation />
                            {/* </StripeProvider> */}
                        </SafeAreaProvider>

                    </AuthProvider>

                    {/* <Toast /> */}
                    {/* </PersistGate> */}
                    {/* </Provider> */}
                </QueryClientProvider>
            </GluestackUIProvider>
        </ThemeContext.Provider>


    );
}