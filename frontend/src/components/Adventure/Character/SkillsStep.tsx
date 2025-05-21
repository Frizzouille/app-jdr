import { StyleSheet, Text, View } from 'react-native';

export default function SkillsStep({
    skills,
}: {
    skills: {
        classSkills: { [key: string]: string };
        backgroundSkills: { [key: string]: string };
    };
}) {
    return (
        <View style={styles.content}>
            <Text style={styles.title}>Vos capacités de classe :</Text>
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
