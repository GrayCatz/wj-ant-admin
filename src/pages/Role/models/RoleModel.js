import request from '@/services/request';
import Api from '../../../services/api';
import { message } from 'antd';

export default {
  namespace: 'role',

  state: {
    data: {
      list: [{
        id: 1,
        name: '鉴别时',
        phone: '图库，订单管理，产品管理',
      }],
      pagination: {},
    },
    permission: {
      list: [],
    },
  },

  effects: {
    * paging({ payload }, { call, put }) {
      const response = yield call(request, Api.ROLE.PAGING,payload);
      console.log(response);
      const data = {
        list: response.list,
        pagination: {
          current: response.pageNo,
          pageSize: response.pageSize,
          total: response.total,
        },
      };
      yield put({
        type: 'save',
        payload: data,
      });
    },
    * saveRole({ payload, callback }, { call, put }) {
      const response = yield call(request, Api.ROLE.SAVE, payload, callback);

    },
    * remove({ payload, callback }, { call, put }) {
      const response = yield call(request, Api.ROLE.REMOVE, payload, callback);

    },
    * permissions({ payload }, { call, put }) {
      const response = yield call(request, Api.PERMISSION.PAGING, payload);
      const permission = {
        list: response.list,
        pagination: {
          current: response.pageNo,
          pageSize: response.pageSize,
          total: response.total,
        },
      };
      yield put({
        type: 'savePermission',
        payload: permission,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    savePermission(state, action) {
      return {
        ...state,
        permission: action.payload,

      };
    },
  },
};
