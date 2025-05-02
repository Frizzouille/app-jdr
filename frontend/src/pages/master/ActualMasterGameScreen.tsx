// src/pages/MasterHomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Style
import { cardStyle } from '../../styles/card.styles';
import { loginStyle } from '../../styles/loginScreen.styles';

// Navigation
import { RootStackParamList } from '../../navigation/navigationType';

import { useUser } from '../../context/userContext';
import API from '../../services/api';
import { AxiosError } from 'axios';

interface Adventure {
    _id: string;
    title: string;
}
const ActualMasterGameScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [isLoading, setIsLoading] = useState(true);
    const [listAdventures, setListAdventures] = useState<Adventure[]>([]);
    const { accessToken } = useUser();

    useEffect(() => {
        async function getAdventures() {
            try {
                const response = await API.get('/adventures', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                setListAdventures(response.data.adventures);
                setIsLoading(false);
            } catch (error) {
                if (error instanceof AxiosError) {
                    // Ici, on sait que c'est une erreur Axios et qu'elle a une réponse
                    console.error(
                        '❌ Erreur de connexion :',
                        error.response?.data || error.message,
                    );
                } else {
                    // En cas d'autres erreurs imprévues
                    console.error(
                        '❌ Une erreur inconnue est survenue :',
                        error,
                    );
                }
            }
        }
        if (accessToken) getAdventures();
    }, [accessToken]);

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
        <View style={cardStyle.container}>
            <View style={cardStyle.card}>
                <Text style={styles.text}>Voici les parties en cours</Text>
                {listAdventures.map((adventure) => (
                    <View style={loginStyle.button}>
                        <Button
                            key={adventure._id}
                            title={adventure.title}
                            onPress={() =>
                                navigation.navigate('Adventure', {
                                    idAdventure: adventure._id,
                                })
                            }
                        />
                    </View>
                ))}
            </View>
        </View>
    );
};

export default ActualMasterGameScreen;

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
