import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/navigationType';
import API from '../services/api';
import { AxiosError } from 'axios';

const CreateAdventureForm = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dataAdventure, setDataAdventure] = useState<{
        _id: string;
        title: string;
    }>();

    const handleCreate = async () => {
        try {
            const response = await API.post('/adventures/create', {
                title,
                description,
            });
            setDataAdventure(response.data);
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
    }, [dataAdventure]);
    return (
        <View style={styles.content}>
            <Text style={styles.title}>Création d'une nouvelle aventure</Text>
            <TextInput
                style={styles.input}
                placeholder="Titre"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={[styles.input, styles.descriptionInput]}
                multiline
                numberOfLines={6}
                onChangeText={setDescription}
                value={description}
                placeholder="Description de cette aventure"
            />
            <View style={styles.buttonContainer}>
                <Button
                    title="Créer l'aventure"
                    onPress={handleCreate}
                    color="#591802"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 24,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 20,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    descriptionInput: {
        height: 150,
        textAlignVertical: 'top',
    },
    buttonContainer: {
        width: '100%',
        borderRadius: 8,
        overflow: 'hidden',
    },
});

export default CreateAdventureForm;
