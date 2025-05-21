import React, { createContext, useContext, useEffect, useState } from 'react';

import API from '../services/api'; // adapte selon ton chemin

import { navigate } from '../navigation/navigationRef'; // adapte selon ton arbo

type User = {
    id?: string;
    email?: string | undefined;
    firstname?: string | undefined;
    surname?: string | undefined;
    avatarUrl?: string | undefined;
    accessToken?: string | undefined;
};

type UserContextType = {
    dataUser: User | null;
    isLoading: boolean;
    setDataUser: (user: User | null) => void;
    logoutUser: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [dataUser, setDataUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const accessToken =
        localStorage.getItem('accessToken') ?? dataUser?.accessToken;

    if (accessToken)
        API.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

    useEffect(() => {
        if (!accessToken) return;
        setIsLoading(true);

        const getUser = async () => {
            try {
                const response = await API.get('/auth');
                setDataUser({ ...response.data, accessToken: accessToken });
            } catch (error) {
                localStorage.removeItem('accessToken');
                setDataUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        getUser();
    }, [accessToken]);

    const logoutUser = () => {
        localStorage.removeItem('accessToken');
        setDataUser(null);
        navigate('Login'); // ← Redirection automatique
    };
    return (
        <UserContext.Provider
            value={{
                dataUser,
                setDataUser,
                isLoading,
                logoutUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
