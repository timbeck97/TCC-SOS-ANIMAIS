import { TokenAuth } from "../types/TokenAuth";
import { openAlertSuccess } from "./Alert";
import { openModalInstance } from "./ModalTrigger";


const KEYCLOAK_AUTH_URL = process.env.REACT_APP_KEYCLOAK_AUTH_URL || '';
const KEYCLOAK_TOKEN_URL = process.env.REACT_APP_KEYCLOAK_TOKEN_URL || '';
const KEYCLOAK_LOGOUT_URL = process.env.REACT_APP_KEYCLOAK_LOGOUT_URL || '';
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID || '';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET || '';
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI || '';

let refreshPromise: Promise<any> | null = null;

const login = () => {
    const authUrl = `${KEYCLOAK_AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=openid`;
    window.location.href = authUrl;
}
const updateRefreshToken = async ():Promise<TokenAuth> => {
    console.log('refreshh promisse: ', refreshPromise);

    if (refreshPromise) return refreshPromise;

    refreshPromise = (async () => {
        try {
            let stringTk = localStorage.getItem('token')
            let token = JSON.parse(stringTk || '');
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

            });


            if (response.ok) {
                const data = await response.json();

                console.log('data refresj: ', data)

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
                console.log('refresh token: new token exp: ', tokenInfo.exp)
                openAlertSuccess('Token atualizado com sucesso');

                return token
            } else {
                console.error("Erro ao atualizar o token de acesso");
                let body = await response.json();
                console.error('body', body);
                if (body.error === 'invalid_grant') {
                    openModalInstance("Sessão expirada, é necessário realizar o login novamente", () => {
                        localStorage.removeItem("token");
                        login();
                    });
                }
                return null;


            }
        } catch (error) {
            console.error("Erro ao atualizar o token:", error);
            throw error; 
        } finally {
            refreshPromise = null;
        }
    })();
    return refreshPromise;
}
const fetchToken = async (code: string):Promise<TokenAuth|null> => {
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
            

            const tokenInfo = parseJwt(data.access_token);
            console.log('DATA TOKEN: ', JSON.stringify(tokenInfo));
            const refreshTokenInfo = parseJwt(data.refresh_token);
            let token:TokenAuth = {
                token: data.access_token,
                tokenExpiration: tokenInfo.exp,
                refreshToken: data.refresh_token,
                refreshTokenExpiration: refreshTokenInfo.exp,
                tokenId: data.id_token
            }
            console.log('fetch token: token ex: ',JSON.stringify(token))
            localStorage.setItem("token", JSON.stringify(token))

            window.history.replaceState({}, document.title, "/");
            return token;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Erro ao trocar o código pelo token:", error);
        throw error;    
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
    let stringTk = localStorage.getItem('token')
    let token = JSON.parse(stringTk || '');
    const logoutUrl = `${KEYCLOAK_LOGOUT_URL}?id_token_hint=${token?.tokenId}&post_logout_redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    localStorage.removeItem("token");
    window.location.href = logoutUrl;
};
const isAutenticado = () => {
    const stringTk = localStorage.getItem('token')
    return stringTk !== null && stringTk !== undefined;
}

export { isAutenticado, logout, login, fetchToken, updateRefreshToken }