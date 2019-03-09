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
        type: 'save',
        payload:{
          data
        } ,
      });
    },
    * get({ payload, callback }, { call, put }) {
      const response = yield call(request, Api.USER.GET, payload, callback);
      console.log(response)
      yield put({
        type: 'save',
        payload: {
          current: response,
        },
      });
    },
    * save({ payload, callback }, { call, put }) {
      const response = yield call(request, Api.USER.SAVE, payload, callback);

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
    save(state, action) {
      return {
        ...state,
        data: action.payload.data?action.payload.data:state.data,
        current: action.payload.current?action.payload.current:state.current,
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
