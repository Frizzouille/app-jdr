import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import API from '../services/api';
import { AxiosError } from 'axios';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/navigationType';

interface Invitation {
    _id: string;
    adventureId: { title: string };
}

interface InvitationsListProps {
    invitations: Invitation[] | undefined;
    updateInvitation: (invitationId: string, status: boolean) => void;
}

const InvitationsList = ({
    invitations,
    updateInvitation,
}: InvitationsListProps) => {
    const renderItem = ({ item }: { item: Invitation }) => (
        <View style={styles.invitationItem}>
            <Text style={styles.invitationName}>{item.adventureId.title} </Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.acceptButton]}
                    onPress={() => updateInvitation(item._id, true)}
                >
                    <Text style={styles.buttonText}>✓</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.rejectButton]}
                    onPress={() => updateInvitation(item._id, false)}
                >
                    <Text style={styles.buttonText}>✗</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <FlatList
            data={invitations}
            renderItem={renderItem}
            keyExtractor={(item) => item._id.toString()}
            contentContainerStyle={styles.listContainer}
        />
    );
};

const JoinAdventureForm = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const [invitations, setInvitations] = useState<Invitation[] | undefined>();
    const [adventureId, setAdventureId] = useState<false | string>(false);
    const isFocused = useIsFocused();

    const updateInvitation = async (id: string, status: boolean) => {
        try {
            const response = await API.post(`/invitations/update-status`, {
                invitationId: id,
                status: status.toString(),
            });
            if (response.data.adventureId)
                setAdventureId(response.data.adventureId);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(
                    '❌ Error fetching adventures:',
                    error.response?.data || error.message,
                );
            } else {
                console.error(
                    '❌ An unknown error occurred while fetching adventures:',
                    error,
                );
            }
        }
    };

    useEffect(() => {
        const fetchInvitations = async () => {
            try {
                const response = await API.get<{ invitations: Invitation[] }>(
                    `/invitations`,
                    {},
                );
                setInvitations(response.data.invitations || []);
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.error(
                        '❌ Error fetching adventures:',
                        error.response?.data || error.message,
                    );
                } else {
                    console.error(
                        '❌ An unknown error occurred while fetching adventures:',
                        error,
                    );
                }
            }
        };

        fetchInvitations();
    }, [isFocused]);

    useEffect(() => {
        if (adventureId)
            navigation.navigate('AdventurePlayer', {
                idAdventure: adventureId,
            });
    }, [adventureId]);

    if (invitations && invitations.length > 0) {
        return (
            <View style={styles.container}>
                <InvitationsList
                    invitations={invitations}
                    updateInvitation={updateInvitation}
                />
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <Text style={styles.message}>Vous n'avez pas d'invitation</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    message: {
        fontSize: 18,
        color: '#333',
        fontWeight: '500',
    },
    listContainer: {
        padding: 16,
    },
    invitationItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        marginBottom: 12,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2, // Ombre pour Android
        shadowColor: '#000', // Ombre pour iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    invitationName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    buttonsContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    button: {
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
    },
    acceptButton: {
        backgroundColor: '#4CAF50', // Vert
    },
    rejectButton: {
        backgroundColor: '#F44336', // Rouge
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default JoinAdventureForm;
