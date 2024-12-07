import React, { createContext, useCallback, useContext, useEffect } from 'react';
import { AuthContextInterface } from '../types/AuthContext';
import axios from 'axios';

const AuthContext = createContext<AuthContextInterface | undefined>(undefined);
export const AuthProvider = ({ children }:any) => {
    
    const [token, setToken] = React.useState<string | null>(null);

    useEffect(() => {
        console.log('montou auth context');
        
        let tokenLocalStorage=localStorage.getItem('token');
        let parseToken= tokenLocalStorage ? JSON.parse(tokenLocalStorage) : null;
        if(parseToken && !token){
            setToken(parseToken.accessToken);

        }

    }, [token]);

    
    const login = async (username: string, password: string) => {
        let axiosRequest=axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            headers: {
                "Content-Type": "application/json",
            },
        })

        const response = await axiosRequest.post<{accessToken:string}>('/login', {username, password});
        setToken(response.data.accessToken);
        
    }
    const isAutenticated = useCallback(() => {
        return true;
    },[]);


    return (
        <AuthContext.Provider value={{login, isAutenticated}}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para consumir o contexto de autenticação
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
  };