import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const loginStyle = StyleSheet.create({
    container: {
            flex: 1,
            width:'100%',
            maxWidth: 300,
            justifyContent: 'center',
            alignSelf: 'center',
    },
    card: {
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
    },
    logo:{
        width: 200,
        height: 200,
    },
    title: {
        color: colors.dark,
        fontSize: 32,
        marginBottom: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        backgroundColor: colors.light,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,

        paddingVertical: 15,
        marginBottom: 16,
        borderRadius: 25,
        width:'100%',
        maxWidth: 300,
        textAlign: 'center',
        borderWidth: 0,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        width:'100%',
        maxWidth:300,
        marginBottom: 16,
    },
    checkboxLabel: {
        marginLeft: 8,
    },
    buttonContainer: {
        flexDirection: 'row',      // boutons en ligne
        justifyContent: 'space-between',
        width:'100%',
        maxWidth:300,
    },
    buttonText: {
        color: colors.black,
        textAlign:'center',
        fontWeight: 600,
    },
    loginButton: {
        width:'48%',
        backgroundColor: colors.lightBrown,
        borderRadius: 25,
        paddingVertical: 15,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    registerButton: {
        width:'48%',
        borderRadius: 25,
        paddingVertical: 15,
        backgroundColor: colors.dark,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    error: {
        color: colors.brown,
        fontWeight: 'bold',
        textAlign: 'center',
        
    },
    link: {
        color: '#591802',
        fontWeight: 'bold',
    },
});
