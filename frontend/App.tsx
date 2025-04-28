import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from './types/navigation';
import API from './services/api'; // ajuste le chemin selon ta structure

import LoginScreen from './src/pages/LoginScreen';
import HomeScreen from './src/pages/HomeScreen';
import RegisterScreen from './src/pages/RegisterScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    const [accessToken, updateAccessToken] = useState<string | undefined>(
        localStorage.getItem('accessToken') ?? undefined,
    );

    const [dataUser, setDataUser] = useState({
        id: undefined,
        email: undefined,
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!accessToken) return;
        setIsLoading(true);
        const api = API;
        api.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

        const getUser = async () => {
            try {
                const response = await api.get('/auth');
                setDataUser(response.data);
            } catch {
                localStorage.removeItem('accessToken');
                updateAccessToken(undefined);
            } finally {
                setIsLoading(false);
            }
        };

        getUser();
    }, []);

    if (isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text>Chargement...</Text>
            </View>
        );
    }
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={dataUser.id ? 'Accueil' : 'Login'}
            >
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    initialParams={{
                        updateAccessToken: updateAccessToken,
                    }}
                />
                <Stack.Screen
                    name="Accueil"
                    component={HomeScreen}
                    initialParams={{
                        dataUser: dataUser,
                        updateAccessToken: updateAccessToken,
                    }}
                />
                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    initialParams={{
                        updateAccessToken: updateAccessToken,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
