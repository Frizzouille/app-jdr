// src/pages/MasterHomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

// Style
import { cardStyle } from '../../styles/card.styles';

// Navigation
import { RootStackParamList } from '../../navigation/navigationType';

import { useUser } from '../../context/userContext';
import { AxiosError } from 'axios';
import API from '../../services/api';

const AdventureScreen = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'Adventure'>>();

    const [isLoading, setIsLoading] = useState(true);
    const [dataAdventure, setDataAdventure] = useState<{ title: string }>({
        title: '',
    });

    const { idAdventure } = route.params;
    const { accessToken } = useUser();

    useEffect(() => {
        async function getAdventures() {
            try {
                const response = await API.get('/adventures/' + idAdventure, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                setDataAdventure(response.data.adventure);
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
                <Text>Tu es sur la partie {dataAdventure.title}</Text>
            </View>
        </View>
    );
};

export default AdventureScreen;
