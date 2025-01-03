import axios, { AxiosRequestConfig } from "axios";
import { openModalInstance } from "./ModalTrigger";

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

  console.log('deu erro: ',error);
  

  if (error.code === 'ERR_NETWORK') {
    openModalInstance("Erro ao acessar o servidor: " + error.message, () => { });
  } else if (response?.status === 401 && response?.data.message?.includes('Jwt expired')) {
    //   openModalInstance("Sessão expirada. Faça login novamente.", () => {
    //   //logout();
    //   openAlertSuccess('Renovando token a partir do refresh token.');
      
    // });
    refreshToken();
  } else if (response?.status === 403) {
    openModalInstance("Você não tem permissão para acessar esses dados", () => { });
  } else {
    openModalInstance("Erro ao acessar o servidor: " + response?.data?.message, () => { });
  }

  
  

})

let controller: AbortController | null = null;


const createAbortController = (): AbortSignal => {
  controller = new AbortController();
  return controller.signal;
};

export const get = async <T>(url: string, params: Record<string, any> = {},headers:any={}, callback:(data:T)=>void)=> {
  const signal = createAbortController();
  const config: AxiosRequestConfig = { params, signal,headers };
  const response = await api.get<T>(url, config);
  callback(response?.data);
};


export const post = async <T>(url: string, data: any, headers:any, callback:(data:T)=>void) => {
  const signal = createAbortController();

  const config: AxiosRequestConfig = { signal };
  if(headers){
    config.headers = headers;
  }
  const response = await api.post<T>(url, data, config);
  callback(response?.data);

};
export const publicPost = async <T>(url: string, data: any, headers:any, callback:(data:T)=>void) => {
  const signal = createAbortController();

  const config: AxiosRequestConfig = { signal };
  if(headers){
    config.headers = headers;
  }
  let api=axios.create({ baseURL: URL});
  const response = await api.post<T>(url, data, config);
  callback(response?.data);

};


export const put = async <T>(url: string, data: any): Promise<T | null> => {
  const signal = createAbortController();

  const config: AxiosRequestConfig = { signal };
  const response = await api.put<T>(url, data, config);
  return response?.data;

};


export default api;