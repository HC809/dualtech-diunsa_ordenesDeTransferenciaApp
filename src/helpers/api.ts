import axios, { AxiosResponse } from "axios";
import { IApiResponse } from "../models/shared/IApiResponse";
import { ILogin } from "../models/ILogin";
//Models

//URL AP
axios.defaults.baseURL = "https://mipotrahn-admin-backend.herokuapp.com/api";

axios.interceptors.response.use(undefined, (error) => {
  error?.message !== undefined
    ? alert(
        `Posible error de conexión al API.  ${JSON.stringify(error?.message)}`
      )
    : alert(
        "Posible error de conexión al API. Verifique su conexión a intenet o comuníquese con un administrador para verificar la conexión del API."
      );
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};

//Auth Endpoints
const fetchAuth = {
  login: ({ username, password }: ILogin): Promise<IApiResponse> =>
    requests.post(`/admiuser/auth`, { email: username, password }),
};

export { fetchAuth };
