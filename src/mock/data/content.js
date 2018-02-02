import Mock from 'mockjs';
const Contents = [];
for (let i = 0; i < 100; i++) {
    Contents.push(Mock.mock({
        id: Mock.Random.guid(),
        title: Mock.Random.cname(),
        setTop: Mock.Random.string('number', 2),
        releasedBy: Mock.Random.cname(),
        releasedTime:Mock.Random.date(),
        clickNum: Mock.Random.string('number', 4),
        auditStatus: '已审核',
        sortNo: i,
        status: "有效"
    }));
}
export { Contents};
