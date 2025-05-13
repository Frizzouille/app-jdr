import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/navigationType';
import { useUser } from '../context/userContext';
import API from '../services/api';
import { AxiosError } from 'axios';
import Header from './Header';
import Footer from './Footer';

const CreateAdventureForm = () => {
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
        <SafeAreaView style={styles.container}>
            <Header context="return" />
            <View style={styles.content}>
                <Text>Création d'une nouvelle aventure</Text>
                <TextInput
                    placeholder="Titre"
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    multiline
                    numberOfLines={6}
                    onChangeText={setDescription}
                    value={description}
                    placeholder="Description de cette aventure"
                />
                <View>
                    <Button title="Créer l'aventure" onPress={handleCreate} />
                </View>
            </View>
            <Footer context="home" currentPage="home" />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        padding: 16,
    },
});

export default CreateAdventureForm;
