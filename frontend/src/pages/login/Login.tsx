// src/pages/LoginScreen.tsx
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    //@ts-ignore Ajouter pour désactiver une erreur dans vscode
    CheckBox,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

// API
import { AxiosError } from 'axios'; // Import de AxiosError
import API from '../../services/api';

// Navigation
import { RootStackParamList } from '../../navigation/navigationType';

// Style
import { loginStyle } from '../../styles/loginScreen.styles';
import { cardStyle } from '../../styles/card.styles';

// Contexte
import { useUser } from '../../context/userContext';

const LoginScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const { dataUser, setDataUser } = useUser();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    // Utilisation d'un useEffect car je mets a jour dataUser via un useState (asynchrone)
    useEffect(() => {
        if (dataUser?.id && dataUser?.email) navigation.navigate('Home');
    }, [shouldRedirect]);

    const handleLogin = async () => {
        try {
            const response = await API.post('/auth/login', {
                email,
                password,
            });
            const accessToken = response.data.access_token;

            if (rememberMe) localStorage.setItem('accessToken', accessToken);

            setDataUser({ id: response.data.id, email: response.data.email });
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

    return (
        <View style={cardStyle.container}>
            <View style={cardStyle.card}>
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
                    <CheckBox
                        value={rememberMe}
                        onValueChange={setRememberMe}
                    />
                    <Text style={loginStyle.checkboxLabel}>
                        Se souvenir de moi
                    </Text>
                </View>
                <View style={loginStyle.button}>
                    <Button title="Se connecter" onPress={handleLogin} />
                </View>
                <View style={loginStyle.button}>
                    <Button
                        title="Créer un compte"
                        onPress={() => navigation.navigate('Register')}
                        color="#00a35c"
                    />
                </View>
            </View>
        </View>
    );
};

export default LoginScreen;
