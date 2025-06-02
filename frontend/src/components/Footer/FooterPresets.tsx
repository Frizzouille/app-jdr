import { useNavigation } from '@react-navigation/native';
import { 
    TouchableOpacity,
    StyleSheet,
    Image
 } from 'react-native';
import { ReactNode } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import iconMyAccount from '../../../assets/icon/iconMyAccount.png';
import iconMyAdventures from '../../../assets/icon/iconMyAdventures.png';
import iconSearch from '../../../assets/icon/iconSearch.png';

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
                    <Image source={iconSearch} style={styles.iconFooter} />
                </TouchableOpacity>
            ),
            centerButton: (
                <TouchableOpacity onPress={() => {}}>
                    <Image source={iconMyAdventures} style={styles.iconFooter} />
                </TouchableOpacity>
            ),
            rightButton: (
                <TouchableOpacity onPress={() => {}}>
                    <Image source={iconMyAccount} style={styles.iconFooter} />
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


const styles = StyleSheet.create({
    iconFooter:{
        width:50,
        height:50,
    },
});