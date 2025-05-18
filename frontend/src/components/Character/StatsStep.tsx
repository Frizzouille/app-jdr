import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

const statsList = [
    'Strength',
    'Dexterity',
    'Constitution',
    'Intelligence',
    'Wisdom',
    'Charisma',
];

const bonus = {
    Strength: 1,
    Dexterity: 0,
    Constitution: 2,
    Intelligence: 0,
    Wisdom: 0,
    Charisma: -1,
};

type StatsStepProps = {
    stats: { [key: string]: number };
    onUpdate: (updatedStats: { [key: string]: number }) => void;
};

export default function StatsStep({ stats, onUpdate }: StatsStepProps) {
    // Initialiser les propriétés manquantes à 10
    for (const stat of statsList) {
        if (!(stat in stats)) {
            stats[stat] = 10;
        }
    }

    const handleChange = (key: string, delta: number) => {
        if (!stats) return; // Ne rien faire si stats est undefined

        onUpdate({
            ...stats,
            [key]: Math.max(0, (!stats ? 10 : stats[key]) + delta),
        });
    };

    // Calcule la valeur finale et le modificateur
    const getFinalValue = (stat: string) => {
        const statValue = stats[stat] || 10;
        const statBonus = stat in bonus ? bonus[stat as keyof typeof bonus] : 0;
        const finalValue = statValue + statBonus;
        const modifier = Math.floor((finalValue - 10) / 2); // Calcul du modificateur
        return `${finalValue} (${modifier})`;
    };

    return (
        <View>
            <View style={[styles.row, { marginBottom: 4 }]}>
                <Text style={[styles.label, { fontWeight: 'bold' }]}>
                    Caractéristique
                </Text>
                <View style={styles.button} />{' '}
                {/* Placeholder pour alignement bouton - */}
                <Text style={[styles.value, { fontWeight: 'bold' }]}>Base</Text>
                <View style={styles.button} />{' '}
                {/* Placeholder pour alignement bouton + */}
                <Text style={[styles.final, { fontWeight: 'bold' }]}>
                    Valeur finale
                </Text>
            </View>
            {statsList.map((stat) => (
                <View
                    key={stat}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 8,
                    }}
                >
                    <Text style={{ width: 100 }}>{stat}</Text>

                    <TouchableOpacity
                        onPress={() => handleChange(stat, -1)}
                        style={styles.button}
                    >
                        <Text>-</Text>
                    </TouchableOpacity>

                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={String(!stats ? 10 : stats[stat])}
                        onChangeText={(text) =>
                            onUpdate({ ...stats, [stat]: parseInt(text) || 0 })
                        }
                    />

                    <TouchableOpacity
                        onPress={() => handleChange(stat, 1)}
                        style={styles.button}
                    >
                        <Text>+</Text>
                    </TouchableOpacity>

                    {/* Colonne Valeur finale */}
                    <Text style={{ width: 100, textAlign: 'center' }}>
                        {getFinalValue(stat)}
                    </Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        width: 50,
        height: 40,
        textAlign: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        marginHorizontal: 8,
        borderRadius: 6,
    },
    button: {
        width: 30,
        height: 30,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    label: {
        flex: 2,
        fontSize: 16,
    },

    value: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
    },

    bonus: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
    },

    final: {
        flex: 2,
        textAlign: 'center',
        fontSize: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
});
