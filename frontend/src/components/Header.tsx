import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>Mon Application</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flex: 0.1,
        backgroundColor: '#FFEDD3',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#333',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Header;
