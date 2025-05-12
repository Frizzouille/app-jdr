import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type FooterButton = {
    id: string;
    icon: keyof typeof Ionicons.glyphMap;
    onPress?: () => void;
};

type FooterProps = {
    buttons: FooterButton[];
};

const Footer: React.FC<FooterProps> = ({ buttons }) => {
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
