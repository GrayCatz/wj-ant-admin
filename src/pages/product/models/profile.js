import { productGet, productUpdate } from '@/services/api';

export default {
  namespace: 'profile',

  state: {
    basicGoods: [],
    advancedOperation1: [],
    advancedOperation2: [],
    advancedOperation3: [],
  },

  effects: {
    * fetchBasic({ payload }, { call, put }) {
      const response = yield call(productGet, payload);
      yield put({
        type: 'show',
        payload: {
          application: response.data,
        },
      });
    },
    * saveProfile({ payload , callback }, { call, put }) {
      console.log(payload)
      console.log(callback)
      const response = yield call(productUpdate, payload);
      yield put({
        type: 'show',
        payload: response,
      });
      if (callback) callback(response);
    },
    * fetchAdvanced(_, { call, put }) {
      const response = yield call(productGet);
      yield put({
        type: 'show',
        payload: response,
      });
    },
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
