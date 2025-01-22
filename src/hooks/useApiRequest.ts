import { handleRequest } from '../utils/apiUtils';
import {
  AbortControllers,
  RequestConfig,
  RequestConfigWithBody,
  UseApiRequest,
} from './types';

const useApiRequest = (): UseApiRequest => {
  let abortControllers: AbortControllers = {};

  const createAbortController = (key: string) => {
    if (!abortControllers[key]) {
      abortControllers[key] = new AbortController();
    }

    return abortControllers[key];
  };

  const makeGetCall = <D>(params: RequestConfig) => {
    const { url, axiosInstance, config } = params;
    const abortController = createAbortController(`GET ${url}`);

    const { signal } = abortController;

    return handleRequest<D>(
      axiosInstance.get(url, {
        ...config,
        signal,
      }),
    );
  };

  const makePostCall = <T, D>(params: RequestConfigWithBody<T>) => {
    const { url, body, axiosInstance, config } = params;
    const abortController = createAbortController(`POST ${url}`);

    const { signal } = abortController;

    return handleRequest<D>(
      axiosInstance.post(url, body, {
        ...config,
        signal,
      }),
    );
  };

  const makePutCall = <T, D>(params: RequestConfigWithBody<T>) => {
    const { url, body, axiosInstance, config } = params;
    const abortController = createAbortController(`PUT ${url}`);

    const { signal } = abortController;

    return handleRequest<D>(
      axiosInstance.put(url, body, {
        ...config,
        signal,
      }),
    );
  };

  const makeDeleteCall = <D>(params: RequestConfig) => {
    const { url, axiosInstance, config } = params;
    const abortController = createAbortController(`DELETE ${url}`);

    const { signal } = abortController;

    return handleRequest<D>(
      axiosInstance.delete(url, {
        ...config,
        signal,
      }),
    );
  };

  const cancelRequest = (key: string) => {
    if (abortControllers[key]) {
      abortControllers[key].abort();
      delete abortControllers[key];
    }
  };

  const cancelAllRequests = () => {
    Object.keys(abortControllers).forEach(key => {
      abortControllers[key].abort();
    });
    abortControllers = {};
  };

  return {
    makeGetCall,
    makePostCall,
    makePutCall,
    makeDeleteCall,
    cancelRequest,
    cancelAllRequests,
  };
};

export default useApiRequest;
