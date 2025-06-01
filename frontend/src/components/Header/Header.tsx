import { StyleSheet, Text, View } from 'react-native';

const Header = ({
    title = 'Mon Application',
    leftButton,
    rightButton,
}: {
    title?: string;
    leftButton?: React.ReactNode;
    rightButton?: React.ReactNode;
}) => {
    return (
        <View style={styles.header}>
            {leftButton || <View style={{ width: 24 }} />}
            <Text style={styles.title}>{title}</Text>
            {rightButton || <View style={{ width: 24 }} />}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flex: 0.1,
        backgroundColor: '#FFEDD3',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#333',

        // 💡 iOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,

        // 💡 Android shadow
        elevation: 3,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Header;
