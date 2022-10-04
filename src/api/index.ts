import {
  DefaultApi,
  MoviesApi,
  UsersApi,
  TokensApi,
  LikesApi,
} from '@/types/generatedClient/api'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { BASE_URL } from '@/constants'
const axiosInstance = axios.create({
  withCredentials: true,
})

export const api = (axios: AxiosInstance) => {
  return {
    get: <T>(url: string, config: AxiosRequestConfig = {}) =>
      axios.get<T>(url, config),
    delete: <T>(url: string, config: AxiosRequestConfig = {}) =>
      axios.delete<T>(url, config),
    post: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      axios.post<T>(url, body, config),
    patch: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      axios.patch<T>(url, body, config),
    put: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      axios.put<T>(url, body, config),
  }
}
const apis = {
  defaultApi: new DefaultApi(undefined, BASE_URL, axiosInstance),
  moviesApi: new MoviesApi(undefined, BASE_URL, axiosInstance),
  usersApi: new UsersApi(undefined, BASE_URL, axiosInstance),
  tokensApi: new TokensApi(undefined, BASE_URL, axiosInstance),
  likesApi: new LikesApi(undefined, BASE_URL, axiosInstance),
}

export default apis
