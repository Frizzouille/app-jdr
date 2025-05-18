export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    AdventureMaster: { idAdventure: string };
    AdventurePlayer: { idAdventure: string };
    NewAdventure: { mode: string } | undefined;
};
