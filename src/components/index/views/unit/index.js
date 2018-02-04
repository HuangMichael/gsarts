/**
 * Created by huangbin on 2018/1/26.
 */

import util from 'common/js/util'
//import NProgress from 'nprogress'
import {getUnitList, removeUser, batchRemoveUser, editUser, addUser} from 'api/api';

export default {
    data() {
        return {
            filters: {
                name: ''
            },
            //定义查询条件

            queryCols: [{
                colName: "userName",
                placeHolder: "用户名称"
            }, {
                colName: "telephone",
                placeHolder: "电话号码"
            }],
            operations: [{
                label: "查询",
                method: "getUsers()",
                btnType: "primary",
                icon: "el-icon-circle-plus"
            }, {
                label: "新增记录",
                method: "handleAdd()",
                btnType: "primary",
                icon: "el-icon-search"
            }, {
                label: "发起流程",
                method: "startFlow()",
                btnType: "primary",
                icon: "el-icon-caret-right"
            }],
            dataList: [],
            total: 0,
            page: 1,
            listLoading: false,
            sels: [],//列表选中列
            columnsConfig: [],
            editFormVisible: false,//编辑界面是否显示
            editLoading: false,
            editFormRules: {
                name: [
                    {required: true, message: '请输入机构名称', trigger: 'blur'}
                ],
                parent: [
                    {required: true, message: '请输入上级机构', trigger: 'blur'}
                ]
            },
            //编辑界面数据
            editForm: {
                code: "",
                name: '',
                parent: "",
                sortNo: 1,
                status: ''
            },

            addFormVisible: false,//新增界面是否显示
            addLoading: false,
            addFormRules: {
                name: [
                    {required: true, message: '请输入机构名称', trigger: 'blur'}
                ],
                parent: [
                    {required: true, message: '请输入上级机构', trigger: 'blur'}
                ]
            },
            //新增界面数据
            addForm: {
                name: '',
                parent: "",
                sortNo: 1,
                status: ''
            }

        }
    },
    methods: {
        applyMethod(m){
            eval("this." + m);
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getUsers();
        },
        /**
         * 获取数据表列配置
         */
        getColumnsConfig(){
            this.columnsConfig = [
                {
                    "type": "selection",
                    "width": "55"
                },
                {
                    "type": "",
                    "prop": "code",
                    "label": "机构编号",
                    "width": "120",
                    "sortable": true
                }, {
                    "type": "",
                    "prop": "name",
                    "label": "机构名称",
                    "width": "220",
                    "sortable": true
                }, {
                    "type": "",
                    "prop": "parent",
                    "label": "上级机构",
                    "width": "220",
                    "sortable": true
                }, {
                    "type": "",
                    "prop": "sortNo",
                    "label": "排序",
                    "width": "120",
                    "sortable": true
                }, {
                    "type": "",
                    "prop": "status",
                    "label": "状态",
                    "width": "120",
                    "sortable": true
                }];
        },


        //获取用户列表
        getUsers() {
            let para = {
                page: this.page,
                name: this.filters.name
            };
            this.listLoading = true;
            getUnitList(para).then((res) => {
                this.total = res.data.total;
                this.dataList = res.data.dataList;
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
                    this.getUsers();
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
                            this.getUsers();
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
                            this.getUsers();
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
                    this.getUsers();
                });
            }).catch(() => {

            });
        }
    },
    mounted() {
        this.getUsers();
        this.getColumnsConfig();
    }
}


