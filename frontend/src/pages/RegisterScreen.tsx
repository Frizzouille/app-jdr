import { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { StackNavigationProp } from '@react-navigation/stack';

import API from '../../services/api'; // ajuste le chemin selon ta structure
import { loginStyle } from '../../styles/LoginScreen.styles';
import axios from 'axios';

export default function RegisterScreen() {
    const route = useRoute<RouteProp<RootStackParamList, 'Login'>>();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string[]>([]);

    const { updateAccessToken } = route.params;

    const handleRegister = async () => {
        let isValidRegister = true;
        const newErrors: string[] = [];

        if (!email.includes('@')) {
            newErrors.push("L'adresse mail est invalide.");
            isValidRegister = false;
        }

        if (password.length < 6) {
            newErrors.push(
                'Le mot de passe doit contenir au moins 6 caractères.',
            );
            isValidRegister = false;
        }

        if (password !== confirmedPassword) {
            newErrors.push('Les mots de passe ne correspondent pas.');
            isValidRegister = false;
        }

        if (!isValidRegister) {
            setErrorMessage(newErrors);
            return;
        }
        try {
            const response = await API.post('/users/create', {
                email,
                password,
            });
            navigation.navigate('Accueil', {
                dataUser: response.data,
                updateAccessToken: updateAccessToken,
            });
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                const data = error.response.data;
                setErrorMessage(data.message);
            } else {
                setErrorMessage(['Erreur réseau. Veuillez réessayer.']);
            }
        }
    };

    return (
        <View style={loginStyle.container}>
            <Text style={loginStyle.title}>Créer un compte</Text>

            <TextInput
                style={loginStyle.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={loginStyle.input}
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={loginStyle.input}
                placeholder="Confirmer le mot de passe"
                value={confirmedPassword}
                onChangeText={setConfirmedPassword}
                secureTextEntry
            />
            {Array.isArray(errorMessage) && errorMessage.length > 0 && (
                <>
                    {errorMessage.map((element, index) => (
                        <Text key={index} style={loginStyle.error}>
                            {element}
                        </Text>
                    ))}
                </>
            )}
            <Button title="Créer le compte" onPress={handleRegister} />
        </View>
    );
}
