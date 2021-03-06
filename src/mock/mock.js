import axios from 'axios';
import qs from 'qs';
import MockAdapter from 'axios-mock-adapter';
import {LoginUsers, Users} from './data/user';
import {Roles} from './data/role';
import {Infos} from './data/infos';
import {Telephone} from './data/telephone';
import {Members} from './data/member';
import {MemberWorks} from './data/memberWorks';
import {PavilionAuthors} from './data/pavilionAuthor';
import {PavilionWorks} from './data/pavilionWorks';
import {Units} from './data/unit';

import {Columns} from './data/columns';
import {Contents} from './data/content';


const pageSize = 14;
let _Users = Users;
let _Infos = Infos;
let _Telephone = Telephone;
let _Roles = Roles;
let _Members = Members;
let _MemberWorks = MemberWorks;
let _PavilionAuthors = PavilionAuthors;
let _PavilionWorks = PavilionWorks;
let _Units = Units;
let _Columns = Columns;
let _Contents = Contents;


export default {
    /**
     * mock bootstrap
     */
    bootstrap() {
        let mock = new MockAdapter(axios);

        // mock success request
        mock.onGet('/success').reply(200, {
            msg: 'success'
        });

        // mock error request
        mock.onGet('/error').reply(500, {
            msg: 'failure'
        });

        //登录
        mock.onPost('/login').reply(config => {
            let {username, password} = JSON.parse(config.data);
            return new Promise((resolve, reject) => {
                let user = null;
                setTimeout(() => {
                    let hasUser = LoginUsers.some(u => {
                        if (u.username === username && u.password === password) {
                            user = JSON.parse(JSON.stringify(u));
                            user.password = undefined;
                            return true;
                        }
                    });

                    if (hasUser) {
                        resolve([200, {code: 200, msg: '请求成功', user}]);
                    } else {
                        resolve([200, {code: 500, msg: '账号或密码错误'}]);
                    }
                }, 1000);
            });
        });


        //获取info列表
        mock.onGet('/info/list').reply(config => {
            console.dir(config.params);
            let {name} = config.params;
            let mockInfos = _Infos.filter(info => {
                if (name && info.name.indexOf(name) == -1)
                    return false;
                return true;
            })
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        infos: mockInfos
                    }]);
                }, 1000);
            })
        })
        // 获取联系我们列表
        mock.onGet('/telephone/list').reply(config => {
            let {name} = config.params;
            let mockTel = _Telephone.filter(telephone => {
                if (name && telephone.name.indexOf(name) == -1) return false;
                return true;
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        telephones: mockTel
                    }]);
                }, 1000);
            });
        });

        //获取用户列表
        mock.onGet('/user/list').reply(config => {
            let {name} = config.params;
            let mockUsers = _Users.filter(user => {
                if (name && user.name.indexOf(name) == -1) return false;
                return true;
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        users: mockUsers
                    }]);
                }, 1000);
            });
        });

        mock.onGet('/user/queryAllUser').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        users: _Users
                    }]);
                }, 1000);
            });
        })

        //获取用户列表（分页）
        mock.onGet('/user/').reply(config => {
            let {page, name} = config.params;
            let mockUsers = _Users.filter(user => {
                if (name && user.name.indexOf(name) == -1) return false;
                return true;
            });
            let total = mockUsers.length;
            mockUsers = mockUsers.filter((u, index) => index < pageSize * page && index >= pageSize * (page - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        total: total,
                        dataList: mockUsers
                    }]);
                }, 1000);
            });
        });

        //获取用户列表（分页）
        mock.onGet('/role/listpage').reply(config => {
            let {page, name} = config.params;
            let mockRoles = _Roles.filter(role => {
                if (name && role.name.indexOf(name) == -1) return false;
                return true;
            });
            let total = mockRoles.length;
            mockRoles = mockRoles.filter((u, index) => index < pageSize * page && index >= pageSize * (page - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        total: total,
                        roles: mockRoles
                    }]);
                }, 1000);
            });
        });


        //获取用户列表（分页）
        mock.onGet('/member/listpage').reply(config => {
            let {page, name} = config.params;
            let mockMembers = _Members.filter(member => {
                if (name && member.name.indexOf(name) == -1) return false;
                return true;
            });
            let total = mockMembers.length;
            mockMembers = mockMembers.filter((u, index) => index < pageSize * page && index >= pageSize * (page - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        total: total,
                        members: mockMembers
                    }]);
                }, 1000);
            });
        });


        //获取用户列表（分页）
        mock.onGet('/memberWorks/listpage').reply(config => {
            let {page, name} = config.params;
            let mockMemberWorks = _MemberWorks.filter(member => {
                if (name && member.name.indexOf(name) == -1) return false;
                return true;
            });
            let total = mockMemberWorks.length;
            mockMemberWorks = mockMemberWorks.filter((u, index) => index < pageSize * page && index >= pageSize * (page - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        total: total,
                        memberWorks: mockMemberWorks
                    }]);
                }, 1000);
            });
        });

        //获取网上展馆作者列表
        mock.onGet('/pavilionAuthor/listpage').reply(config => {
            let {page, name} = config.params;
            let mockPavilionAuthors = _PavilionAuthors.filter(author => {
                if (name && author.name.indexOf(name) == -1) return false;
                return true;
            });
            let total = mockPavilionAuthors.length;
            mockPavilionAuthors = mockPavilionAuthors.filter((u, index) => index < pageSize * page && index >= pageSize * (page - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        total: total,
                        pavilionAuthors: mockPavilionAuthors
                    }]);
                }, 1000);
            });
        });

        //获取网上展馆作者列表
        mock.onGet('/pavilionWorks/listpage').reply(config => {
            let {page, name} = config.params;
            let mockPavilionWorks = _PavilionWorks.filter(works => {
                if (name && works.name.indexOf(name) == -1) return false;
                return true;
            });
            let total = mockPavilionWorks.length;
            mockPavilionWorks = mockPavilionWorks.filter((u, index) => index < pageSize * page && index >= pageSize * (page - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        total: total,
                        pavilionWorks: mockPavilionWorks
                    }]);
                }, 1000);
            });
        });


        //获取栏目列表
        mock.onGet('/columns/').reply(config => {
            let {page, name} = config.params;
            let mockColumns = _Columns.filter(c => {
                if (name && c.name.indexOf(name) == -1) return false;
                return true;
            });
            let total = mockColumns.length;
            mockColumns = mockColumns.filter((u, index) => index < pageSize * page && index >= pageSize * (page - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        total: total,
                        columns: mockColumns
                    }]);
                }, 1000);
            });
        });


        //获取栏目列表
        mock.onGet('/content/').reply(config => {
            let {page, name} = config.params;
            let mockContents = _Contents.filter(c => {
                if (name && c.name.indexOf(name) == -1) return false;
                return true;
            });
            let total = mockContents.length;
            mockContents = mockContents.filter((u, index) => index < pageSize * page && index >= pageSize * (page - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        total: total,
                        contents: mockContents
                    }]);
                }, 1000);
            });
        });

        // PavilionAuthors


        //获取网上展馆作者列表
        mock.onGet('/unit/').reply(config => {
            let {page, name} = config.params;
            let mockUnits = _Units.filter(unit => {
                if (name && unit.name.indexOf(name) == -1) {
                    return false;
                } else {
                    return true;
                }
            });
            let total = mockUnits.length;
            mockUnits = mockUnits.filter((u, index) => index < pageSize * page && index >= pageSize * (page - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        total: total,
                        dataList: mockUnits
                    }]);
                }, 1000);
            });
        });


        //获取用户列表
        mock.onGet('/user/').reply(config => {
            let {page, name} = config.params;
            let mockUsers = _Users.filter(user => {
                if (name && user.name.indexOf(name) == -1) {
                    return false;
                } else {
                    return true;
                }
            });
            let total = mockUsers.length;
            mockUsers = mockUsers.filter((u, index) => index < pageSize * page && index >= pageSize * (page - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        total: total,
                        dataList: mockUsers
                    }]);
                }, 1000);
            });
        });

        //删除用户
        mock.onGet('/user/remove').reply(config => {
            let {id} = config.params;
            _Users = _Users.filter(u => u.id !== id);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '删除成功'
                    }]);
                }, 500);
            });
        });

        //批量删除用户
        mock.onGet('/user/batchremove').reply(config => {
            let {ids} = config.params;
            ids = ids.split(',');
            _Users = _Users.filter(u => !ids.includes(u.id));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '删除成功'
                    }]);
                }, 500);
            });
        });

        //编辑用户
        mock.onGet('/user/edit').reply(config => {
            let {id, name, addr, age, birth, sex} = config.params;
            _Users.some(u => {
                if (u.id === id) {
                    u.name = name;
                    u.addr = addr;
                    u.age = age;
                    u.birth = birth;
                    u.sex = sex;
                    return true;
                }
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '编辑成功'
                    }]);
                }, 500);
            });
        });

        //新增用户
        mock.onGet('/user/add').reply(config => {
            let {name, addr, age, birth, sex} = config.params;
            _Users.push({
                name: name,
                addr: addr,
                age: age,
                birth: birth,
                sex: sex
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '新增成功'
                    }]);
                }, 500);
            });
        });

        //新增用户
        mock.onPut('http://localhost:8080/api/unit/save').reply(config => {
            console.log("config.params----------" + JSON.stringify(config.params));
            let {name, parent, sortNo, status} = config.params;
            _Units.push({
                name: name,
                parent: parent,
                sortNo: sortNo,
                status: status
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '新增成功'
                    }]);
                }, 500);
            });
        });


        //查询所有人员信息

        //获取用户列表
        mock.onGet('/role/list').reply(config => {
            let {roleName} = config.params;
            let mockRoles = _Roles.filter(role => {
                if (role && role.roleName.indexOf(roleName) == -1) return false;
                return true;
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        dataList: mockRoles
                    }]);
                }, 1000);
            });
        });

        //
        // //获取用户列表
        // mock.onGet('/role/list').reply(config => {
        //     let {roleName} = config.params;
        //     let mockRoles = _Roles.filter(role => {
        //         if (role && role.roleName.indexOf(roleName) == -1) return false;
        //         return true;
        //     });
        //     return new Promise((resolve, reject) => {
        //         setTimeout(() => {
        //             resolve([200, {
        //                 dataList: mockRoles
        //             }]);
        //         }, 1000);
        //     });
        // });


    }
};