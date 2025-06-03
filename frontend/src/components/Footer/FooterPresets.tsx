import { useNavigation } from '@react-navigation/native';
import { 
    TouchableOpacity,
    StyleSheet,
    Text,
    Image
 } from 'react-native';
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
                <TouchableOpacity onPress={() => {}} style={styles.iconContainer}>
                    <Image source={require('../../../assets/icon/iconSearch.png')} style={styles.iconFooter} />
                    <Text style={styles.textFooter}>Découvrir !</Text>
                </TouchableOpacity>
            ),
            centerButton: (
                <TouchableOpacity onPress={() => {}} style={styles.iconContainer}>
                    <Image source={require('../../../assets/icon/iconMyAdventures.png')} style={styles.iconFooter} />
                    <Text style={styles.textFooter}>Mes aventures</Text>
                </TouchableOpacity>
            ),
            rightButton: (
                <TouchableOpacity onPress={() => {}} style={styles.iconContainer }>
                    <Image source={require('../../../assets/icon/iconMyAccount.png')} style={[styles.iconFooter, {width: 35, height: 35}]} />
                    <Text style={styles.textFooter}>Mon compte</Text>
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
        width:40,
        height:40,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textFooter: {
        fontWeight:'bold',
        fontSize: 14,
    },
});