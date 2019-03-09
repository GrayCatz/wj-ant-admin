import request from '@/services/request';
import Api from '../../../services/api';


export default {
  namespace: 'users',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    current: {},
    roles: [],
  },

  effects: {
    * paging({ payload }, { call, put }) {
      const response = yield call(request, Api.USER.PAGING, payload);
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
        type: 'saveState',
        payload: {
          data,
        },
      });
    },
    * roles({ payload }, { call, put }) {
      const response = yield call(request, Api.ROLE.LIST, payload);
      yield put({
        type: 'saveState',
        payload: {
          roles: response,
        },
      });
    },
    * get({ payload, callback }, { call, put }) {
      const response = yield call(request, Api.USER.GET, payload, callback);
      yield put({
        type: 'saveState',
        payload: {
          current: response,
        },
      });
    },
    * save({ payload, callback }, { call, put }) {
      const response = yield call(request, Api.USER.SAVE, payload, callback);

    },
    * updateStatus({ payload, callback }, { call, put }) {
      const response = yield call(request, Api.USER.UPDATE_STATUS, payload, callback);
    },
    // * saveRole({ payload, callback }, { call, put }) {
    //   let role = {
    //     ...payload,
    //   };
    //   role.permissions = getIds(payload.permissions);
    //   // const response = yield call(request, Api.ROLE.SAVE, {data:JSON.stringify(payload)}, callback);
    //   const response = yield call(request, Api.ROLE.SAVE, role, callback);
    //
    // },
    // * remove({ payload, callback }, { call, put }) {
    //   const response = yield call(request, Api.ROLE.REMOVE, payload, callback);
    //
    // },
    // * permissions({ payload }, { call, put }) {
    //   const response = yield call(request, Api.PERMISSION.PAGING, payload);
    //   const permission = {
    //     list: response.list,
    //     pagination: {
    //       current: response.pageNo,
    //       pageSize: response.pageSize,
    //       total: response.total,
    //     },
    //   };
    //   yield put({
    //     type: 'savePermission',
    //     payload: permission,
    //   });
    // },
  },

  reducers: {
    saveState(state, action) {
      return {
        ...state,
        data: action.payload.data ? action.payload.data : state.data,
        current: action.payload.current ? action.payload.current : state.current,
        roles: action.payload.roles ? action.payload.roles : state.roles,
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
