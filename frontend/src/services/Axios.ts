import axios, { AxiosRequestConfig } from "axios";
import { openModalInstance } from "./ModalTrigger";
import { openAlertSuccess } from "./Alert";

const URL = process.env.REACT_APP_API_URL


let logout: () => void;
let refreshToken: () => void;


export const setAuthFunctions = (logoutFunction: () => void, refreshTokenFunction: () => void) => {
  logout = logoutFunction;
  refreshToken = refreshTokenFunction;
}



const api = axios.create({
  baseURL: URL,
});
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
}, error => {
  return Promise.reject(error);
})

api.interceptors.response.use((response) => {
  return response;
}, error => {
  let { response } = error;



  if (error.code === 'ERR_NETWORK') {
    openModalInstance("Erro ao acessar o servidor: " + error.message, () => { });
    return Promise.resolve(null);
  } else if (response?.status === 401 && response?.data.message?.includes('Jwt expired')) {
    //   openModalInstance("Sessão expirada. Faça login novamente.", () => {
    //   //logout();
    //   openAlertSuccess('Renovando token a partir do refresh token.');
      
    // });
    refreshToken();
    return Promise.resolve({});
  } else if (response?.status === 403) {
    openModalInstance("Você não tem permissão para acessar esses dados", () => { });
    return Promise.resolve(null);
  } else {
    openModalInstance("Erro ao acessar o servidor: " + response?.data?.message, () => { });
  }
  console.log('erro nao tradado: ',error);
  
  return Promise.reject(error);

})

let controller: AbortController | null = null;


const createAbortController = (): AbortSignal => {
  controller = new AbortController();
  return controller.signal;
};

export const get = async <T>(url: string, params: Record<string, any> = {}): Promise<T | null> => {
  const signal = createAbortController();

  const config: AxiosRequestConfig = { params, signal };
  const response = await api.get<T>(url, config);
  return response?.data;

};


export const post = async <T>(url: string, data: any): Promise<T | null> => {
  const signal = createAbortController();

  const config: AxiosRequestConfig = { signal };
  const response = await api.post<T>(url, data, config);
  return response?.data;

};


export const put = async <T>(url: string, data: any): Promise<T | null> => {
  const signal = createAbortController();

  const config: AxiosRequestConfig = { signal };
  const response = await api.put<T>(url, data, config);
  return response?.data;

};


export default api;