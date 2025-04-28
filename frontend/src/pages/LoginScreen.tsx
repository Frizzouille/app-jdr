import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    //@ts-ignore Ajouter pour désactiver une erreur dans vscode
    CheckBox,
} from 'react-native';
import { AxiosError } from 'axios'; // Import de AxiosError

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute, useNavigation } from '@react-navigation/native';

import { RootStackParamList } from '../../types/navigation';
import API from '../../services/api';
import { loginStyle } from '../../styles/LoginScreen.styles';

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
                dataUser: response.data,
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
        <View style={loginStyle.container}>
            <Text style={loginStyle.title}>Connexion</Text>

            <TextInput
                style={loginStyle.input}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
            />

            <TextInput
                style={loginStyle.input}
                placeholder="Mot de passe"
                secureTextEntry
                onChangeText={setPassword}
                value={password}
            />
            <View style={loginStyle.checkboxContainer}>
                <CheckBox value={rememberMe} onValueChange={setRememberMe} />
                <Text style={loginStyle.checkboxLabel}>Se souvenir de moi</Text>
            </View>
            <View style={loginStyle.button}>
                <Button title="Se connecter" onPress={handleLogin} />
            </View>
            <View style={loginStyle.button}>
                <Button
                    title="Créer un compte"
                    onPress={() =>
                        navigation.navigate('Register', { updateAccessToken })
                    }
                    color="#00a35c"
                />
            </View>
        </View>
    );
};

export default LoginScreen;
