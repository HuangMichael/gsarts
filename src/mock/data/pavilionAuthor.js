import Mock from 'mockjs';
const PavilionAuthors = [];

for (let i = 0; i < 86; i++) {
    PavilionAuthors.push(Mock.mock({
        id: Mock.Random.guid(),
        unit: Mock.Random.cname(),
        name: Mock.Random.cname(),
        hasPhoto: "是",
        enterDate: Mock.Random.date(),
        createTime: Mock.Random.date(),
        sortNo: i,
        status: "1"
    }));
}
export {PavilionAuthors};
