// src/pages/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList, // Added FlatList for carousel
    SafeAreaView,
    ImageBackground, // Added Dimensions for responsive item width
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
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { useHeaderPresets } from '../components/Header/HeaderPresets';
import { useFooterPresets } from '../components/Footer/FooterPresets';

// Style
import { colors } from '../styles/colors';

interface Adventure {
    _id: string;
    title: string;
    image: string;
    userRole?: string;
}

// --- Home Screen Component ---
const HomeScreen = () => {
    const { dataUser, logoutUser } = useUser();
    const [adventures, setAdventures] = useState<Adventure[]>([]);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [lastOpenedAdventure, setLastOpenedAdventure] = useState<Adventure | null>(null);

    useEffect(() => {
        const fetchAdventures = async () => {
            if (!dataUser || !dataUser.accessToken) {
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
                const fetchedAdventures = response.data.adventures || [];
                setAdventures(fetchedAdventures);
                if (fetchedAdventures.length > 0) {
                    setLastOpenedAdventure(fetchedAdventures[0]); // 👈 la dernière aventure ouverte
                }
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
    }, []);

    const handleNewAdventure = () => {
        navigation.navigate('NewAdventure');
    };

    const renderAdventureItem = ({
        item,
    }: {
        item: Adventure;
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
                {lastOpenedAdventure && (
                     <TouchableOpacity
                        style={styles.lastAdventureItem}
                        onPress={() =>
                            navigation.navigate('AdventurePlayer', {
                                idAdventure: lastOpenedAdventure._id,
                            })
                        }
                    >
                        <ImageBackground 
                            source={require('../../assets/adventureBg.jpg')}
                            style={styles.backgroundImage}
                            imageStyle={styles.imageStyle}
                            resizeMode="cover"
                            >
                            <Text style={styles.buttonText}>
                                {lastOpenedAdventure.title}
                            </Text>
                        </ImageBackground>
                    </TouchableOpacity>
                )}

                
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
        backgroundColor: colors.dark,
    },
    content: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
    },
    lastAdventureItem: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,

        marginBottom: 16,
        borderRadius: 25,
        width:'100%',
        borderWidth: 0,
    },
    backgroundImage: {
        width: '100%',
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        overflow: 'hidden',
    },
    imageStyle: {
        borderRadius: 25,
    },

    newAdventureButton: {
        backgroundColor: colors.light,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,

        maxWidth: 300,
        paddingVertical: 15,
        marginBottom: 16,
        borderRadius: 25,
        width:'100%',
        borderWidth: 0,
    },
    
    buttonText: {
        color: colors.dark,
        textAlign: 'center',
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
