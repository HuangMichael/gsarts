import Mock from 'mockjs';


const Columns = [];
for (let i = 0; i < 86; i++) {
    Columns.push(Mock.mock({
        id: Mock.Random.guid(),
        site: Mock.Random.cname(),
        name: Mock.Random.cname(),
        type: Mock.Random.string('number', 6),
        beginTime:  Mock.Random.date(),
        endTime:  Mock.Random.date(),
        sortNo: i,
        status: "有效"
    }));
}

export {Columns};
