import { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { StackNavigationProp } from '@react-navigation/stack';

import API from '../../services/api'; // ajuste le chemin selon ta structure
import { loginStyle } from '../../styles/LoginScreen.styles';
import { AxiosError } from 'axios';

export default function RegisterScreen() {
    const route = useRoute<RouteProp<RootStackParamList, 'Login'>>();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setconfirmedPassword] = useState('');

    const { updateAccessToken } = route.params;

    const handleRegister = async () => {
        if (email === '' || password === '') {
            console.log('Champ non rempli');
            return;
        }
        if (password !== confirmedPassword) {
            console.log('Mot de passe différent');
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
        } catch (error) {
            console.error('Erreur de création de compte', error);
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
                onChangeText={setconfirmedPassword}
                secureTextEntry
            />
            <Button title="Créer le compte" onPress={handleRegister} />
        </View>
    );
}
