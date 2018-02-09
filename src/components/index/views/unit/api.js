/**
 * Created by huangbin on 2018/2/9.
 */


import axios from 'axios';

let base = '';
let host = 'http://localhost:8080/Urban/rest';
var rootIP = process.env.API_ROOT;
/**
 *
 * @param params
 * @returns {AxiosPromise}
 */
export const getUnitList = params => {
    return axios.get('/unit/', {params: params});
};


export const removeUnit = params => {
    return axios.get(`${base}/user/remove`, {params: params});
};

export const batchRemoveUnit = params => {
    return axios.get(`${base}/user/batchremove`, {params: params});
};

export const editUnit = params => {
    return axios.get(`${base}/user/edit`, {params: params});
};


/**
 *
 * @param params 新增单位信息
 * @returns {AxiosPromise}
 */
export const addUnit = params => {
    console.log("---------------" + JSON.stringify(params));
    return axios.put(`/unit/`, {params: params});
};