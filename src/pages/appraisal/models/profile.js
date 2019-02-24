import { appraisalGet } from '@/services/api';

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
      const response = yield call(appraisalGet, payload);
      yield put({
        type: 'show',
        payload:{
          application:response.data,
        }
      });
    },
    * fetchAdvanced(_, { call, put }) {
      const response = yield call(appraisalGet);
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
