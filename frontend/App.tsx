import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Navigation
import { RootStackParamList } from './src/navigation/navigationType';
import { navigationRef } from './src/navigation/navigationRef'; // adapte le chemin

// Page
import LoginScreen from './src/pages/LoginScreen';
import RegisterScreen from './src/pages/RegisterScreen';
import HomeScreen from './src/pages/HomeScreen';
import MasterHome from './src/pages/MasterHomeScreen';

// Contexte
import { UserProvider, useUser } from './src/context/userContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigation() {
    const { dataUser, isLoading } = useUser();

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
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName={dataUser ? 'Home' : 'Login'}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="MasterHome" component={MasterHome} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <UserProvider>
            <AppNavigation />
        </UserProvider>
    );
}
