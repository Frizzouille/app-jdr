import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function ProficienciesStep({
    proficiencies,
}: {
    proficiencies: {
        classSkills: { [key: string]: string };
        numberClassSkills: number;
        backgroundSkills: { [key: string]: string };
        raceLanguages: { [key: string]: string };
    };
}) {
    const [selectedClassSkills, setSelectedClassSkills] = useState<string[]>(
        Array(proficiencies.numberClassSkills).fill(
            Object.keys(proficiencies.classSkills)[0],
        ),
    );
    const [selectedBackgroundSkills, setSelectedBackgroundSkills] = useState<
        string[]
    >([
        Object.keys(proficiencies.backgroundSkills)[0],
        Object.keys(proficiencies.backgroundSkills)[1],
    ]);

    const [selectedLanguages, setSelectedLanguages] = useState(
        Object.keys(proficiencies.raceLanguages)[0],
    );
    return (
        <View>
            <Text>Vos capacités de classe :</Text>
            <View style={styles.pickerContainer}>
                {selectedClassSkills.map((value, index) => (
                    <Picker
                        key={index}
                        selectedValue={value}
                        onValueChange={(itemValue) => {
                            const updated = [...selectedClassSkills];
                            updated[index] = itemValue;
                            setSelectedClassSkills(updated);
                        }}
                        style={styles.picker}
                    >
                        {Object.entries(proficiencies.classSkills).map(
                            ([key, label]) => (
                                <Picker.Item
                                    key={key}
                                    label={label}
                                    value={key}
                                />
                            ),
                        )}
                    </Picker>
                ))}
            </View>

            <Text>Compétences de background :</Text>
            <View style={styles.pickerContainer}>
                {selectedBackgroundSkills.map((value, index) => (
                    <Picker
                        key={index}
                        selectedValue={value}
                        enabled={false}
                        onValueChange={(itemValue) => {
                            const updated = [...selectedBackgroundSkills];
                            updated[index] = itemValue;
                            setSelectedBackgroundSkills(updated);
                        }}
                        style={styles.picker}
                    >
                        {Object.entries(proficiencies.backgroundSkills).map(
                            ([key, label]) => (
                                <Picker.Item
                                    key={key}
                                    label={label}
                                    value={key}
                                />
                            ),
                        )}
                    </Picker>
                ))}
            </View>
            <Text>Langues maîtrisées :</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedLanguages}
                    onValueChange={(itemValue) => {
                        setSelectedLanguages(itemValue);
                    }}
                    style={styles.picker}
                >
                    {Object.entries(proficiencies.raceLanguages).map(
                        ([key, label]) => (
                            <Picker.Item key={key} label={label} value={key} />
                        ),
                    )}
                </Picker>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    content: { flex: 1 },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    pickerContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    picker: {
        width: '48%',
        marginVertical: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
});
