export type RootStackParamList = {
    Login: {
        updateAccessToken: React.Dispatch<
            React.SetStateAction<string | undefined>
        >;
    };
    Register: {
        updateAccessToken: React.Dispatch<
            React.SetStateAction<string | undefined>
        >;
    };
    Accueil: {
        dataUser: {
            id: string | undefined;
            email: string | undefined;
        };
        updateAccessToken: React.Dispatch<
            React.SetStateAction<string | undefined>
        >;
    };
};
