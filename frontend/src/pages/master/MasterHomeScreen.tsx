// src/pages/MasterHomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Style
import { loginStyle } from '../../styles/loginScreen.styles';
import { cardStyle } from '../../styles/card.styles';

// Navigation
import { RootStackParamList } from '../../navigation/navigationType';

const MasterHomeScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        <View style={cardStyle.container}>
            <View style={cardStyle.card}>
                <Text style={styles.text}>Tu es sur la page MJ</Text>
                <View style={loginStyle.button}>
                    <Button
                        title="Aventure en cours"
                        onPress={() => {
                            navigation.navigate('ActualMasterGame');
                        }}
                    />
                </View>
                <View style={loginStyle.button}>
                    <Button
                        title="Nouvelle aventure"
                        onPress={() => {
                            navigation.navigate('NewMasterGame');
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

export default MasterHomeScreen;

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
});
