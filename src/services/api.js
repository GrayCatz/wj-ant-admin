import { stringify } from 'qs';
import request from '@/utils/request';
import md5 from 'md5';

// const host = 'http://127.0.0.1:2003';

const Api = {
  USER: {
    PAGING: '/api/v1/user/paging',
    GET: '/api/v1/user/get',
    SAVE: '/api/v1/user/save',
    REMOVE: '/api/v1/user/remove',
    UPDATE_STATUS: '/api/v1/user/update_status',

  },
  ROLE: {
    LIST: '/api/v1/role/list',
    PAGING: '/api/v1/role/paging',
    SAVE: '/api/v1/role/save',
    REMOVE: '/api/v1/role/remove',

  },
  PERMISSION: {
    PAGING: '/api/v1/permission/paging',

  },
};
export default Api;

const  host = "http://47.112.33.199:2003";

export async function login(params) {
  return request(
    `${host}/api/v1/token/add?username=${params.username ? params.username : ''}&password=${
      params.password ? md5(params.password) : ''
      }`,
  );

}

export async function brandPaging(params) {
  return request(
    `${host}/api/v1/brand/paging?name=${params.name ? params.name : ''}&page=${
      params.page ? params.page : ''
      }&size=${params.size ? params.size : ''}`,
  );
}

export async function brandGet(params) {
  return request(`${host}/api/v1/brand/get`);
}

export async function brandAdd(params) {
  let formData = new FormData();
  formData.append('name', params.name ? params.name : '');
  formData.append('remark', params.remark ? params.remark : '');
  return request(`${host}/api/v1/brand/add`, {
    method: 'POST',
    body: formData,
  });
}

export async function brandRemove(params) {
  console.info(params);
  return request(`${host}/api/v1/brand/remove?id=${params.id}`);
}

export async function productPaging(params) {
  return request(
    `${host}/api/v1/product/paging?name=${params.name ? params.name : ''}&category=${params.category ? params.category : ''}&brand=${params.brand ? params.brand : ''}&page=${
      params.page ? params.page : ''
      }&size=${params.size ? params.size : 20}`,
  );
}

export async function productGet(params) {
  return request(`${host}/api/v1/product/get?id=${params.id ? params.id : ''}`);
}

export async function productAdd(params) {
  let formData = new FormData();
  formData.append('name', params.name ? params.name : '');
  formData.append('remark', params.remark ? params.remark : '');
  return request(`${host}/api/v1/product/add`, {
    method: 'POST',
    body: formData,
  });
}

export async function productUpdate(params = {}) {
  console.log(JSON.stringify(params));
  return request(`${host}/api/v1/product/save`, {
    method: 'POST',
    body: params,
  });
  // return request(`http://127.0.0.1:2002/api/v1/product/update?data=`+JSON.stringify(params),);
  // fetch('http://127.0.0.1:2002/api/v1/product/update', {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   method: 'POST',
  //   body: JSON.stringify(params),
  // });
}

export async function productRemove(params) {
  console.info(params);
  return request(`${host}/api/v1/product/remove?id=${params.id}`);
}

export async function productUpdateStatus(params) {
  return request(`${host}/api/v1/product_status/update?id=${params.id}&status=${params.status}`);
}


export async function categoryPaging(params) {
  return request(
    `${host}/api/v1/category/paging?name=${params.name ? params.name : ''}&page=${
      params.page ? params.page : ''
      }&size=${params.size ? params.size : ''}`,
  );
}

export async function categoryGet(params) {
  return request(`${host}/api/v1/category/get`);
}

export async function categoryAdd(params) {
  let formData = new FormData();
  formData.append('name', params.name ? params.name : '');
  formData.append('remark', params.remark ? params.remark : '');
  return request(`${host}/api/v1/category/add`, {
    method: 'POST',
    body: formData,
  });
}

export async function categoryRemove(params) {
  console.info(params);
  return request(`${host}/api/v1/category/remove?id=${params.id}`);
}


export async function appraisalPaging(params) {
  return request(
    `${host}/api/v1/appraisal/paging?name=${params.name ? params.name : ''}&page=${
      params.page ? params.page : ''
      }&size=${params.size ? params.size : ''}`,
  );
}

export async function appraisalGet(params) {
  return request(`${host}/api/v1/appraisal/get?id=${params.id ? params.id : ''}`);
}

export async function appraisalResultChange(params) {
  return request(`${host}/api/v1/appraisal_result/update?id=${params.id ? params.id : ''}&result=${params.result ? params.result : ''}`);
}

export async function appraisalAdd(params) {
  let formData = new FormData();
  formData.append('name', params.name ? params.name : '');
  formData.append('remark', params.remark ? params.remark : '');
  return request(`${host}/api/v1/appraisal/add`, {
    method: 'POST',
    body: formData,
  });
}

export async function appraisalRemove(params) {
  console.info(params);
  return request(`${host}/api/v1/appraisal/remove?id=${params.id}`);
}


export async function imagePaging(params) {
  return request(
    `${host}/api/v1/image/paging?name=${params.name ? params.name : ''}&type=${params.type ? params.type : ''}&page=${
      params.page ? params.page : ''
      }&size=${params.size ? params.size : 20}`,
  );
}

export async function imageGet(params) {
  return request(`${host}/api/v1/image/get?id=${params.id ? params.id : ''}`);
}

export async function imageAdd(params) {
  let formData = new FormData();
  formData.append('name', params.name ? params.name : '');
  formData.append('type', params.type ? params.type : '');
  formData.append('url', params.url ? params.url : '');
  return request(`${host}/api/v1/image/add`, {
    method: 'POST',
    body: formData,
  });
}

export async function imageBatchAdd(params = {}) {
  console.log(JSON.stringify(params));
  return request(`${host}/api/v1/image/batch_add`, {
    method: 'POST',
    body: params,
  });
}

export async function imageRemove(params) {
  console.info(params);
  return request(`${host}/api/v1/image/remove?id=${params.id}`);
}


export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request('http://127.0.0.1:2002/api/v1/brand/paging');
  // return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params = {}) {
  return request(`/api/rule?${stringify(params.query)}`, {
    method: 'POST',
    body: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile(id) {
  return request(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}
