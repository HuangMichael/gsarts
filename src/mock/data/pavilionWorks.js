import Mock from 'mockjs';
const PavilionWorks = [];

for (let i = 0; i < 86; i++) {
    PavilionWorks.push(Mock.mock({
        id: Mock.Random.guid(),
        column: Mock.Random.cname(),
        name: Mock.Random.cname(),
        worksName: Mock.Random.cname(),
        isFocus: "是",
        uploadDate: Mock.Random.date(),
        dispatchTime: Mock.Random.date(),
        sortNo: i,
        status: "1"
    }));
}
export {PavilionWorks};
