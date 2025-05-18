import { StyleSheet } from 'react-native';
import { colors } from './colors';


export const cardStyle = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: colors.light,
    },
    card: {
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
    },
});
