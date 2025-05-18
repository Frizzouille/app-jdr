import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from 'react-native';

type Props = {
    title: string;
    items: string[];
    selected: string | null;
    onSelect: (item: string) => void;
};

export default function SelectableGrid({
    title,
    items,
    selected,
    onSelect,
}: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <FlatList
                data={items}
                numColumns={4}
                keyExtractor={(item) => item}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => {
                    const isSelected = selected === item;
                    return (
                        <TouchableOpacity
                            style={[
                                styles.button,
                                isSelected && styles.selectedButton,
                            ]}
                            onPress={() => onSelect(item)}
                        >
                            <Text
                                style={[
                                    styles.buttonText,
                                    isSelected && styles.selectedText,
                                ]}
                            >
                                {item}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    list: {
        gap: 4,
    },
    button: {
        flex: 1,
        margin: 3,
        padding: 6,
        borderRadius: 8,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedButton: {
        backgroundColor: '#4a90e2',
    },
    buttonText: {
        fontSize: 12,
        textAlign: 'center',
    },
    selectedText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
