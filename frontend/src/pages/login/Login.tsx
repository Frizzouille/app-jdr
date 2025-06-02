// src/pages/LoginScreen.tsx
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    //@ts-ignore Ajouter pour désactiver une erreur dans vscode
    CheckBox,
    TouchableOpacity,
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
import { colors } from '../../styles/colors';

// Contexte
import { useUser } from '../../context/userContext';

const LoginScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const { dataUser, setDataUser } = useUser();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await API.post('/auth/login', {
                email,
                password,
            });
            const accessToken = response.data.access_token;

            if (rememberMe) localStorage.setItem('accessToken', accessToken);

            if (response.data.id) {
                setDataUser({
                    id: response.data.id,
                    email: response.data.email,
                    accessToken: accessToken,
                });
            }
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

    // Rediriger après la mise à jour de dataUser
    useEffect(() => {
        if (dataUser?.id) {
            navigation.navigate('Home');
        }
    }, [dataUser]);
    return (
        <View style={{ flex: 1, backgroundColor: colors.light }}>
            <View style={loginStyle.container}>
                <View style={loginStyle.card}>
                    <Image
                        source={require('../../../assets/logoTemp.png')}
                        style={loginStyle.logo}
                        resizeMode="contain"
                    />
                    <Text style={loginStyle.title}>Connexion</Text>
                    <TextInput
                        style={loginStyle.input}
                        placeholder="Email"
                        onChangeText={setEmail}
                        value={email}
                    />

                    <TextInput
                        style={loginStyle.input}
                        placeholder="Password"
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
                            Keep me logged in.
                        </Text>
                    </View>

                    <View style={loginStyle.buttonContainer}>
                        <TouchableOpacity
                            style={loginStyle.registerButton}
                            onPress={() => navigation.navigate('Register')}
                        >
                            <Text
                                style={[
                                    loginStyle.buttonText,
                                    { color: 'white' },
                                ]}
                            >
                                Register
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={loginStyle.loginButton}
                            onPress={handleLogin}
                        >
                            <Text style={loginStyle.buttonText}>Log in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default LoginScreen;
