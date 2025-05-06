import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Navigation
import { RootStackParamList } from './src/navigation/navigationType';
import { navigationRef } from './src/navigation/navigationRef'; // adapte le chemin

// Page
import LoginS from './src/pages/login/LoginScreen';
import RegisterS from './src/pages/login/RegisterScreen';
import HomeS from './src/pages/HomeScreen';
import MasterHomeS from './src/pages/master/MasterHomeScreen';
import NMGS from './src/pages/master/NewMasterGameScreen';
import AdventureS from './src/pages/adventures/AdventureScreen';

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
                <Stack.Screen name="Home" component={HomeS} />
                <Stack.Screen name="MasterHome" component={MasterHomeS} />
                <Stack.Screen name="NewMasterGame" component={NMGS} />
                <Stack.Screen name="Login" component={LoginS} />
                <Stack.Screen name="Register" component={RegisterS} />
                <Stack.Screen name="Adventure" component={AdventureS} />
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
