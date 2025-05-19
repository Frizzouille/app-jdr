import { StyleSheet, Text, TextInput, View } from 'react-native';

type BackstoryStepProps = {
    backstory?: string;
    onUpdate: (updatedBackstory: string) => void;
};

export default function BackstoryStep({
    backstory,
    onUpdate,
}: BackstoryStepProps) {
    return (
        <View style={styles.content}>
            <Text style={styles.title}>Description de votre personnage</Text>
            <TextInput
                style={styles.descriptionInput}
                editable
                multiline
                onChangeText={(text) => onUpdate(text)}
                value={backstory}
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
    descriptionInput: {
        flex: 1,
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
});
