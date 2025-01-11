import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { AuthContextInterface } from '../types/AuthContext';
import { openAlertSuccess } from '../services/Alert';
import { openModalInstance } from '../services/ModalTrigger';



const KEYCLOAK_AUTH_URL = process.env.REACT_APP_KEYCLOAK_AUTH_URL ||'';
const KEYCLOAK_TOKEN_URL = process.env.REACT_APP_KEYCLOAK_TOKEN_URL||'';
const KEYCLOAK_LOGOUT_URL = process.env.REACT_APP_KEYCLOAK_LOGOUT_URL||'';
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID||'';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET||'';
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI||'';
const AuthContext = createContext<AuthContextInterface | undefined>(undefined);
export const AuthProvider = ({ children }: any) => {


    const [token, setToken] = useState<{
        token: string
        refreshToken: string
        tokenId: string
    }|null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        
        if (code) {
            fetchToken(code);
        } else {
            let stringTk=localStorage.getItem('token')
            if(stringTk){
                let tk=JSON.parse(stringTk);
                if(tk){
                    let token:any = {
                        token: tk.token,
                        refreshToken: tk.refreshToken,
                        tokenId: tk.tokenId
                    }
                    localStorage.setItem("token", JSON.stringify(token))
                    setToken(token);
                }
            }
            
            
            setLoading(false);

        }

    }, []);

    
  
    const login = () => {
        const authUrl = `${KEYCLOAK_AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=openid`;
        window.location.href = authUrl;
    }
    const updateRefreshToken = async () => {
        try {
            const response = await fetch(KEYCLOAK_TOKEN_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    grant_type: "refresh_token",
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    refresh_token: token?.refreshToken || "",
                }),
                credentials: "omit",
            });
            console.log('RESPONSE REFRESH TOKEN: ',response);
            
            if (response.ok) {
                const data = await response.json();
                console.log('DATA REFRESHED TOKEN: ',data);
                
                const tokenInfo = parseJwt(data.access_token);
                const refreshTokenInfo = parseJwt(data.refresh_token);
                let token = {
                    token: data.access_token,
                    tokenExpiration: tokenInfo.exp,
                    refreshToken: data.refresh_token,
                    refreshTokenExpiration: refreshTokenInfo.exp,
                    tokenId: data.id_token
                }
                localStorage.setItem("token", JSON.stringify(token))
                openAlertSuccess('Token atualizado com sucesso');
                setToken(token);
            } else {
                console.error("Erro ao atualizar o token de acesso");
                let body = await response.json();
                console.error('body', body);
                if(body.error === 'invalid_grant'){
                    openModalInstance("Sessão expirada, é necessário realizar o login novamente", () => { 
                        localStorage.removeItem("token");
                        login();
                    });
                }
                
            }
        } catch (error) {
            console.error("Erro ao atualizar o token de acesso:", error);
        }
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
                console.log('DATA TOKEN: ',data);
                
                const tokenInfo = parseJwt(data.access_token);
                const refreshTokenInfo = parseJwt(data.refresh_token);
                let token = {
                    token: data.access_token,
                    tokenExpiration: tokenInfo.exp,
                    refreshToken: data.refresh_token,
                    refreshTokenExpiration: refreshTokenInfo.exp,
                    tokenId: data.id_token
                }
                localStorage.setItem("token", JSON.stringify(token))
                setToken(token);


                window.history.replaceState({}, document.title, "/");
            } else {
                console.error("Erro ao obter o token");
            }
        } catch (error) {
            console.error("Erro ao trocar o código pelo token:", error);
        } finally{
            setLoading(false);
        }
    };
    const parseJwt = (token: string) => {
        try {
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            return JSON.parse(window.atob(base64));
        } catch (e) {
            console.error("Erro ao decodificar o token JWT:", e);
            return null;
        }
    };
    const logout = () => {
        const logoutUrl = `${KEYCLOAK_LOGOUT_URL}?id_token_hint=${token?.tokenId}&post_logout_redirect_uri=${encodeURIComponent('http://localhost:3000')}`;
        localStorage.removeItem("token");
        window.location.href = logoutUrl;
    };
    const isAutenticated = useCallback(() => {
        
        return !!token
    }, [token]);
    // const isAutenticated = useCallback(() => {
    //     return true;
       
    // }, []);


    return (
        <AuthContext.Provider value={{ login, isAutenticated, logout, updateRefreshToken, loading }}>
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