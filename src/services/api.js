import { stringify } from 'qs';
import request from '@/utils/request';

export async function brandPaging(params) {
  return request(
    `http://127.0.0.1:2002/api/v1/brand/paging?name=${params.name ? params.name : ''}&page=${
      params.page ? params.page : ''
      }&size=${params.size ? params.size : ''}`,
  );
}

export async function brandGet(params) {
  return request('http://127.0.0.1:2002/api/v1/brand/get');
}

export async function brandAdd(params) {
  let formData = new FormData();
  formData.append('name', params.name ? params.name : '');
  formData.append('remark', params.remark ? params.remark : '');
  return request(`http://127.0.0.1:2002/api/v1/brand/add`, {
    method: 'POST',
    body: formData,
  });
}

export async function brandRemove(params) {
  console.info(params);
  return request(`http://127.0.0.1:2002/api/v1/brand/remove?id=${params.id}`);
}


export async function categoryPaging(params) {
  return request(
    `http://127.0.0.1:2002/api/v1/category/paging?name=${params.name ? params.name : ''}&page=${
      params.page ? params.page : ''
      }&size=${params.size ? params.size : ''}`,
  );
}

export async function categoryGet(params) {
  return request('http://127.0.0.1:2002/api/v1/category/get');
}

export async function categoryAdd(params) {
  let formData = new FormData();
  formData.append('name', params.name ? params.name : '');
  formData.append('remark', params.remark ? params.remark : '');
  return request(`http://127.0.0.1:2002/api/v1/category/add`, {
    method: 'POST',
    body: formData,
  });
}

export async function categoryRemove(params) {
  console.info(params);
  return request(`http://127.0.0.1:2002/api/v1/category/remove?id=${params.id}`);
}


export async function appraisalPaging(params) {
  return request(
    `http://127.0.0.1:2002/api/v1/appraisal/paging?name=${params.name ? params.name : ''}&page=${
      params.page ? params.page : ''
      }&size=${params.size ? params.size : ''}`,
  );
}

export async function appraisalGet(params) {
  return request(`http://127.0.0.1:2002/api/v1/appraisal/get?id=${params.id ? params.id : ''}`);
}

export async function appraisalAdd(params) {
  let formData = new FormData();
  formData.append('name', params.name ? params.name : '');
  formData.append('remark', params.remark ? params.remark : '');
  return request(`http://127.0.0.1:2002/api/v1/appraisal/add`, {
    method: 'POST',
    body: formData,
  });
}

export async function appraisalRemove(params) {
  console.info(params);
  return request(`http://127.0.0.1:2002/api/v1/appraisal/remove?id=${params.id}`);
}


export async function imagePaging(params) {
  return request(
    `http://127.0.0.1:2002/api/v1/image/paging?name=${params.name ? params.name : ''}&page=${
      params.page ? params.page : ''
      }&size=${params.size ? params.size : ''}`,
  );
}

export async function imageGet(params) {
  return request(`http://127.0.0.1:2002/api/v1/image/get?id=${params.id ? params.id : ''}`);
}

export async function imageAdd(params) {
  let formData = new FormData();
  formData.append('name', params.name ? params.name : '');
  formData.append('type', params.type ? params.type : '');
  formData.append('url', params.url ? params.url : '');
  return request(`http://127.0.0.1:2002/api/v1/image/add`, {
    method: 'POST',
    body: formData,
  });
}

export async function imageRemove(params) {
  console.info(params);
  return request(`http://127.0.0.1:2002/api/v1/image/remove?id=${params.id}`);
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
