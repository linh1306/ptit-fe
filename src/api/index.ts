import Config from "@app/config/index.config";
import { createPath, createToast } from "@app/common";
import { FucApi, IFetcherData, IRes } from "@app/type/api.type";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const apiClient = axios.create({
  baseURL: Config.ENV.API_URL,
  timeout: Config.ENV.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(Config.LOCALSTORATE.TOKEN);
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(Config.LOCALSTORATE.TOKEN);
    }
    return Promise.reject(error);
  }
);
export async function fetcherFile<T>(
  config: AxiosRequestConfig
): Promise<IRes<T>> {
  return new Promise<IRes<T>>((resolve, reject) => {
    apiClient
      .request<IRes<T>, AxiosResponse<IRes<T>>>(config)
      .then((response) => {
        if (response.data.status) {
          resolve(response.data);
        } else {
          const errorMessage =
            response.data.error?.message || "Lỗi không xác định từ API";
          createToast("error", errorMessage);
          reject(null);
        }
      })
      .catch((error: Error | AxiosError) => {
        let errorMessage = "Lỗi kết nối API";

        if (
          error instanceof AxiosError &&
          error.response?.data?.error?.message
        ) {
          errorMessage = error.response.data.error.message;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        createToast("error", errorMessage);
        reject(null);
      });
  });
}
export function createFetcher<TBody, TResponse>(
  url: string,
  method: "get" | "post" | "put" | "patch" | "delete"
): FucApi<TBody, TResponse> {
  const apiFunction: FucApi<TBody, TResponse> = async (options) => {
    return await fetcher(url, method, options);
  };

  return apiFunction;
}
export default async function fetcher<T>(
  url: string,
  method: "get" | "post" | "put" | "delete" | "patch",
  options: IFetcherData<any>
): Promise<IRes<T>> {
  return new Promise<IRes<T>>((resolve, reject) => {
    const { total, ...pagination } = options.pagination ?? {
      total: 0,
    };
    const config: AxiosRequestConfig = {
      method,
      url: createPath(url, options.pathIds),
      data: options.body,
      params: { ...options.params, ...pagination },
    };

    apiClient
      .request<IRes<T>, AxiosResponse<IRes<T>>>(config)
      .then((response) => {
        if (response.data.status) {
          resolve(response.data);
        } else {
          const errorMessage =
            response.data.error?.message || "Lỗi không xác định từ API";
          createToast("error", errorMessage);
          reject(null);
        }
      })
      .catch((error: Error | AxiosError) => {
        let errorMessage = "Lỗi kết nối API";

        if (
          error instanceof AxiosError &&
          error.response?.data?.error?.message
        ) {
          errorMessage = error.response.data.error.message;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        createToast("error", errorMessage);
        reject(null);
      });
  });
}
