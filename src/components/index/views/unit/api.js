import axios from 'axios';
let host = 'http://localhost:8080';
//获取所有单位
export const getAllUnits = params => {
    let data = axios.get(host + `/unit/`);
    console.log("data------------" + JSON.stringify(data));
    return data;
};


