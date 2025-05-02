// src/pages/MasterHomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';

// API
import API from '../../services/api';
import { AxiosError } from 'axios';

import { useUser } from '../../context/userContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/navigationType';
const MasterHomeScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dataAdventure, setDataAdventure] = useState<{
        _id: string;
        title: string;
    }>();
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const { accessToken } = useUser();
    const handleCreate = async () => {
        try {
            const response = await API.post('/adventures/create', {
                // headers: {
                //     Authorization: `Bearer ${accessToken}`,
                // },
                title,
                description,
            });
            setDataAdventure(response.data);
            setShouldRedirect(true);
        } catch (error) {
            if (error instanceof AxiosError) {
                // Ici, on sait que c'est une erreur Axios et qu'elle a une réponse
                console.error(
                    '❌ Erreur de connexion :',
                    error.response?.data || error.message,
                );
            } else {
                // En cas d'autres erreurs imprévues
                console.error('❌ Une erreur inconnue est survenue :', error);
            }
        }
    };

    useEffect(() => {
        if (dataAdventure?.title)
            navigation.navigate('Adventure', {
                idAdventure: dataAdventure._id,
            });
    }, [shouldRedirect]);
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>
                    Création d'une nouvelle aventure
                </Text>
                <TextInput
                    placeholder="Titre"
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                />
                <TextInput
                    multiline
                    numberOfLines={6}
                    onChangeText={setDescription}
                    value={description}
                    placeholder="Description de cette aventure"
                    style={styles.textArea}
                />
                <View style={styles.button}>
                    <Button title="Créer l'aventure" onPress={handleCreate} />
                </View>
            </View>
        </View>
    );
};

export default MasterHomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f2f2', // fond global léger
        padding: 16,
    },
    card: {
        width: '100%',
        maxWidth: 600,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 24,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
        backgroundColor: '#fafafa',
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        height: 120,
        fontSize: 16,
        backgroundColor: '#fafafa',
        textAlignVertical: 'top',
        marginBottom: 16,
    },
    button: {
        marginTop: 8,
        borderRadius: 8,
        overflow: 'hidden',
    },
});
