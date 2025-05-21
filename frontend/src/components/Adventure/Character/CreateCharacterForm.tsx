import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import CharacterCreationNavigation from './CharacterCreationNavigation';
import RaceStep from './RaceStep';
import StatsStep from './StatsStep';
import BackstoryStep from './BackstoryStep';
import FeaturesStep from './FeaturesStep';
import SkillsStep from './SkillsStep';
import API from '../../../services/api';

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
    >({});
    const [bonusRaces, setBonusRaces] = useState<{ [key: string]: number }>({});
    const [features, setFeatures] = useState<{ [key: string]: string }>({});
    const [skills, setSkills] = useState<{
        classSkills: { [key: string]: string };
        backgroundSkills: { [key: string]: string };
    }>({ classSkills: {}, backgroundSkills: {} });

    const updateCharacter = (newData: Partial<CharacterFormData>) => {
        setCharacterData((prev) => ({ ...prev, ...newData }));
    };

    const getRacesBonus = async () => {
        try {
            const response = await API.get<{
                bonus: { [key: string]: number };
            }>(`/characters/bonus?race=${characterData.race}`, {});

            setBonusRaces(response.data.bonus);
        } catch (error) {
            console.error(
                '❌ An unknown error occurred while fetching bonus:',
                error,
            );
        }
    };
    const getFeatures = async () => {
        try {
            const response = await API.get<{
                features: { [key: string]: string };
            }>(
                `/characters/features/${
                    characterData.classes ? characterData.classes[0].class : ''
                }?language=fr`,
                {},
            );

            setFeatures(response.data.features);
        } catch (error) {
            console.error(
                '❌ An unknown error occurred while fetching bonus:',
                error,
            );
        }
    };
    const getSkillsOpportunities = async () => {
        try {
            const response = await API.get<{
                skills: {
                    classSkills: { [key: string]: string };
                    backgroundSkills: { [key: string]: string };
                };
            }>(
                `/characters/skills?language=fr${
                    characterData.classes
                        ? '&class=' + characterData.classes[0].class
                        : ''
                }` +
                    `${
                        characterData.background
                            ? '&background=' + characterData.background
                            : ''
                    }`,
                {},
            );

            setSkills(response.data.skills);
        } catch (error) {
            console.error(
                '❌ An unknown error occurred while fetching bonus:',
                error,
            );
        }
    };

    const createCharacters = async () => {
        try {
            const response = await API.post('/characters/create', {
                adventureId,
                characterData,
            });

            onCharacterCreated(response.data.character);
        } catch (error) {
            console.error(
                '❌ An unknown error occurred while fetching bonus:',
                error,
            );
        }
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
                <>
                    <RaceStep
                        dataCharacter={characterData}
                        updateCharacter={updateCharacter}
                    />
                    <CharacterCreationNavigation
                        onPrevious={() => {
                            setStep(step - 1);
                        }}
                        onNext={() => {
                            getRacesBonus();
                            getFeatures();
                            getSkillsOpportunities();
                            setStep(step + 1);
                        }}
                        isPreviousDisabled={true}
                        isNextDisabled={
                            !characterData.race ||
                            !characterData.classes ||
                            !characterData.background
                        }
                        nextTest="Suivant"
                    />
                </>
            )}
            {step === 1 && (
                <>
                    <StatsStep
                        stats={characterData.stats || {}}
                        bonus={bonusRaces}
                        onUpdate={(updatedStats: { [key: string]: number }) => {
                            updateCharacter({
                                ...characterData,
                                stats: updatedStats,
                            });
                        }}
                    />
                    <CharacterCreationNavigation
                        onPrevious={() => {
                            setStep(step - 1);
                        }}
                        onNext={() => {
                            setStep(step + 1);
                        }}
                        isPreviousDisabled={false}
                        isNextDisabled={false}
                        nextTest="Suivant"
                    />
                </>
            )}
            {step === 2 && (
                <>
                    <FeaturesStep features={features} />
                    <CharacterCreationNavigation
                        onPrevious={() => {
                            setStep(step - 1);
                        }}
                        onNext={() => {
                            setStep(step + 1);
                        }}
                        isPreviousDisabled={false}
                        isNextDisabled={false}
                        nextTest="Suivant"
                    />
                </>
            )}
            {step === 3 && (
                <>
                    <SkillsStep skills={skills} />
                    <CharacterCreationNavigation
                        onPrevious={() => {
                            setStep(step - 1);
                        }}
                        onNext={() => {
                            setStep(step + 1);
                        }}
                        isPreviousDisabled={false}
                        isNextDisabled={false}
                        nextTest="Suivant"
                    />
                </>
            )}
            {step === 10 && (
                <>
                    <BackstoryStep
                        name={characterData.name}
                        backstory={characterData.backstory}
                        onUpdate={updateCharacter}
                    />
                    <CharacterCreationNavigation
                        onPrevious={() => {
                            setStep(step - 1);
                        }}
                        onNext={() => {
                            createCharacters();
                        }}
                        isPreviousDisabled={false}
                        isNextDisabled={false}
                        nextTest="Créer le personnage"
                    />
                </>
            )}
        </ScrollView>
    );
}
