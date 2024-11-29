import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { RequestMetadata } from '../types/types.d';
import { log, errorLog } from './logsUtils';

const handleRequest = async <D>(
  request: Promise<AxiosResponse<D>>,
): Promise<D> => {
  const modRequest = request
    .then(
      res => res.data, // Successful response
    )
    .catch((error: AxiosError) => {
      if (error.response) {
        // Axios API Error Response
      } else if (error.message || error.config) {
        // Network Error Case
      }

      if (error.message === 'canceled') {
        // Handle cancellation gracefully
      } else if (error.response) {
        // Request was made and server responded with an error status
        // Handle different HTTP error statuses (4xx, 5xx) as needed
      } else if (error.request) {
        // Request was made but no response was received
        // Handle network-related errors
      } else {
        // Something else happened
        // Handle unexpected errors
      }
      throw error; // Rethrow the error for further handling
    });

  return modRequest;
};

const addRequestInterceptor = <T>(axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    request => {
      log('Starting request -> ', request);
      const newRequest: InternalAxiosRequestConfig<RequestMetadata> = {
        ...request,
        data: {
          startTime: new Date(),
          endTime: new Date(),
          responseTime: 0,
        },
      };
      return newRequest;
    },
    (error: AxiosError<T, RequestMetadata>) => {
      errorLog('Request returned with error -> ', error);
      throw error;
    },
  );
};

const addResponseInterceptor = <T>(axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    response => {
      log('Returning response -> ', response);
      const newResponse: AxiosResponse<T, RequestMetadata> = {
        ...response,
        config: {
          ...response.config,
          data: {
            ...(response.config.data as RequestMetadata),
            endTime: new Date(),
          },
        },
      };
      const metadata = newResponse.config.data as RequestMetadata;
      if (metadata) {
        metadata.responseTime =
          metadata.endTime.getTime() - metadata.startTime.getTime();
      }
      return newResponse;
    },
    (error: AxiosError<T, RequestMetadata>) => {
      const newError = { ...error };
      const metadata = newError.config!.data! as RequestMetadata;
      metadata.endTime = new Date();
      metadata.responseTime =
        metadata.endTime.getTime() - metadata.startTime.getTime();
      errorLog('Response returned with error -> ', newError);
      throw newError as AxiosError<T, RequestMetadata>;
    },
  );
};

export { handleRequest, addRequestInterceptor, addResponseInterceptor };
