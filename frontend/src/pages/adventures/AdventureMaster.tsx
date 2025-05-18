// src/pages/MasterHomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

// Navigation
import { RootStackParamList } from '../../navigation/navigationType';

import { useUser } from '../../context/userContext';
import { AxiosError } from 'axios';
import API from '../../services/api';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useHeaderPresets } from '../../components/HeaderPresets';
import { useFooterPresets } from '../../components/FooterPresets';

const AdventureMaster = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'AdventureMaster'>>();

    const [isLoading, setIsLoading] = useState(true);
    const [dataAdventure, setDataAdventure] = useState<{ title: string }>({
        title: '',
    });

    const { idAdventure } = route.params;
    const { accessToken } = useUser();

    useEffect(() => {
        async function getAdventures() {
            try {
                const response = await API.get('/adventures/' + idAdventure);

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
            <SafeAreaView style={styles.container}>
                <Header {...useHeaderPresets('adventures')} />

                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text>Chargement...</Text>
                </View>
                <Footer {...useFooterPresets('adventures')} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header {...useHeaderPresets('adventures')} />
            <View style={styles.content}>
                <Text>Tu es sur la partie {dataAdventure.title}</Text>
            </View>
            <Footer {...useFooterPresets('adventures')} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        padding: 16,
    },
});

export default AdventureMaster;
