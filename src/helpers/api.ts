import axios, { AxiosError, AxiosResponse } from "axios";
import { IApiResponse } from "../models/shared/IApiResponse";
import { ILogin } from "../models/ILogin";
//Models

//URL AP
axios.defaults.baseURL = "https://mipotrahn-admin-backend.herokuapp.com/api";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};

//Auth Endpoints
const fetchAuth = {
  login: (model: ILogin): Promise<IApiResponse> =>
    requests.post(`/users/authemticate`, {
      Username: model.username,
      Password: model.password,
    }),
};

//Entrada Endpoints
const fetchEntrada = {
  validarOT: (numeroOt: string): Promise<IApiResponse> =>
    requests.post(`/receive/validateOT`, {
      NumOT: numeroOt,
    }),
  getCantidadSugerida: (
    numeroOt: string,
    barcode: string
  ): Promise<IApiResponse> =>
    requests.post(`/receive/getQuantitySentByProduct`, {
      NumOT: numeroOt,
      Barcode: barcode,
    }),
  agregarProducto: (
    numeroOt: string,
    barcode: string,
    cantidad: number
  ): Promise<IApiResponse> =>
    requests.post(`/receive/getQuantitySentByProduct`, {
      NumOT: numeroOt,
      Barcode: barcode,
      Quantity: cantidad,
    }),
};

export { fetchAuth, fetchEntrada };
