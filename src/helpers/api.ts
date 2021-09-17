import axios, { AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
//Models
import { IApiResponse } from "../models/shared/IApiResponse";
import { ILogin } from "../models/ILogin";
import { IProducto } from "../models/IProducto";
import { IStoreModel } from "../models/IStoreModel";

//URL AP
//axios.defaults.baseURL = "http://172.40.20.181:6011/api";
axios.defaults.baseURL = "https://koalatestapi.azurewebsites.net/api";

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
    getStores: (): Promise<IStoreModel[]> =>
    requests.get("/store/getstorebyuser"),
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

//Salida Endpoints
const fetchSalida = {
  validarBarCode: (barcode: string, storeId: number): Promise<IApiResponse> =>
    requests.get(`/Product/GetBarcodeInformationStoreLocation/${barcode}/${storeId}`),
  agregarListaProducto: (
    productos: IProducto[],
    storeId: number
  ): Promise<IApiResponse> =>
    requests.post(`/zapax/ReturnToWarehouseFromStore/${storeId}`, productos),
};

export { fetchAuth, fetchEntrada, fetchSalida };
