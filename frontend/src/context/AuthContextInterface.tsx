import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { AuthContextInterface } from '../types/AuthContext';
import { fetchToken } from '../services/AuthRequest';
import { TokenAuth } from '../types/TokenAuth';


const AuthContext = createContext<AuthContextInterface | undefined>(undefined);
export const AuthProvider = ({ children }: any) => {


    const [token, setToken] = useState<TokenAuth|null>(null);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        
        if (code) {
            fetchTokenAuth(code);
        } else {
            let stringTk=localStorage.getItem('token')
            if(stringTk){
                let tk=JSON.parse(JSON.stringify(stringTk)) as TokenAuth;
                if(tk){
                    setToken(tk);
                }
            }
            setLoading(false);
        }

    }, []);

    const fetchTokenAuth = async (code:string)=>{
        const token:TokenAuth|null = await fetchToken(code);
        setToken(token);
        setLoading(false)
    }
  
 
    const isAutenticated = useCallback(() => {
        return !!token
    }, [token]);


    return (
        <AuthContext.Provider value={{isAutenticated, loading}}>
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