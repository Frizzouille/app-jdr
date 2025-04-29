// src/pages/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Navigation
import { RootStackParamList } from '../navigation/navigationType';

// Style
import { loginStyle } from '../styles/loginScreen.styles';

// Contexte
import { useUser } from '../context/userContext';

const HomeScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const { dataUser, logoutUser } = useUser();
    if (!dataUser) {
        logoutUser();
        return;
    }

    return (
        <View style={loginStyle.container}>
            <View style={styles.card}>
                <Text style={styles.text}>Tu es connecté {dataUser.email}</Text>
                <View style={loginStyle.button}>
                    <Button
                        title="Maître du jeu"
                        onPress={() => {
                            navigation.navigate('MasterHome');
                        }}
                    />
                </View>
                <View style={loginStyle.button}>
                    <Button
                        title="Se déconnecter"
                        onPress={logoutUser}
                        color="red"
                    />
                </View>
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
});
