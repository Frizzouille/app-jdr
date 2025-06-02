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
                <ImageBackground 
                    source={require('../../assets/adventureBg.jpg')}
                    style={styles.backgroundImage}
                    imageStyle={styles.imageStyle}
                    resizeMode="cover"
                    >
                    <View style={styles.overlay} />
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.adventureTitle}>{item.title}</Text>
                        <MaterialCommunityIcons name="crown" style={styles.adventureIcon} />
                    </View>
                </ImageBackground>
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
                <ImageBackground 
                    source={require('../../assets/adventureBg.jpg')}
                    style={styles.backgroundImage}
                    imageStyle={styles.imageStyle}
                    resizeMode="cover"
                    >
                    <View style={styles.overlay} />
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.adventureTitle}>{item.title}</Text>
                        <MaterialCommunityIcons name="sword" style={styles.adventureIcon} />
                    </View>
                </ImageBackground>
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
                            source={require('../../assets/adventureBg-1.png')}
                            style={[styles.backgroundImage, { height: 250, alignItems: 'flex-end', paddingBottom: 15}]}
                            imageStyle={styles.imageStyle}
                            resizeMode="cover"
                            
                            >
                            <View style={styles.overlay} />
                            <Text style={styles.adventureTitle}>
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

    // CONTENT CONTAINER
    container: {
        flex: 1,
        backgroundColor: colors.red,
    },
    content: {
        flex: 1,
        padding: 30,
    },

    overlay:{
        ...StyleSheet.absoluteFillObject, // équivaut à { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // noir avec opacité 40%
        borderRadius: 25, // doit correspondre au borderRadius de l'image
    },
    // FIRST IMAGE THE LAST ADVENTURE OPENED
    lastAdventureItem: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,

        marginBottom: 15,
        borderRadius: 25,
        width:'100%',
        borderWidth: 0,
    },
    backgroundImage: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: colors.light,
        
    },
    imageStyle: {
        borderRadius: 25,
    },

    // NEW ADVENTURE BTN 
    newAdventureButton: {
        backgroundColor: colors.light,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,

        paddingVertical: 20,
        marginBottom: 15,
        borderRadius: 25,
        width:'100%',
        borderWidth: 0,
    },
    buttonText: {
        color: colors.brown,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },

    // ADVENTURE LIST 
    listContainer: {
        width: '100%',
    },
    adventureItem: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        elevation: 2,

    },
    adventureTitle: {
        color: colors.light,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    adventureIcon: {
        color: colors.light,
        fontSize: 30,
        marginLeft: 10,
    },
});

export default HomeScreen;
