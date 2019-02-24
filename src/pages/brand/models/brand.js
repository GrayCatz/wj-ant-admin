import { brandAdd, brandGet, brandPaging, brandRemove } from '@/services/api';

export default {
  namespace: 'brand',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(brandPaging, payload);
      console.log(response);
      const resp = response.data;
      const data = {
        list: resp.data,
        pagination: {
          current: resp.pageNo,
          pageSize: resp.size,
          total: resp.total,
        },
      };
      yield put({
        type: 'save',
        payload: data,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(brandAdd, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(brandRemove, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(brandRemove, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
