import Mock from 'mockjs';
const Members = [];


//
// {
//     "type": "selection",
//     "width": "55"
// },
// {
//     "type": "index",
//     "width": "60"
// },
// {
//     "type": "",
//     "prop": "unit",
//     "label": "所属协会",
//     "width": "100",
//     "sortable": true
// }, {
//     "type": "",
//         "prop": "name",
//         "label": "会员姓名",
//         "width": "100",
//         "sortable": true
// }, {
//     "type": "",
//         "prop": "cardNo",
//         "label": "会员证号",
//         "width": "100",
//         "sortable": true
// }, {
//     "type": "",
//         "prop": "memberType",
//         "label": "会员类型",
//         "width": "100",
//         "sortable": true
// },
//
// {
//     "type": "",
//     "prop": "hasPhoto",
//     "label": "是否有照片",
//     "width": "100",
//     "sortable": true
// },
// {
//     "type": "",
//     "prop": "enterDate",
//     "label": "会员加入时间",
//     "width": "100",
//     "sortable": true
// },
// {
//     "type": "",
//     "prop": "createTime",
//     "label": "创建时间",
//     "width": "100",
//     "sortable": true
// }

for (let i = 0; i < 86; i++) {
    Members.push(Mock.mock({
        id: Mock.Random.guid(),
        unit: Mock.Random.cname(),
        name: Mock.Random.string('number', 11),
        cardNo: Mock.Random.string('number', 6),
        memberType: "vip",
        hasPhoto: "是",
        enterDate: Mock.Random.date(),
        createTime: Mock.Random.date(),
        sortNo: i,
        status: "1"
    }));
}
export {Members};
