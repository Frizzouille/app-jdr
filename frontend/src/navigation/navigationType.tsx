export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    Adventure: { idAdventure: string };
    NewAdventure: { mode: string } | undefined;
};
