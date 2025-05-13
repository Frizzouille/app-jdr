import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/navigationType';

type FooterButton = {
    id: string;
    icon: keyof typeof Ionicons.glyphMap;
    onPress?: () => void;
};

type args = {
    context: string;
    currentPage: string;
};

const Footer = ({ context, currentPage }: args) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [buttons, setButtons] = useState<FooterButton[]>([]);

    useEffect(() => {
        let initialButtons: FooterButton[] = [];

        if (context === 'Home') {
            initialButtons = [
                {
                    id: 'home',
                    icon: 'home-outline',
                    onPress: () => navigation.navigate('Home'),
                },
                {
                    id: 'profile',
                    icon: 'person-outline',
                    onPress: () => navigation.navigate('Login'),
                },
            ];
        }

        // Désactiver les onPress pour le bouton de la page actuelle
        const updatedButtons = initialButtons.map((button) =>
            button.id === currentPage
                ? { ...button, onPress: undefined } // ou null si tu préfères
                : button,
        );

        setButtons(updatedButtons);
    }, [context, currentPage, navigation]);

    return (
        <View style={styles.footer}>
            {buttons.map((btn) => (
                <TouchableOpacity
                    key={btn.id}
                    onPress={btn.onPress}
                    style={styles.button}
                >
                    <Ionicons name={btn.icon} size={24} color="#fff" />
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        flex: 0.1,
        backgroundColor: '#FFEDD3',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#333',
    },
    button: {
        padding: 10,
    },
});

export default Footer;
