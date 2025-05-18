import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ReactNode } from 'react';

type preset = {
    title?: string;
    leftButton?: ReactNode;
    rightButton?: ReactNode;
};
export const useHeaderPresets = (context: string) => {
    const navigation = useNavigation();

    const presets: Record<string, preset> = {
        adventures: {
            title: 'Mon Application',
            leftButton: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
            ),
            rightButton: (
                <TouchableOpacity onPress={() => console.log('Help')}>
                    <Ionicons
                        name="help-circle-outline"
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>
            ),
        },
        return: {
            title: 'Mon Application',
            leftButton: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
            ),
        },
    };

    return presets[context] || {};
};
