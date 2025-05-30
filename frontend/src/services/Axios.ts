import axios, { AxiosRequestConfig } from "axios";
import { openModalInstance } from "./ModalTrigger";
import { updateRefreshToken } from "./AuthRequest";
import { TokenAuth } from "../types/TokenAuth";

const URL = process.env.REACT_APP_API_URL




export const api = axios.create({
  baseURL: URL,
});
api.interceptors.request.use(async (config) => {
  let tokenJson;

  const tokenObj = localStorage.getItem('token');
  if (tokenObj) {
    tokenJson = JSON.parse(tokenObj) as TokenAuth;
  }
  if (tokenJson && verifyTokenExpiration(tokenJson)) {
    console.log('expirou na verificacao de tempo')
    let newToken = await updateRefreshToken();
    console.log('refresh token awaited: ', newToken);

    if (newToken != null) {
      tokenJson = newToken;
    }
  }
  if (tokenJson) {
    config.headers.Authorization = `Bearer ${tokenJson.accessToken}`
  }
  return config;
}, error => {
  return Promise.reject(error);
})

api.interceptors.response.use((response) => {
  return response;
}, error => {
  let { response } = error;

  console.log('deu erro: ', error);


  if (error.code === 'ERR_NETWORK') {
    console.log('e',error)
    openModalInstance("Erro ao acessar o servidor: " + error.message, () => { });
  } else if (response?.status === 401 && response?.data.message?.includes('Jwt expired')) {

    updateRefreshToken();
  } else if (response?.status === 403) {
    openModalInstance("Você não tem permissão para acessar esses dados", () => { });
  } else {
    console.log(response?.data)
    openModalInstance("Erro ao acessar o servidor: \n\n\n" + response?.data?.message, () => { });
  }




})
const verifyTokenExpiration = (token: TokenAuth) => {

  let tokenExpiration = token.expiresIn;
  let now = Date.now() / 1000

  return tokenExpiration < now;
}
let controller: AbortController | null = null;


const createAbortController = (): AbortSignal => {
  controller = new AbortController();
  return controller.signal;
};

export const get = async <T>(url: string, params: Record<string, any> = {}, headers: any = {}) => {
  const signal = createAbortController();
  const config: AxiosRequestConfig = { params, signal, headers };
  const response = await api.get<T>(url, config);
  return response
};


export const post = async <T>(url: string, data: any, headers: any, callback: (data: T) => void) => {
  const signal = createAbortController();

  const config: AxiosRequestConfig = { signal };
  if (headers) {
    config.headers = headers;
  }
  const response = await api.post<T>(url, data, config);
  callback(response?.data);

};
export const publicPost = async <T>(url: string, data: any, headers: any, callback: (data: T) => void) => {
  const signal = createAbortController();

  const config: AxiosRequestConfig = { signal };
  if (headers) {
    config.headers = headers;
  }
  let api = axios.create({ baseURL: URL });
  try {
    const response = await api.post<T>(url, data, config);
    callback(response?.data);
  } catch (error: any) {
    console.log(error)
    if (error.code === "ERR_NETWORK" || error.code==='ERR_BAD_RESPONSE') {
      openModalInstance("Erro na comunicação com o servidor", () => { });
    }

  }

};


export const put = async <T>(url: string, data: any, headers: any, params: any): Promise<T | null> => {
  const signal = createAbortController();
  const config: AxiosRequestConfig = { signal };
  if (headers) {
    config.headers = headers;
  }
  if (params) {
    config.params = params
  }

  const response = await api.put<T>(url, data, config);
  return response?.data;

};
export const deleteRequest = async <T>(url: string, callback: (data: T | undefined) => void) => {
  const signal = createAbortController();
  const config: AxiosRequestConfig = { signal };
  const response = await api.delete<T>(url, config);
  callback(response?.data);
}
export async function request<T>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T | null> {
  try {
    console.log(data)
    const response = await api.request<T>({
      method,
      url,
      data,
      ...config,
    });

    return response?.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.warn("Requisição cancelada:", error.message);
    } else {
      console.error("Erro na requisição:", error);
    }

    return null; // Pode retornar null ou lançar um erro, dependendo do seu caso
  }
}
export async function publicRequest<T>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T | null> {
  try {
    let api = axios.create({ baseURL: URL });
    const response = await api.request<T>({
      method,
      url,
      data,
      ...config,
    });

    return response?.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.warn("Requisição cancelada:", error.message);
    } else {
      console.error("Erro na requisição:", error);
    }

    return null; 
  }
}

