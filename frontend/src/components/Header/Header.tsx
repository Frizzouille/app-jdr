import { 
    StyleSheet, 
    Text, 
    View,
    Image
} from 'react-native';

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
            
             <Image
                source={require('../../../assets/logoTemp.png')} // remplace par ton chemin
                style={styles.logo}
                resizeMode="contain"
            />

            {rightButton || <View style={{ width: 24 }} />}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 90,
        backgroundColor: '#FFEDD3',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#333',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 3,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    logo: {
        height: 70,
    },
});

export default Header;
