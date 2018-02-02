import axios from 'axios';

let base = '';
let host = 'http://localhost:8080/Urban/rest';
var rootIP = process.env.API_ROOT;


export const requestLogin = params => {
    return axios.post(`${base}/login`, params).then(res => res.data);
};

export const getUserList = params => {
    return axios.get(`${base}/user/list`, {params: params});
};

//真实环境时，禁掉mock，请求真实后台地址
export const getUserList1 = params => {
    return axios.get(host + `/user/queryAllUser`);
};

export const getUserList2 = params => {
    return axios.get(`/user/queryAllUser`);
};

export const getUserListPage = params => {
    console.log("api----params-----------"+JSON.stringify(params));
    return axios.get(`${base}/user/listpage`, {params: params});
};


export const getColumnsListPage = params => {
    console.log("api----params-----------"+JSON.stringify(params));
    return axios.get(`${base}/columns/`, {params: params});
};



export const getMemberListPage = params => {
    console.log("api----params-----------"+JSON.stringify(params));
    return axios.get(`${base}/member/listpage`, {params: params});
};


export const getRoleListPage = params => {
    console.log("api----params-----------"+JSON.stringify(params));
    return axios.get(`${base}/role/listpage`, {params: params});
};


export const getMemberWorksListPage = params => {
    console.log("api----params-----------"+JSON.stringify(params));
    return axios.get(`${base}/memberWorks/listpage`, {params: params});
};


export const getPavilionAuthorListPage = params => {
    console.log("api----params-----------"+JSON.stringify(params));
    return axios.get(`${base}/pavilionAuthor/listpage`, {params: params});
};


export const getPavilionWorksListPage = params => {
    console.log("api----params-----------"+JSON.stringify(params));
    return axios.get(`${base}/pavilionWorks/listpage`, {params: params});
};

export const getAllRoles = params => {
    return axios.get(`${base}/role/list`, {params: params});
};
export const removeUser = params => {
    return axios.get(`${base}/user/remove`, {params: params});
};

export const batchRemoveUser = params => {
    return axios.get(`${base}/user/batchremove`, {params: params});
};

export const editUser = params => {
    return axios.get(`${base}/user/edit`, {params: params});
};

export const addUser = params => {
    return axios.get(`${base}/user/add`, {params: params});
};

export const getInfoList = params => {
    return axios.get(`${base}/info/list`, {params: params});
};
// 联系我们
export const getTelephone = params => {
    return axios.get(`${base}/telephone/list`, {params: params});
};

//获取人员列表
export const getAllPerson = params => {
    return axios.get(`${base}/person/list`);
};

//获取 所有单位
export const getAllUnits = params => {
    return axios.get(`${base}/unit`);
};


