import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Header = ({ context }: { context: string }) => {
    const navigation = useNavigation();

    if (context === 'adventures') {
        return (
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>

                <Text style={styles.title}>Mon Application</Text>

                <TouchableOpacity onPress={() => console.log('Help pressed')}>
                    <Ionicons
                        name="help-circle-outline"
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>
            </View>
        );
    } else if (context === 'return') {
        return (
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>

                <Text style={styles.title}>Mon Application</Text>
            </View>
        );
    }
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
