import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ReactNode } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type preset = {
    leftButton?: ReactNode;
    centerButton?: ReactNode;
    rightButton?: ReactNode;
};
export const useFooterPresets = (context: string) => {
    const navigation = useNavigation();

    const presets: Record<string, preset> = {
        home: {
            leftButton: (
                <TouchableOpacity onPress={() => {}}>
                    <MaterialCommunityIcons
                        name="magnify"
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>
            ),
            centerButton: (
                <TouchableOpacity onPress={() => {}}>
                    <MaterialCommunityIcons
                        name="human"
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>
            ),
            rightButton: (
                <TouchableOpacity onPress={() => {}}>
                    <MaterialCommunityIcons
                        name="account-cowboy-hat"
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>
            ),
        },
        adventures: {
            leftButton: (
                <>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons
                            name="wizard-hat"
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons
                            name="package-variant"
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>
                </>
            ),
            centerButton: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons
                        name="dna"
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>
            ),
            rightButton: (
                <>
                    <TouchableOpacity onPress={() => console.log('Help')}>
                        <MaterialCommunityIcons
                            name="notebook-outline"
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log('Help')}>
                        <MaterialCommunityIcons
                            name="chat-plus-outline"
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>
                </>
            ),
        },
    };

    return presets[context] || {};
};
