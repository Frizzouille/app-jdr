import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CharacterCreationNavigation = ({
    onPrevious,
    onNext,
}: {
    onPrevious: () => void;
    onNext: () => void;
}) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
            }}
        >
            <TouchableOpacity onPress={onPrevious} style={styles.button}>
                <Text style={styles.buttonText}>Précédent</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onNext} style={styles.button}>
                <Text style={styles.buttonText}>Suivant</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#05a85c',
        padding: 12,
        borderRadius: 8,
        flex: 1,
        marginRight: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
    },
});

export default CharacterCreationNavigation;
