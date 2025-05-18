import SelectableGrid from './SelectableGrid';
import { CharacterFormData } from './CreateCharacterForm';
const races = [
    'Haut-Elfe',
    'Elfe des bois',
    'Elfe noir',
    'Halfelin piel-léger',
    'Halfelin robuste',
    'Humain',
    'Nain des collines',
    'Nain des montagnes',
    'Demi-elfe',
    'Demi-orc',
    'Drakéide',
    'Gnome des forêts',
    'Gnome des roches',
    'Tieffelin',
];

const classes = [
    'Barbare',
    'Barde',
    'Clerc',
    'Druide',
    'Guerrier',
    'Moine',
    'Paladin',
    'Rôdeur',
    'Roublard',
    'Magicien',
    'Ensorceleur',
    'Occultiste',
];

const background = [
    'Acolyte',
    'Artisan de guilde',
    'Artiste',
    'Charlatan',
    'Chevalier',
    'Criminel',
    'Enfant des rues',
    'Ermite',
    'Héros du peuple',
    'Marin',
    'Noble',
    'Pirate',
    'Sage',
    'Sauvageon',
    'Soldat',
];

type RaceStepProps = {
    dataCharacter: Partial<CharacterFormData>;
    updateCharacter: (data: Partial<CharacterFormData>) => void;
};

export default function RaceStep({
    dataCharacter,
    updateCharacter,
}: RaceStepProps) {
    return (
        <>
            <SelectableGrid
                title="Race"
                items={races}
                selected={dataCharacter.race || null}
                onSelect={(race) => updateCharacter({ race })}
            />
            <SelectableGrid
                title="Classe"
                items={classes}
                selected={dataCharacter.classes?.[0]?.class || ''}
                onSelect={(cls) =>
                    updateCharacter({ classes: [{ class: cls, level: 1 }] })
                }
            />
            <SelectableGrid
                title="Historique"
                items={background}
                selected={dataCharacter.background || null}
                onSelect={(background) => updateCharacter({ background })}
            />
        </>
    );
}
