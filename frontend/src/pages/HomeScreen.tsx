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
    Dimensions, // Added Dimensions for responsive item width
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

// Types (Define or import your Adventure type)
interface Adventure {
    _id: string;
    title: string;
    image: string;
}

// --- Carousel Component ---
const screenWidth = Dimensions.get('window').width;
const adventureItemWidth = screenWidth * 0.4; // Width for ~2.5 items

const AdventureCarousel = ({
    title,
    adventures,
}: {
    title: string;
    adventures?: Adventure[];
}) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const renderAdventureItem = ({ item }: { item: Adventure }) => (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate('Adventure', { idAdventure: item._id })
            }
        >
            <View style={styles.adventureItem}>
                <Text style={styles.adventureTitle}>{item.title}</Text>
                {item.image && (
                    <Image
                        source={require('../img/image.jpg')}
                        style={styles.adventureImage}
                    />
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.carouselContainer}>
            <Text style={styles.carouselTitle}>{title}</Text>
            {adventures && adventures.length > 0 ? (
                <FlatList
                    data={adventures}
                    renderItem={renderAdventureItem}
                    keyExtractor={(item) => item._id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.carouselListContainer}
                />
            ) : (
                <View style={styles.carouselPlaceholder}>
                    <Text>
                        {adventures && adventures.length > 0
                            ? 'Loading adventures...'
                            : 'No adventures to display'}
                    </Text>
                </View>
            )}
        </View>
    );
};

// --- Home Screen Component ---
const HomeScreen = () => {
    // Assuming accessToken is provided by useUser context
    const { dataUser, accessToken, logoutUser } = useUser();
    const [latestAdventures, setLatestAdventures] = useState<Adventure[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAdventures = async () => {
            if (!accessToken) {
                setIsLoading(false);
                logoutUser();
                return;
            }

            try {
                const response = await API.get<{ adventures: Adventure[] }>(
                    '/adventures',
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    },
                );
                setLatestAdventures(response.data.adventures || []);
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
            } finally {
                setIsLoading(false);
            }
        };

        fetchAdventures();
    }, [accessToken]); // Re-fetch if accessToken changes

    const handleAvatarPress = () => {
        console.log('Avatar pressed!');
        // Navigate to profile or open menu
    };

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search adventures..."
                />
                <TouchableOpacity
                    onPress={handleAvatarPress}
                    style={styles.avatarContainer}
                >
                    <Image
                        source={{
                            uri:
                                dataUser?.avatarUrl ||
                                'https://via.placeholder.com/40',
                        }}
                        style={styles.avatar}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.contentContainer}>
                <AdventureCarousel
                    title="Latest Adventure"
                    adventures={latestAdventures}
                />
                <AdventureCarousel title="Discover Adventures" />
            </ScrollView>
        </View>
    );
};

export default HomeScreen;

// --- Styles ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 10, // Increased padding for status bar
        paddingBottom: 10,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    searchBar: {
        flex: 1,
        height: 40,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        paddingHorizontal: 15,
        marginRight: 10,
        fontSize: 16,
    },
    avatarContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#cccccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    contentContainer: {
        flex: 1,
    },
    carouselContainer: {
        marginTop: 20,
        marginBottom: 10, // Added margin bottom
    },
    carouselTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 15, // Added left margin for title
    },
    carouselListContainer: {
        paddingHorizontal: 15, // Add padding here for items
    },
    carouselPlaceholder: {
        height: 150,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 15, // Added margin to match list padding
    },
    // Styles for individual adventure items in the carousel
    adventureItem: {
        width: adventureItemWidth,
        height: 150, // Match placeholder height or adjust as needed
        backgroundColor: '#ffffff',
        borderRadius: 8,
        marginRight: 10,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // Add shadow or border if desired
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        position: 'relative',
    },
    adventureTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    adventureImage: {
        width: '100%',
        height: '100%',
        borderBottomStartRadius: 8,
        borderBottomEndRadius: 8,
    },
});
