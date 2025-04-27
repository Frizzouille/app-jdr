export type RootStackParamList = {
    Login: {
        updateAccessToken: React.Dispatch<
            React.SetStateAction<string | undefined>
        >;
    };
    Accueil: {
        dataUser: Object;
        updateAccessToken: React.Dispatch<
            React.SetStateAction<string | undefined>
        >;
    };
};
