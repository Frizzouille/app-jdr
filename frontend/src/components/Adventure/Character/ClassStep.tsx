import SelectableGrid from './SelectableGrid';
import { CharacterFormData } from './CreateCharacterForm';
import { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { AxiosInstance } from 'axios';

type ClassStepProps = {
    dataCharacter: Partial<CharacterFormData>;
    updateCharacter: (data: Partial<CharacterFormData>) => void;
    APIDnD: AxiosInstance;
    listClasses: { [key: string]: any };
    updateListClasses: (data: { [key: string]: any }) => void;
};

export default function ClassStep({
    dataCharacter,
    updateCharacter,
    APIDnD,
    listClasses,
    updateListClasses,
}: ClassStepProps) {
    const [loading, setLoading] = useState(true);
    const [selectedClassDetails, setSelectedClassDetails] = useState<any>(null);

    useEffect(() => {
        if (Object.keys(listClasses).length === 0) {
            fetchClassesList();
        } else setLoading(false);
    }, [listClasses]);

    useEffect(() => {
        if (
            dataCharacter.classes &&
            listClasses[dataCharacter.classes[0].class]
        ) {
            setSelectedClassDetails(
                listClasses[dataCharacter.classes[0].class],
            );
        }
    }, [dataCharacter.classes, listClasses]);

    const fetchClassesList = async () => {
        try {
            const response = await APIDnD.get<{
                results: { index: string; name: string }[];
            }>('/api/2014/classes', {});

            const formatedClasses = response.data.results.reduce(
                (acc, item) => {
                    acc[item.index] = item;
                    return acc;
                },
                {} as { [key: string]: {} },
            );
            updateListClasses(formatedClasses);
        } catch (error) {
            console.error('Error fetching classes list:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClassSelect = async (classKey: string) => {
        if (!listClasses[classKey].ability_bonuses) {
            try {
                const response = await APIDnD.get(listClasses[classKey]?.url);

                // Mettre à jour listClasses avec les nouvelles données
                const updatedClasses = {
                    ...listClasses,
                    [classKey]: response.data,
                };
                updateListClasses(updatedClasses);

                // Mettre à jour le personnage
                updateCharacter({ classes: [{ class: classKey, level: 1 }] });
                setSelectedClassDetails(response.data);
            } catch (error) {
                console.error('Error fetching classes details:', error);
            } finally {
                setLoading(false);
            }
        } else {
            // Si la classe est déjà dans listClasses, juste mettre à jour le personnage
            updateCharacter({ classes: [{ class: classKey, level: 1 }] });
            setSelectedClassDetails(listClasses[classKey]);
        }
    };

    if (loading) {
        return <Text>Loading classes...</Text>;
    }

    return (
        <View style={styles.container}>
            <SelectableGrid
                title="Class"
                items={Object.entries(listClasses).reduce(
                    (acc, [key, value]) => {
                        acc[key] = value.name;
                        return acc;
                    },
                    {} as { [key: string]: string },
                )}
                selected={
                    dataCharacter.classes
                        ? dataCharacter.classes[0].class
                        : null
                }
                onSelect={handleClassSelect}
            />

            {selectedClassDetails && (
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>
                        {selectedClassDetails.name} Details
                    </Text>
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
