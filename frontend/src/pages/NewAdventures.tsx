// NewGame.tsx

import { useState } from 'react';
import { Button } from 'react-native';
import { View } from 'react-native-reanimated/lib/typescript/Animated';
import CreateAdventureForm from '../components/CreateAdventureForm';

const NewAdventures = () => {
    const [mode, setMode] = useState<'create' | 'join' | null>(null);

    return (
        <View>
            {!mode && (
                <>
                    <Button
                        title="Créer une aventure (MJ)"
                        onPress={() => setMode('create')}
                    />
                    <Button
                        title="Rejoindre une aventure (PJ)"
                        onPress={() => setMode('join')}
                    />
                </>
            )}

            {mode === 'create' && <CreateAdventureForm />}
            {/* {mode === 'join' && <JoinAdventureForm />} */}
        </View>
    );
};

export default NewAdventures;
