import axios from "axios";
import { TokenAuth } from "../types/TokenAuth";
import { openAlertSuccess } from "./Alert";
import { openModalInstance } from "./ModalTrigger";

let refreshPromise: Promise<any> | null = null;

const getUrl = ()=>{
    if (process.env.NODE_ENV === 'development') {
        return ''
    }else{
        return `${window.location.protocol}//${window.location.hostname}/service`
    }
}

const apiAuth =  axios.create({
    baseURL:  getUrl(), 
    headers: {
      'Content-Type': 'application/json',
    },
  });
const login = () => {
     if (process.env.NODE_ENV === 'development') {
      window.location.href='http://localhost:8081/api/public/auth/keycloak';
    }else{
        window.location.href=getUrl()+'/public/auth/keycloak'
    }
   
}
const updateRefreshToken = async (): Promise<TokenAuth | null> => {
    if (refreshPromise) return refreshPromise;
    refreshPromise = (async () => {
        try {
            let stringTk = localStorage.getItem('token');
            let token = JSON.parse(stringTk || '');
            const response = await apiAuth.get('/public/auth/keycloak/refresh?refreshToken='+token.refreshToken)
           
            const data = response.data;
            let newToken = {
                accessToken: data.access_token,
                expiresIn: data.expires_in,
                refreshToken: data.refresh_token,
                refreshExpiresIn: data.refresh_expires_in,
                tokenId: data.id_token,
                roles: data.roles
            };

            localStorage.setItem("token", JSON.stringify(newToken));
            localStorage.setItem("roles", JSON.stringify(data.roles));
            openAlertSuccess('Token atualizado com sucesso');
            return newToken;
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message.includes('invalid_grant')) {
                openModalInstance("Sessão expirada, é necessário realizar o login novamente", () => {
                    localStorage.removeItem("token");
                    login();
                });
            } else {
                throw error;
            }
            return null;
        } finally {
            refreshPromise = null;
        }
    })();
    
    return refreshPromise;
};

const fetchToken = async (code: string):Promise<TokenAuth|null> => {
    try {
        const response = await apiAuth.get('/public/auth/keycloak/token?code='+code)
        const data = response.data;
        let token:TokenAuth = {
            accessToken: data.access_token,
            expiresIn: data.expires_in,
            refreshToken: data.refresh_token,
            refreshExpiresIn: data.refresh_expires_in,
            tokenId: data.id_token,
            roles: data.roles
        }
        localStorage.setItem("roles", JSON.stringify(data.roles))
        localStorage.setItem("token", JSON.stringify(token))
        window.history.replaceState({}, document.title, "/");
        return token;
    } catch (error) {
        console.error("Erro ao trocar o código pelo token:", error);
        throw error;    
    } 
};

const logout = () => {
    let stringTk = localStorage.getItem('token')
    let token = JSON.parse(stringTk || '');
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    if (process.env.NODE_ENV === 'development') {
        window.location.href='http://localhost:8081/api/public/auth/keycloak/logout?tokenId='+token?.tokenId
    }else{
        window.location.href=getUrl()+'/public/auth/keycloak/logout?tokenId='+token?.tokenId
    }
};
const isAutenticado = () => {
    const stringTk = localStorage.getItem('token')
    return stringTk !== null && stringTk !== undefined;
}

export { isAutenticado, logout, login, fetchToken, updateRefreshToken }