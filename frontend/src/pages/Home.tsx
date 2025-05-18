// src/pages/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList, // Added FlatList for carousel
    SafeAreaView, // Added Dimensions for responsive item width
} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AxiosError } from 'axios'; // Added for error handling
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
// Navigation
import { RootStackParamList } from '../navigation/navigationType';

// Contexte
import { useUser } from '../context/userContext';

// API Service (Assuming path)
import API from '../services/api';

// Composant
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useHeaderPresets } from '../components/HeaderPresets';
import { useFooterPresets } from '../components/FooterPresets';

interface Adventure {
    _id: string;
    title: string;
    image: string;
}

// --- Home Screen Component ---
const HomeScreen = () => {
    // Assuming accessToken is provided by useUser context
    const { accessToken, logoutUser } = useUser();
    const [adventures, setAdventures] = useState<Adventure[]>([]);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const isFocused = useIsFocused();

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
                    {},
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
    }, [isFocused]);

    const handleNewAdventure = () => {
        navigation.navigate('NewAdventure');
    };

    const renderAdventureItem = ({
        item,
    }: {
        item: Adventure & { userRole?: string };
    }) => {
        return item.userRole === 'creator' ? (
            <TouchableOpacity
                style={styles.adventureItem}
                onPress={() =>
                    navigation.navigate('AdventureMaster', {
                        idAdventure: item._id,
                    })
                }
            >
                <Text style={styles.adventureTitle}>{item.title}</Text>
                <MaterialCommunityIcons name="crown" size={24} color="black" />
            </TouchableOpacity>
        ) : (
            <TouchableOpacity
                style={styles.adventureItem}
                onPress={() =>
                    navigation.navigate('AdventurePlayer', {
                        idAdventure: item._id,
                    })
                }
            >
                <Text style={styles.adventureTitle}>{item.title}</Text>
                <MaterialCommunityIcons name="sword" size={24} color="black" />
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header {...useHeaderPresets('home')} />
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
            <Footer {...useFooterPresets('home')} />
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
