import Mock from 'mockjs';


const Roles = [];

for (let i = 0; i < 10; i++) {
    Roles.push(Mock.mock({
        id: Mock.Random.guid(),
        name: "角色" + i,
        sortNo: i,
        status: "1"
    }));
}

export {Roles};
