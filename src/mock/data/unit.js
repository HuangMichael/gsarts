import Mock from 'mockjs';
const Units = [];
for (let i = 0; i < 99; i++) {
    Units.push(Mock.mock({
        id: Mock.Random.guid(),
        code: Mock.Random.cname(),
        name: "甘肃文联" + i,
        parent: "甘肃文联",
        sortNo: i,
        status: "1"
    }));
}
export {Units};
