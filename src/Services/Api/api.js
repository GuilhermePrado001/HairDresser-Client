import axios from "axios";
import { backEndUrl, identityUrl } from "../../Helpers/globalConfig";
//import AuthService from "../helpers/authService";
const api = axios.create({
  baseURL: backEndUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "*",
  },
});

const api_identity = axios.create({
  baseURL: identityUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "*",
  },
});
// api.interceptors.request.use(async config => {
//     const authService = new AuthService();
//     const jwtAuth = await authService.getUser();
//     if (jwtAuth.id_token)
//         config.headers.token = `${jwtAuth.token_type} ${jwtAuth.id_token}`;
//     return config;
// });

const acess = { api, api_identity };
export default acess;
