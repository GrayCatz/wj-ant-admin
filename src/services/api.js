import { stringify } from 'qs';
import request from '@/utils/request';

export async function brandPaging(params) {
  return request(
    `http://127.0.0.1:2002/api/v1/brand/paging?name=${params.name ? params.name : ''}&page=${
      params.page ? params.page : ''
    }&size=${params.size ? params.size : ''}`
  );
  // return request(`/api/rule?${stringify(params)}`);
}

export async function brandGet(params) {
  return request('http://127.0.0.1:2002/api/v1/brand/get');
  // return request(`/api/rule?${stringify(params)}`);
}

export async function brandAdd(params) {
  // return request('http://127.0.0.1:2002/api/v1/brand/add');
  let formData = new FormData();
  formData.append('name', params.name ? params.name : '');
  formData.append('remark', params.remark ? params.remark : '');
  return request(`http://127.0.0.1:2002/api/v1/brand/add`, {
    method: 'POST',
    body: formData,
  });
  // return request(`/api/rule?${stringify(params)}`);
}

export async function brandRemove(params) {
  console.info(params);
  return request(`http://127.0.0.1:2002/api/v1/brand/remove?id=${params.id}`);
  // return request(`http://127.0.0.1:2002/api/v1/brand/remove`);
  // return request(`/api/rule?${stringify(params)}`);
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
