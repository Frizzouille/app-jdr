import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    CheckBox,
    StyleSheet,
} from 'react-native';
import { AxiosError } from 'axios'; // Import de AxiosError

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import { useRoute, useNavigation } from '@react-navigation/native';

import API from '../../services/api'; // ajuste le chemin selon ta structure

const LoginScreen = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'Login'>>();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const { updateAccessToken } = route.params;
    const handleLogin = async () => {
        try {
            const response = await API.post('/auth/login', {
                email,
                password,
            });
            const accessToken = response.data.access_token;
            if (rememberMe) {
                updateAccessToken(() => {
                    localStorage.setItem('accessToken', accessToken);
                    return accessToken;
                });
            }

            navigation.navigate('Accueil', {
                accessToken: accessToken,
                updateAccessToken: updateAccessToken,
            });
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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Connexion</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
            />

            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                secureTextEntry
                onChangeText={setPassword}
                value={password}
            />
            <View style={styles.checkboxContainer}>
                <CheckBox value={rememberMe} onValueChange={setRememberMe} />
                <Text style={styles.checkboxLabel}>Se souvenir de moi</Text>
            </View>
            <Button title="Se connecter" onPress={handleLogin} />
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        backgroundColor: 'white',
        padding: 12,
        marginBottom: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    checkboxLabel: {
        marginLeft: 8,
    },
});
