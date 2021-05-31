import axios, { AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
//Models
import { IApiResponse } from "../models/shared/IApiResponse";
import { ILogin } from "../models/ILogin";
import { IProducto } from "../models/IProducto";

//URL AP
axios.defaults.baseURL = "http://172.40.20.181:7011/api";
//axios.defaults.baseURL = "https://koalatestapi.azurewebsites.net/api";

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};

//Auth Endpoints
const fetchAuth = {
  login: (model: ILogin): Promise<IApiResponse> =>
    requests.post(`/users/authenticate`, {
      Username: model.username,
      Password: model.password,
    }),
};

//Entrada Endpoints
const fetchEntrada = {
  validarOT: (NumOT: string): Promise<IApiResponse> =>
    requests.get(`/receive/validateOT/${NumOT}`),
  getCantidadSugerida: (
    numeroOt: string,
    barcode: string
  ): Promise<IApiResponse> =>
    requests.post(`/receive/getBarcodeInformation`, {
      NumOT: numeroOt,
      Barcode: barcode,
    }),
  agregarListaProducto: (
    productos: IProducto[],
    numeroOt: string
  ): Promise<IApiResponse> =>
    requests.post(`/receive/postReceiveOrder/${numeroOt}`, productos),
};

export { fetchAuth, fetchEntrada };
