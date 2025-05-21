import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CharacterCreationNavigation = ({
    onPrevious,
    onNext,
    isPreviousDisabled,
    isNextDisabled,
    nextTest,
}: {
    onPrevious: () => void;
    onNext: () => void;
    isPreviousDisabled: boolean;
    isNextDisabled: boolean;
    nextTest: string;
}) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
            }}
        >
            <TouchableOpacity
                onPress={onPrevious}
                disabled={isPreviousDisabled}
                style={[
                    styles.previousButton,
                    {
                        backgroundColor: isPreviousDisabled
                            ? '#eee'
                            : '#4CAF50',
                    },
                ]}
            >
                <Text
                    style={{
                        color: isPreviousDisabled ? '#888' : '#fff',
                    }}
                >
                    Précédent
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={onNext}
                disabled={isNextDisabled}
                style={[
                    styles.nextButton,
                    { backgroundColor: isNextDisabled ? '#eee' : '#4CAF50' },
                ]}
            >
                <Text
                    style={{
                        color: isNextDisabled ? '#888' : '#fff',
                    }}
                >
                    {nextTest}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    previousButton: {
        backgroundColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        flex: 1,
        marginRight: 8,
        alignItems: 'center',
    },
    nextButton: {
        padding: 12,
        borderRadius: 8,
        flex: 1,
        marginLeft: 8,
        alignItems: 'center',
    },
});

export default CharacterCreationNavigation;
