import Mock from 'mockjs';

const MemberWorks = [];
for (let i = 0; i < 86; i++) {
    MemberWorks.push(Mock.mock({
        id: Mock.Random.guid(),
        unit: Mock.Random.cname(),
        name: Mock.Random.cname(),
        worksName: Mock.Random.cname(),
        isFocus: "是",
        birth: Mock.Random.date(),
        sex: Mock.Random.integer(0, 1),
        sortNo: i,
        status: "1"
    }));
}

export { MemberWorks};
