import React, { createContext, useContext, useEffect, useState } from 'react';

import API from '../services/api'; // adapte selon ton chemin

import { navigate } from '../navigation/navigationRef'; // adapte selon ton arbo

type User = {
    id?: string;
    email?: string | undefined;
    firstname?: string | undefined;
    surname?: string | undefined;
    avatarUrl?: string | undefined;
};

type UserContextType = {
    dataUser: User | null;
    accessToken: string | undefined;
    isLoading: boolean;
    setDataUser: (user: User | null) => void;
    logoutUser: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const accessToken = localStorage.getItem('accessToken') ?? undefined;

    const [dataUser, setDataUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!accessToken) return;
        setIsLoading(true);

        API.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

        const getUser = async () => {
            try {
                const response = await API.get('/auth');
                setDataUser(response.data);
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
                accessToken,
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
