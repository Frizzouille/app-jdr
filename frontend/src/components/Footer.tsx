import { StyleSheet, View } from 'react-native';

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
        flex: 0.1,
        backgroundColor: '#FFEDD3',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#333',
    },
});

export default Footer;
