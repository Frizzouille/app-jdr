import SelectableGrid from './SelectableGrid';
import { CharacterFormData } from './CreateCharacterForm';
import { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import axios, { AxiosInstance } from 'axios';

type RaceStepProps = {
    dataCharacter: Partial<CharacterFormData>;
    updateCharacter: (data: Partial<CharacterFormData>) => void;
    APIDnD: AxiosInstance;
    listRaces: { [key: string]: any };
    updateListRaces: (data: { [key: string]: any }) => void;
};

const feetToMeters = (feet: number): number => {
    // 1 pied = 0.3048 mètres
    return parseFloat((feet * 0.3048).toFixed(2));
};

export default function RaceStep({
    dataCharacter,
    updateCharacter,
    APIDnD,
    listRaces,
    updateListRaces,
}: RaceStepProps) {
    const [loading, setLoading] = useState(true);
    const [selectedRaceDetails, setSelectedRaceDetails] = useState<any>(null);

    useEffect(() => {
        if (Object.keys(listRaces).length === 0) {
            fetchRacesList();
        } else setLoading(false);
    }, [listRaces]);

    useEffect(() => {
        if (dataCharacter.race && listRaces[dataCharacter.race]) {
            setSelectedRaceDetails(listRaces[dataCharacter.race]);
        }
    }, [dataCharacter.race, listRaces]);

    const fetchRacesList = async () => {
        try {
            const response = await APIDnD.get<{
                results: { index: string; name: string }[];
            }>('/api/2014/races', {});

            const formatedRaces = response.data.results.reduce((acc, item) => {
                acc[item.index] = item;
                return acc;
            }, {} as { [key: string]: {} });
            updateListRaces(formatedRaces);
        } catch (error) {
            console.error('Error fetching races list:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRaceSelect = async (raceKey: string) => {
        if (!listRaces[raceKey].ability_bonuses) {
            try {
                const response = await APIDnD.get(listRaces[raceKey]?.url);

                // Mettre à jour listRaces avec les nouvelles données
                const updatedRaces = {
                    ...listRaces,
                    [raceKey]: response.data,
                };
                updateListRaces(updatedRaces);

                // Mettre à jour le personnage
                updateCharacter({ race: raceKey });
                setSelectedRaceDetails(response.data);
            } catch (error) {
                console.error('Error fetching race details:', error);
            } finally {
                setLoading(false);
            }
        } else {
            // Si la race est déjà dans listRaces, juste mettre à jour le personnage
            updateCharacter({ race: raceKey });
            setSelectedRaceDetails(listRaces[raceKey]);
        }
    };

    if (loading) {
        return <Text>Loading races...</Text>;
    }

    return (
        <View style={styles.container}>
            <SelectableGrid
                title="Race"
                items={Object.entries(listRaces).reduce((acc, [key, value]) => {
                    acc[key] = value.name;
                    return acc;
                }, {} as { [key: string]: string })}
                selected={dataCharacter.race || null}
                onSelect={handleRaceSelect}
            />

            {selectedRaceDetails && (
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>
                        {selectedRaceDetails.name} Details
                    </Text>

                    {/* Bonus de caractéristiques */}
                    {selectedRaceDetails.ability_bonuses?.length > 0 && (
                        <View style={styles.detailSection}>
                            <Text style={styles.sectionTitle}>
                                Ability Bonuses:
                            </Text>
                            {selectedRaceDetails.ability_bonuses.map(
                                (bonus: any, index: number) => (
                                    <Text key={index} style={styles.detailText}>
                                        {bonus.ability_score.name}: +
                                        {bonus.bonus}
                                    </Text>
                                ),
                            )}
                        </View>
                    )}

                    {/* Vitesse */}
                    {selectedRaceDetails.speed && (
                        <View style={styles.detailSection}>
                            <Text style={styles.sectionTitle}>Speed:</Text>
                            <Text style={styles.detailText}>
                                {selectedRaceDetails.speed} feet (
                                {feetToMeters(selectedRaceDetails.speed)}{' '}
                                meters)
                            </Text>
                        </View>
                    )}

                    {/* Taille */}
                    {selectedRaceDetails.size && (
                        <View style={styles.detailSection}>
                            <Text style={styles.sectionTitle}>Size:</Text>
                            <Text style={styles.detailText}>
                                {selectedRaceDetails.size}
                            </Text>
                            {selectedRaceDetails.size_description && (
                                <Text style={styles.detailDescription}>
                                    {selectedRaceDetails.size_description}
                                </Text>
                            )}
                        </View>
                    )}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    detailsContainer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
    },
    detailsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    detailSection: {
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#444',
    },
    detailText: {
        fontSize: 14,
        color: '#555',
        marginLeft: 10,
        marginTop: 2,
    },
    detailDescription: {
        fontSize: 12,
        color: '#666',
        marginLeft: 10,
        marginTop: 2,
        fontStyle: 'italic',
    },
});
