// src/pages/MasterHomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Style

import { loginStyle } from '../styles/loginScreen.styles';

const HomeScreen = () => {
    return (
        <View style={loginStyle.container}>
            <View style={styles.card}>
                <Text style={styles.text}>Tu es sur la page MJ</Text>
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    card: {
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
