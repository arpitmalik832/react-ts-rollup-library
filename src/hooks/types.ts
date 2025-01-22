import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { VoidFunctionWithParams } from '../types/types';

export type AbortControllers = Record<string, AbortController>;

export interface RequestConfig {
  url: string;
  axiosInstance: AxiosInstance;
  config?: AxiosRequestConfig;
}

export interface RequestConfigWithBody<T> {
  url: string;
  axiosInstance: AxiosInstance;
  config?: AxiosRequestConfig;
  body?: T;
}

export interface UseApiRequest {
  makeGetCall: <D>(params: RequestConfig) => Promise<D>;
  makePostCall: <T, D>(params: RequestConfigWithBody<T>) => Promise<D>;
  makePutCall: <T, D>(params: RequestConfigWithBody<T>) => Promise<D>;
  makeDeleteCall: <D>(params: RequestConfig) => Promise<D>;
  cancelRequest: (key: string) => void;
  cancelAllRequests: () => void;
}

export interface UseBackPress {
  stack: VoidFunctionWithParams[];
  push: (callback: VoidFunctionWithParams) => void;
  pop: () => void;
  clear: () => void;
}
