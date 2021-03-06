/**
 * Created by huangbin on 2018/1/26.
 */

import util from 'common/js/util'
import {getRoleListPage} from 'api/api';


const generateData = _ => {
    const data = [];
    for (let i = 1; i <= 15; i++) {
        data.push({
            key: i,
            label: `备选项 ${ i }`,
            disabled: i % 4 === 0
        });
    }
    return data;
}


export default {
    data() {
        return {
            filters: {
                name: ''
            },
            //定义查询条件

            queryCols: [{
                colName: "userName",
                placeHolder: "角色名称"
            }],
            operations: [{
                label: "查询",
                method: "getRoles()",
                btnType: "primary",
                icon: "el-icon-circle-plus"
            }, {
                label: "新建角色",
                method: "handleAdd()",
                btnType: "primary",
                icon: "el-icon-search"
            }, {
                label: "系统授权",
                method: "handleAdd()",
                btnType: "primary",
                icon: "el-icon-search"
            }, {
                label: "站点授权",
                method: "handleAdd()",
                btnType: "primary",
                icon: "el-icon-search"
            }],
            roles: [],
            total: 0,
            page: 1,
            listLoading: false,
            sels: [],//列表选中列
            columnsConfig: [],
            editFormVisible: false,//编辑界面是否显示
            editLoading: false,
            editFormRules: {
                name: [
                    {required: true, message: '请输入姓名', trigger: 'blur'}
                ]
            },
            //编辑界面数据
            editForm: {
                id: 0,
                name: '',
                sex: -1,
                age: 0,
                birth: '',
                addr: ''
            },

            addFormVisible: false,//新增界面是否显示
            addLoading: false,
            addFormRules: {
                name: [
                    {required: true, message: '请输入姓名', trigger: 'blur'}
                ]
            },
            //新增界面数据
            addForm: {
                name: '',
                sex: -1,
                age: 0,
                birth: '',
                addr: ''
            },
            data: generateData(),
            value1: [1, 4]
        }
    },
    methods: {

        applyMethod(m){
            eval("this." + m);
        },
        //性别显示转换
        formatSex: function (row, column) {
            return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
        },

        formatStatus: function (row, column) {
            return row.status == "1" ? '有效' : row.status == '0' ? '无效' : '未知';
        },

        handleCurrentChange(val) {
            this.page = val;
            this.getRoles();
        },

        /**
         * 获取数据表列配置
         */
        getColumnsConfig(){
            this.columnsConfig = [
                {
                    "type": "selection",
                    "width": "100"
                },
                {
                    "type": "",
                    "prop": "name",
                    "label": "角色名称",
                    "width": "100",
                    "sortable": true
                },
                {
                    "type": "",
                    "prop": "sortNo",
                    "label": "排序",
                    "width": "100",
                    "sortable": true
                }, {
                    "type": "",
                    "prop": "status",
                    "label": "100",
                    "width": "50",
                    "sortable": true
                }];
        },


        //获取用户列表
        getRoles() {
            let para = {
                page: this.page,
                name: this.filters.name
            };
            this.listLoading = true;
            getRoleListPage(para).then((res) => {
                this.total = res.data.total;
                this.roles = res.data.roles;
                this.listLoading = false;
            });
        },
        //删除
        handleDel: function (index, row) {
            this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning'
            }).then(() => {
                this.listLoading = true;
                //NProgress.start();
                let para = {id: row.id};
                removeUser(para).then((res) => {
                    this.listLoading = false;
                    //NProgress.done();
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getRoles();
                });
            }).catch(() => {

            });
        },
        //显示编辑界面
        handleEdit: function (index, row) {
            this.editFormVisible = true;
            this.editForm = Object.assign({}, row);
        },
        //显示新增界面
        handleAdd: function () {
            this.addFormVisible = true;
            this.addForm = {
                name: '',
                sex: -1,
                age: 0,
                birth: '',
                addr: ''
            };
        },
        //编辑
        editSubmit: function () {
            this.$refs.editForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.editLoading = true;
                        //NProgress.start();
                        let para = Object.assign({}, this.editForm);
                        para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                        editUser(para).then((res) => {
                            this.editLoading = false;
                            //NProgress.done();
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.$refs['editForm'].resetFields();
                            this.editFormVisible = false;
                            this.getRoles();
                        });
                    });
                }
            });
        },
        //新增
        addSubmit: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.addLoading = true;
                        //NProgress.start();
                        let para = Object.assign({}, this.addForm);
                        para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                        addUser(para).then((res) => {
                            this.addLoading = false;
                            //NProgress.done();
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.$refs['addForm'].resetFields();
                            this.addFormVisible = false;
                            this.getRoles();
                        });
                    });
                }
            });
        },
        selsChange: function (sels) {
            this.sels = sels;
        },
        //批量删除
        batchRemove: function () {
            var ids = this.sels.map(item => item.id).toString();
            this.$confirm('确认删除选中记录吗？', '提示', {
                type: 'warning'
            }).then(() => {
                this.listLoading = true;
                //NProgress.start();
                let para = {ids: ids};
                batchRemoveUser(para).then((res) => {
                    this.listLoading = false;
                    //NProgress.done();
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getRoles();
                });
            }).catch(() => {

            });
        }
    },
    mounted() {
        this.getRoles();
        this.getColumnsConfig();
    }
}


