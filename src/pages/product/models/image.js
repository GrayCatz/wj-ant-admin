import { imageAdd, imageGet, imagePaging, imageRemove } from '@/services/api';

export default {
  namespace: 'image',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    * fetch({ payload }, { call, put }) {
      const response = yield call(imagePaging, payload);
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
    * add({ payload, callback }, { call, put }) {
      const response = yield call(imageAdd, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    * remove({ payload, callback }, { call, put }) {
      const response = yield call(imageRemove, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    * update({ payload, callback }, { call, put }) {
      const response = yield call(imageRemove, payload);
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
