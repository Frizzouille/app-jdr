// NewGame.tsx

import { useState } from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/navigationType';

// Composant
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CreateAdventureForm from '../../components/Adventure/CreateAdventureForm';
import JoinAdventureForm from '../../components/Adventure/JoinAdventureForm';

import { useHeaderPresets } from '../../components/Header/HeaderPresets';
import { useFooterPresets } from '../../components/Footer/FooterPresets';

const NewAdventures = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'NewAdventure'>>();
    const [mode, setMode] = useState<string | false>(false);

    const params = route.params;
    if (params) setMode(params.mode);

    return (
        <SafeAreaView style={styles.container}>
            <Header {...useHeaderPresets('return')} />
            <View style={styles.content}>
                {!mode && (
                    <>
                        <TouchableOpacity
                            style={styles.adventureButton}
                            onPress={() => setMode('create')}
                        >
                            <Text style={styles.buttonText}>
                                Créer une aventure (MJ)
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.adventureButton}
                            onPress={() => setMode('join')}
                        >
                            <Text style={styles.buttonText}>
                                Rejoindre une aventure (PJ)
                            </Text>
                        </TouchableOpacity>
                    </>
                )}

                {mode === 'create' && <CreateAdventureForm />}
                {mode === 'join' && <JoinAdventureForm />}
            </View>
            <Footer {...useFooterPresets('home')} />
        </SafeAreaView>
    );
};

export default NewAdventures;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    adventureButton: {
        backgroundColor: '#591802',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
