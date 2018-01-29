import Mock from 'mockjs';
const Units = [];

for (let i = 0; i < 86; i++) {
    Units.push(Mock.mock({
        id: Mock.Random.guid(),
        name: Mock.Random.cname(),
        telephone: Mock.Random.string('number', 11),
        password: Mock.Random.string('number', 6),
        addr: Mock.mock('@county(true)'),
        'age|18-60': 1,
        birth: Mock.Random.date(),
        sex: Mock.Random.integer(0, 1)
    }));
}

export {Units};
