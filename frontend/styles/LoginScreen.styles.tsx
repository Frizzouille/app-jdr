import { StyleSheet } from 'react-native';

export const loginStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        width: 600,
        alignSelf: 'center',
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        backgroundColor: 'white',
        padding: 12,
        marginBottom: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    checkboxLabel: {
        marginLeft: 8,
    },
    button: {
        marginTop: 20,
    },
});
