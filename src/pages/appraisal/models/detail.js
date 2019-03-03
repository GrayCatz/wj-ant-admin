import { appraisalGet,appraisalResultChange } from '@/services/api';

export default {
  namespace: 'detail',

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
    * changeResult({ payload,callback }, { call, put }) {
      const response = yield call(appraisalResultChange, payload);
      if(callback)callback();
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
