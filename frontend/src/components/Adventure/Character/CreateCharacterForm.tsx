import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import axios from 'axios';
import CharacterCreationNavigation from './CharacterCreationNavigation';
import RaceStep from './RaceStep';
import ClassStep from './ClassStep';

export type CharacterFormData = {
    adventureId: string;
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
    skills: { classSkills: string[]; backgroundSkills: string[] };
    languages: string[];
};

export default function CharacterCreationScreen({
    adventureId,
    onCharacterCreated,
}: {
    adventureId: string;
    onCharacterCreated: (character: Object) => void;
}) {
    const [step, setStep] = useState(0);
    const [characterData, setCharacterData] = useState<
        Partial<CharacterFormData>
    >({ adventureId: adventureId });

    const updateCharacter = (newData: Partial<CharacterFormData>) => {
        setCharacterData((prev) => ({ ...prev, ...newData }));
    };

    const [listRaces, updateListRaces] = useState<{ [key: string]: {} }>({});
    const [listClasses, updateListClasses] = useState<{ [key: string]: {} }>(
        {},
    );

    const APIDnD = axios.create({
        baseURL: 'https://www.dnd5eapi.co',
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

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
                <>
                    <RaceStep
                        dataCharacter={characterData}
                        updateCharacter={updateCharacter}
                        APIDnD={APIDnD}
                        listRaces={listRaces}
                        updateListRaces={updateListRaces}
                    />
                </>
            )}
            {step === 1 && (
                <>
                    <ClassStep
                        dataCharacter={characterData}
                        updateCharacter={updateCharacter}
                        APIDnD={APIDnD}
                        listClasses={listClasses}
                        updateListClasses={updateListClasses}
                    />
                </>
            )}
            <CharacterCreationNavigation
                onPrevious={() => {
                    setStep(step - 1);
                }}
                onNext={() => {
                    setStep(step + 1);
                }}
            />
        </ScrollView>
    );
}
