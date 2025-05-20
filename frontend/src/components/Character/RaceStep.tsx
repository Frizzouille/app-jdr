import SelectableGrid from './SelectableGrid';
import { CharacterFormData } from './CreateCharacterForm';

const races = {
    highElf: 'Haut-Elfe',
    woodElf: 'Elfe des bois',
    darkElf: 'Elfe noir',
    lightfootHalfling: 'Halfelin piel-léger',
    stoutHalfling: 'Halfelin robuste',
    human: 'Humain',
    hillDwarf: 'Nain des collines',
    mountainDwarf: 'Nain des montagnes',
    halfElf: 'Demi-elfe',
    halfOrc: 'Demi-orc',
    dragonborn: 'Drakéide',
    forestGnome: 'Gnome des forêts',
    rockGnome: 'Gnome des roches',
    tiefling: 'Tieffelin',
};

const classes = {
    barbarian: 'Barbare',
    bard: 'Barde',
    cleric: 'Clerc',
    druid: 'Druide',
    fighter: 'Guerrier',
    monk: 'Moine',
    paladin: 'Paladin',
    ranger: 'Rôdeur',
    rogue: 'Roublard',
    wizard: 'Magicien',
    sorcerer: 'Ensorceleur',
    warlock: 'Occultiste',
};

const backgrounds = {
    acolyte: 'Acolyte',
    guildArtisan: 'Artisan de guilde',
    entertainer: 'Artiste',
    charlatan: 'Charlatan',
    knight: 'Chevalier',
    criminal: 'Criminel',
    urchin: 'Enfant des rues',
    hermit: 'Ermite',
    folkHero: 'Héros du peuple',
    sailor: 'Marin',
    noble: 'Noble',
    pirate: 'Pirate',
    sage: 'Sage',
    outlander: 'Sauvageon',
    soldier: 'Soldat',
};

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
                onSelect={(key) => updateCharacter({ race: key })}
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
                items={backgrounds}
                selected={dataCharacter.background || null}
                onSelect={(key) => updateCharacter({ background: key })}
            />
        </>
    );
}
