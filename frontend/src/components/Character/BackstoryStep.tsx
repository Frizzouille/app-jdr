import { StyleSheet, Text, TextInput, View } from 'react-native';
import { CharacterFormData } from './CreateCharacterForm';

type BackstoryStepProps = {
    name?: string;
    backstory?: string;
    onUpdate: (data: Partial<CharacterFormData>) => void;
};

export default function BackstoryStep({
    name,
    backstory,
    onUpdate,
}: BackstoryStepProps) {
    return (
        <View style={styles.content}>
            <Text style={styles.title}>Nom de votre personnage</Text>

            <TextInput
                style={[styles.input, styles.nameInput]}
                editable
                onChangeText={(text) => onUpdate({ name: text })}
                value={name ?? ''}
            />
            <Text style={styles.title}>Description de votre personnage</Text>
            <TextInput
                style={[styles.input, styles.descriptionInput]}
                editable
                multiline
                onChangeText={(text) => onUpdate({ backstory: text })}
                value={backstory ?? ''}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    content: { flex: 1 },
    title: {
        fontSize: 22,
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
        textAlignVertical: 'top',
    },
    nameInput: {
        height: 100,
    },
    descriptionInput: {
        flex: 1,
    },
});
