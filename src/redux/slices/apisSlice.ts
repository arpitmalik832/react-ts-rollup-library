import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
  SliceSelectors,
} from '@reduxjs/toolkit';

import {
  AddToApiHeadersByHost,
  AddToApiHeadersByIndex,
  APIData,
  ApisRedux,
  updateApiAxiosInstanceByHost,
  updateApiAxiosInstanceByIndex,
  UpdateApiHeadersByHost,
  UpdateApiHeadersByIndex,
  UpdateApiHostByIndex,
  UpdateApiHostByValue,
} from './types';
import { SLICE_NAMES } from '../../enums/redux';

const apisSlice = createSlice<
  ApisRedux,
  SliceCaseReducers<ApisRedux>,
  string,
  SliceSelectors<ApisRedux>,
  string
>({
  name: SLICE_NAMES.APIS,
  initialState: {
    apiHosts: [],
    apiHeaders: [{}],
    apiAxiosInstances: [],
  },
  reducers: {
    addNewApiData: (state, action: PayloadAction<APIData>) => ({
      apiHosts: [...state.apiHosts, action.payload.host],
      apiHeaders: [...state.apiHeaders, action.payload.headers],
      apiAxiosInstances: [
        ...state.apiAxiosInstances,
        action.payload.axiosInstance,
      ],
    }),
    updateApiHostByValue: (
      state,
      action: PayloadAction<UpdateApiHostByValue>,
    ) => {
      const newState = state;
      const oldApi = action.payload.oldValue;

      const index = newState.apiHosts.indexOf(oldApi);
      if (index !== -1) {
        newState.apiHosts[index] = action.payload.newValue;
      }
      return newState;
    },
    updateApiHostByIndex: (
      state,
      action: PayloadAction<UpdateApiHostByIndex>,
    ) => {
      const newState = state;
      const { index } = action.payload;

      if (index <= newState.apiHosts.length) {
        newState.apiHosts[index] = action.payload.newValue;
      }
      return newState;
    },
    updateApiHeadersByHost: (
      state,
      action: PayloadAction<UpdateApiHeadersByHost>,
    ) => {
      const newState = state;
      const { host } = action.payload;

      const index = newState.apiHosts.indexOf(host);
      if (index !== -1) {
        newState.apiHeaders[index] = action.payload.newHeaders;
      }
      return newState;
    },
    updateApiHeadersByIndex: (
      state,
      action: PayloadAction<UpdateApiHeadersByIndex>,
    ) => {
      const newState = state;
      const { index } = action.payload;

      if (index <= newState.apiHeaders.length) {
        newState.apiHeaders[index] = action.payload.newHeaders;
      }
      return newState;
    },
    addToApi1HeadersByHost: (
      state,
      action: PayloadAction<AddToApiHeadersByHost>,
    ) => {
      const { host } = action.payload;

      const index = state.apiHosts.indexOf(host);
      if (index !== -1) {
        Object.assign(state.apiHeaders[index], {
          [action.payload.newHeader.key]: action.payload.newHeader.value,
        });
      }
      return state;
    },
    addToApi1HeadersByIndex: (
      state,
      action: PayloadAction<AddToApiHeadersByIndex>,
    ) => {
      const { index } = action.payload;

      if (index <= state.apiHeaders.length) {
        Object.assign(state.apiHeaders[index], {
          [action.payload.newHeader.key]: action.payload.newHeader.value,
        });
      }
      return state;
    },
    updateApiAxiosInstanceByHost: (
      state,
      action: PayloadAction<updateApiAxiosInstanceByHost>,
    ) => {
      const newState = state;
      const { host } = action.payload;

      const index = newState.apiHosts.indexOf(host);
      if (index !== -1) {
        newState.apiAxiosInstances[index] = action.payload.axiosInstance;
      }
      return newState;
    },
    updateApiAxiosInstanceByIndex: (
      state,
      action: PayloadAction<updateApiAxiosInstanceByIndex>,
    ) => {
      const newState = state;
      const { index } = action.payload;

      if (index <= newState.apiHosts.length) {
        newState.apiAxiosInstances[index] = action.payload.axiosInstance;
      }
      return newState;
    },
  },
});

export { apisSlice };
export const {
  updateApi1Host,
  updateApi1Headers,
  addToApi1Headers,
  updateApi1AxiosInstance,
} = apisSlice.actions;
