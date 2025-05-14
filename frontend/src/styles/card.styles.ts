import { StyleSheet } from 'react-native';
import { colors } from './colors';


export const cardStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: colors.light,
    },
    card: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
    },
});
