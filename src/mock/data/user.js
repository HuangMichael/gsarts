import Mock from 'mockjs';
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
        avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
        name: 'Michael'
    }
];

const Users = [];

for (let i = 0; i < 86; i++) {
    Users.push(Mock.mock({
        id: Mock.Random.guid(),
        name: Mock.Random.cname(),
        telephone: Mock.Random.string('number', 11),
        password: Mock.Random.string('number', 6),
        addr: Mock.mock('@county(true)'),
        'age|18-60': 1,
        birth: Mock.Random.date(),
        sex: (i % 2) ? "男" : "女",
        sortNo: i,
        status: "有效"
    }));
}

export {LoginUsers, Users};
