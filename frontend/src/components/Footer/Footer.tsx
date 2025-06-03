import { StyleSheet, View } from 'react-native';

// Style
import { colors } from '../../styles/colors';


const Footer = ({
    leftButton,
    centerButton,
    rightButton,
}: {
    leftButton?: React.ReactNode;
    centerButton?: React.ReactNode;
    rightButton?: React.ReactNode;
}) => {
    return (
        <View style={styles.footer}>
            {leftButton || <View style={{ width: 24 }} />}
            {centerButton || <View style={{ width: 24 }} />}
            {rightButton || <View style={{ width: 24 }} />}
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        backgroundColor: colors.light,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        paddingBottom: 15,
        height:90,

        // 💡 iOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,

        // 💡 Android shadow
        elevation: 3,
    },
});

export default Footer;
