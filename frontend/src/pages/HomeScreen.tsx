// src/pages/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList, // Added FlatList for carousel
    Dimensions,
    SafeAreaView, // Added Dimensions for responsive item width
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AxiosError } from 'axios'; // Added for error handling

// Navigation
import { RootStackParamList } from '../navigation/navigationType';

// Contexte
import { useUser } from '../context/userContext';

// API Service (Assuming path)
import API from '../services/api';

// Composant
import Header from '../components/Header';
import Footer from '../components/Footer';

// Types (Define or import your Adventure type)
interface Adventure {
    _id: string;
    title: string;
    image: string;
}

// --- Home Screen Component ---
const HomeScreen = () => {
    // Assuming accessToken is provided by useUser context
    const { dataUser, accessToken, logoutUser } = useUser();
    const [adventures, setAdventures] = useState<Adventure[]>([]);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        const fetchAdventures = async () => {
            if (!accessToken) {
                logoutUser();
                return;
            }

            const sort = 'lastOpened'; // Critère de tri (ex: dernière ouverture)
            const order = 'desc'; // Ordre de tri (asc ou desc)
            try {
                const response = await API.get<{ adventures: Adventure[] }>(
                    `/adventures?sort=${sort}&order=${order}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    },
                );
                setAdventures(response.data.adventures || []);
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.error(
                        '❌ Error fetching adventures:',
                        error.response?.data || error.message,
                    );
                } else {
                    console.error(
                        '❌ An unknown error occurred while fetching adventures:',
                        error,
                    );
                }
            }
        };

        fetchAdventures();
    }, [accessToken]); // Re-fetch if accessToken changes

    const handleNewAdventure = () => {
        navigation.navigate('Adventure', { idAdventure: 'new' });
    };

    const renderAdventureItem = ({ item }: { item: Adventure }) => (
        <TouchableOpacity
            style={styles.adventureItem}
            onPress={() =>
                navigation.navigate('Adventure', { idAdventure: item._id })
            }
        >
            <Text style={styles.adventureTitle}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.content}>
                <TouchableOpacity
                    style={styles.newAdventureButton}
                    onPress={handleNewAdventure}
                >
                    <Text style={styles.buttonText}>Nouvelle aventure</Text>
                </TouchableOpacity>

                <FlatList
                    data={adventures}
                    renderItem={renderAdventureItem}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={styles.listContainer}
                />
            </View>
            <Footer
                buttons={[
                    {
                        id: 'home',
                        icon: 'home-outline',
                        onPress: () => navigation.navigate('Home'),
                    },
                    {
                        id: 'home2',
                        icon: 'home-outline',
                        onPress: () => navigation.navigate('Home'),
                    },
                    {
                        id: 'home3',
                        icon: 'home-outline',
                        onPress: () => navigation.navigate('Home'),
                    },
                    {
                        id: 'home4',
                        icon: 'home-outline',
                        onPress: () => navigation.navigate('Home'),
                    },
                    {
                        id: 'home5',
                        icon: 'home-outline',
                        onPress: () => navigation.navigate('Home'),
                    },
                ]}
            />
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
    newAdventureButton: {
        backgroundColor: '#591802',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    listContainer: {
        paddingBottom: 16,
    },
    adventureItem: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        marginBottom: 8,
        elevation: 2,
    },
    adventureTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    adventureDescription: {
        color: '#666',
    },
});

export default HomeScreen;
