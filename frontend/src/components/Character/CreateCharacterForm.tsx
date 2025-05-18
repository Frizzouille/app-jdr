import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import CharacterCreationNavigation from '../Adventure/CharacterCreationNavigation';
import RaceStep from './RaceStep';

export type CharacterFormData = {
    name: string;
    race: string;
    classes: {
        class: string;
        level: number;
    }[];
    background: string;
    stats: {
        strength: number;
        dexterity: number;
        constitution: number;
        intelligence: number;
        wisdom: number;
        charisma: number;
    };
    description: string;
    backstory: string;
};

export default function CharacterCreationScreen() {
    const [step, setStep] = useState(0);

    const [characterData, setCharacterData] = useState<
        Partial<CharacterFormData>
    >({});

    const updateCharacter = (newData: Partial<CharacterFormData>) => {
        setCharacterData((prev) => ({ ...prev, ...newData }));
    };
    return (
        <ScrollView
            contentContainerStyle={{
                paddingVertical: 6,
                paddingHorizontal: 16,
            }}
        >
            {step === 0 && (
                <RaceStep
                    dataCharacter={characterData}
                    updateCharacter={updateCharacter}
                />
            )}
            <CharacterCreationNavigation
                onPrevious={() => {
                    setStep(step - 1);
                }}
                onNext={() => {
                    setStep(step + 1);
                }}
                isPreviousDisabled={true}
                isNextDisabled={
                    !characterData.race ||
                    !characterData.classes ||
                    !characterData.background
                }
            />
        </ScrollView>
    );
}
