import { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

const statsList = {
    strength: 'Force',
    dexterity: 'Dextérité',
    constitution: 'Constitution',
    intelligence: 'Intelligence',
    wisdom: 'Sagesse',
    charisma: 'Charisme',
};

type StatsStepProps = {
    stats: { [key: string]: number };
    bonus: { [key: string]: number };
    onUpdate: (updatedStats: { [key: string]: number }) => void;
};

export default function StatsStep({ stats, bonus, onUpdate }: StatsStepProps) {
    const maxCreditPoint = 27;
    const [creditPoint, setCreditPoint] = useState(maxCreditPoint);
    const [repartitionPoint, setRepartitionPoint] = useState<{
        [key: string]: number;
    }>({});

    // Initialiser les propriétés manquantes à 10
    useEffect(() => {
        let newRepartitionPoint = repartitionPoint;
        for (const stat of Object.keys(statsList)) {
            if (!(stat in stats)) {
                newRepartitionPoint[stat] = 10;
            } else newRepartitionPoint[stat] = stats[stat];
        }
        setRepartitionPoint(newRepartitionPoint);
    });

    useEffect(() => {
        let somme = 0;

        for (const key in repartitionPoint) {
            const value = repartitionPoint[key];
            if (value > 8 && value <= 13) {
                somme += value - 8;
            } else if (value > 13) {
                somme += 2 * (value - 13) + 5; // Compte deux points pour chaque valeur > 13 puis 5 pour 9 - 10 - 11 - 12 - 13
            }
        }

        setCreditPoint(maxCreditPoint - somme);
    }, [repartitionPoint]);

    const handleChange = (key: string, delta: number) => {
        if (!repartitionPoint) return; // Ne rien faire si repartitionPoint est undefined

        let val = null;
        val = Math.max(
            0,
            (!repartitionPoint ? 10 : repartitionPoint[key]) + delta,
        );

        const newRepartitionPoint = {
            ...repartitionPoint,
            [key]: val,
        };
        setRepartitionPoint(newRepartitionPoint);

        onUpdate({
            ...newRepartitionPoint,
            [key]: val,
        });
    };

    // Calcule la valeur finale et le modificateur
    const getFinalValue = (stat: string) => {
        const statValue = repartitionPoint[stat] || 10;
        const statBonus = stat in bonus ? bonus[stat as keyof typeof bonus] : 0;
        const bonusTest = statBonus
            ? (statBonus > 0 ? '+' : '-') + statBonus
            : '';
        const finalValue = statValue + statBonus;
        const modifier = Math.floor((finalValue - 10) / 2); // Calcul du modificateur
        return `${statValue}${bonusTest} (${modifier})`;
    };

    return (
        <>
            <View>
                <Text style={[styles.label, { fontWeight: 'bold' }]}>
                    Niveau: 1
                </Text>
            </View>
            <View style={[styles.row, { marginBottom: 4 }]}>
                <Text style={[styles.label, { fontWeight: 'bold' }]}>
                    Caractéristique
                </Text>
                <Text style={[styles.value, { fontWeight: 'bold' }]}>Base</Text>
                <Text style={[styles.final, { fontWeight: 'bold' }]}>
                    Valeur finale
                </Text>
            </View>
            {Object.entries(statsList).map((stat) => (
                <View
                    key={stat[0]}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 8,
                    }}
                >
                    <Text style={{ width: 100 }}>{stat[1]}</Text>

                    <TouchableOpacity
                        onPress={() => handleChange(stat[0], -1)}
                        style={styles.button}
                    >
                        <Text>-</Text>
                    </TouchableOpacity>

                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={String(
                            !repartitionPoint ? 10 : repartitionPoint[stat[0]],
                        )}
                        onChangeText={(text) => {
                            let val = parseInt(text);
                            setRepartitionPoint({
                                ...repartitionPoint,
                                [stat[0]]: val,
                            });
                            onUpdate({
                                ...repartitionPoint,
                                [stat[0]]: val || 0,
                            });
                        }}
                    />

                    <TouchableOpacity
                        onPress={() => handleChange(stat[0], 1)}
                        style={styles.button}
                    >
                        <Text>+</Text>
                    </TouchableOpacity>

                    <Text style={{ width: 100, textAlign: 'center' }}>
                        {getFinalValue(stat[0])}
                    </Text>
                </View>
            ))}
            <View>
                <Text style={[styles.label, { fontWeight: 'bold' }]}>
                    Nombre de points restants: {creditPoint} / {maxCreditPoint}
                </Text>
            </View>
        </>
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
