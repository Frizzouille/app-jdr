import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/navigationType';
import API from '../services/api';
import { AxiosError } from 'axios';

const CreateCharacterForm = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const handleCreate = async () => {};
    return <View style={styles.content}></View>;
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 24,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
});

export default CreateCharacterForm;
