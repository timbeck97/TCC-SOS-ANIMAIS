import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { AuthContextInterface } from '../types/AuthContext';
import { fetchToken } from '../services/AuthRequest';
import { TokenAuth } from '../types/TokenAuth';



const KEYCLOAK_AUTH_URL = process.env.REACT_APP_KEYCLOAK_AUTH_URL ||'';
const KEYCLOAK_TOKEN_URL = process.env.REACT_APP_KEYCLOAK_TOKEN_URL||'';
const KEYCLOAK_LOGOUT_URL = process.env.REACT_APP_KEYCLOAK_LOGOUT_URL||'';
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID||'';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET||'';
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI||'';
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
                console.log('string do token: ',stringTk)
                let tk=JSON.parse(JSON.stringify(stringTk));
                if(tk){
                    setToken(JSON.parse(tk));
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