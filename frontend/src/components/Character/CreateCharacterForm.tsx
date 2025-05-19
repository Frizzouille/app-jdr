import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import CharacterCreationNavigation from '../Adventure/CharacterCreationNavigation';
import RaceStep from './RaceStep';
import StatsStep from './StatsStep';
import Backstory from './BackstoryStep';
import BackstoryStep from './BackstoryStep';

export type CharacterFormData = {
    name: string;
    race: string;
    classes: {
        class: string;
        level: number;
    }[];
    background: string;
    stats: { [key: string]: number };
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
                flex: 1,
                justifyContent: 'space-between',
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
            {step === 1 && (
                <StatsStep
                    stats={characterData.stats || {}}
                    onUpdate={(updatedStats: { [key: string]: number }) =>
                        updateCharacter({
                            ...characterData,
                            stats: updatedStats,
                        })
                    }
                />
            )}
            {step === 2 && (
                <BackstoryStep
                    backstory={characterData.backstory}
                    onUpdate={(updatedBackstory: string) =>
                        updateCharacter({
                            ...characterData,
                            backstory: updatedBackstory,
                        })
                    }
                />
            )}
            <CharacterCreationNavigation
                onPrevious={() => {
                    setStep(step - 1);
                }}
                onNext={() => {
                    setStep(step + 1);
                }}
                isPreviousDisabled={step === 0}
                isNextDisabled={
                    !characterData.race ||
                    !characterData.classes ||
                    !characterData.background
                }
            />
        </ScrollView>
    );
}
