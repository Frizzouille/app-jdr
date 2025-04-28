// src/pages/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { StackNavigationProp } from '@react-navigation/stack';

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Accueil'>;

const HomeScreen = ({ route }: { route: HomeScreenRouteProp }) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const { dataUser, updateAccessToken } = route.params;

    const handleLogout = () => {
        // Ici tu pourras ajouter la logique de déconnexion
        updateAccessToken(() => {
            localStorage.removeItem('accessToken');
            return undefined;
        });
        navigation.navigate('Login', { updateAccessToken });
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.text}>Tu es connecté {dataUser.email}</Text>
                <Button title="Se déconnecter" onPress={handleLogout} />
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    card: {
        width: 500,
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
});
