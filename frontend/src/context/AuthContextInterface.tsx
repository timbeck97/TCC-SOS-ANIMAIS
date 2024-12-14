import React, { createContext, useCallback, useContext, useEffect } from 'react';
import { AuthContextInterface } from '../types/AuthContext';


const KEYCLOAK_AUTH_URL = process.env.KEYCLOAK_AUTH_URL ||'';
const KEYCLOAK_TOKEN_URL = process.env.KEYCLOAK_TOKEN_URL||'';
const KEYCLOAK_LOGOUT_URL = process.env.KEYCLOAK_LOGOUT_URL||'';
const CLIENT_ID = process.env.CLIENT_ID||'';
const CLIENT_SECRET = process.env.CLIENT_SECRET||'';
const REDIRECT_URI = process.env.REDIRECT_URI||'';
const AuthContext = createContext<AuthContextInterface | undefined>(undefined);
export const AuthProvider = ({ children }: any) => {

    const [token, setToken] = React.useState<string | null>(null);
    const [refreshToken, setRefreshToken] = React.useState<string | null>(null);
    const [tokenId, setTokenId] = React.useState<string | null>(null);

    useEffect(() => {
        console.log('montou auth context');
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        console.log('code', code);
        
        if (code) {
            fetchToken(code);
        } else {
            if (!token && !refreshToken) {

            }
            let tokenLocalStorage = localStorage.getItem('access_token');
            let refreshLocalStorage = localStorage.getItem('refresh_token');
            let tokenIdLocalStorage = localStorage.getItem('token_id');
            if (tokenLocalStorage) {
                setToken(tokenLocalStorage);
            }
            if (refreshLocalStorage) {
                setRefreshToken(refreshLocalStorage);
            }
            if (tokenIdLocalStorage) {
                setTokenId(tokenIdLocalStorage);
            }

        }

    }, [token, refreshToken]);


  
    const login = () => {
        const authUrl = `${KEYCLOAK_AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=openid`;
        window.location.href = authUrl;
    }
    const fetchToken = async (code: string) => {
        try {
            const response = await fetch(KEYCLOAK_TOKEN_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    grant_type: "authorization_code",
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    code,
                    redirect_uri: REDIRECT_URI,
                }),
                credentials: "omit", 
            });

            if (response.ok) {
                const data = await response.json();
                console.log('data', data);
                
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);
                localStorage.setItem("token_id", data.id_token);
                setToken(data.access_token);
                setRefreshToken(data.refresh_token);
                setTokenId(data.id_token);

                // Opcional: Decodificar e armazenar informações do usuário
                // const userInfo = parseJwt(data.access_token);
                // console.log("Usuário autenticado:", userInfo);


                // Remova o código da URL
                window.history.replaceState({}, document.title, "/");
            } else {
                console.error("Erro ao obter o token");
            }
        } catch (error) {
            console.error("Erro ao trocar o código pelo token:", error);
        }
    };
    // const parseJwt = (token: string) => {
    //     try {
    //         const base64Url = token.split(".")[1];
    //         const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    //         return JSON.parse(window.atob(base64));
    //     } catch (e) {
    //         console.error("Erro ao decodificar o token JWT:", e);
    //         return null;
    //     }
    // };
    const logout = () => {
        const logoutUrl = `${KEYCLOAK_LOGOUT_URL}?id_token_hint=${tokenId}&post_logout_redirect_uri=${encodeURIComponent('http://localhost:3000')}`;
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("token_id");
        window.location.href = logoutUrl;
    };
    // const isAutenticated = useCallback(() => {
        
    //     return !!token && !!refreshToken;
    // }, [token, refreshToken]);
    const isAutenticated = useCallback(() => {
        return true;
       
    }, []);


    return (
        <AuthContext.Provider value={{ login, isAutenticated, logout }}>
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