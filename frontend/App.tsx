import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Navigation
import { RootStackParamList } from './src/navigation/navigationType';
import { navigationRef } from './src/navigation/navigationRef'; // adapte le chemin

// Page
import LoginS from './src/pages/login/Login';
import RegisterS from './src/pages/login/Register';
import HomeS from './src/pages/Home';
import AdventureM from './src/pages/adventures/AdventureMaster';
import AdventureP from './src/pages/adventures/AdventurePlayer';
import NewAdventure from './src/pages/adventures/NewAdventures';

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
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName={dataUser ? 'Home' : 'Login'}
            >
                <Stack.Screen name="Home" component={HomeS} />
                <Stack.Screen name="Login" component={LoginS} />
                <Stack.Screen name="Register" component={RegisterS} />
                <Stack.Screen name="AdventureMaster" component={AdventureM} />
                <Stack.Screen name="AdventurePlayer" component={AdventureP} />
                <Stack.Screen name="NewAdventure" component={NewAdventure} />
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
