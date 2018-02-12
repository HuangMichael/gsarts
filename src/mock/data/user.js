import Mock from 'mockjs';
import axios from 'axios'
const LoginUsers = [
    {
        id: 1,
        username: 'admin',
        password: '123456',
        avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
        name: '黄斌'
    },
    {
        id: 2,
        username: 'huangbin',
        password: '123456',
        avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/mal.ster/vueadmin/user.png',
        name: 'Michael'
    }
];

const Users = [];



let url = `http://localhost:8080/api/user/`;
axios.get(url).then(function (response) {
    let u = JSON.parse(JSON.stringify(response.data));
    console.log("u----------------" + JSON.stringify(u));
    for (var x of u) {
        Users.push(x);
    }
});
console.log("Units----------------" + JSON.stringify(Users));
export {LoginUsers, Users};
