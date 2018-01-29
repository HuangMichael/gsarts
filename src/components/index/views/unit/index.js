/**
 * Created by huangbin on 2018/1/26.
 */
import util from 'common/js/util'
import findUserByParam from 'api/api';

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
                method: "getUnits()",
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
            }

        }
    },
    methods: {
        /**
         * 通过反射机制调用传入的参数对应的方法
         * @param m
         */
        applyMethod(m){
            eval("this." + m);
        },
        /**
         * 配置APP的数据列表配置
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


        //性别显示转换
        formatSex: function (row, column) {
            return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getUnits();
        },
        //获取用户列表
        getUnits() {
            let para = {
                page: this.page,
                name: this.filters.name
            };
            this.listLoading = true;
            findUserByParam(para).then((res) => {
                console.log("res.data--------------" + JSON.stringify(res.data));
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
                // removeUser(para).then((res) => {
                //     this.listLoading = false;
                //     //NProgress.done();
                //     this.$message({
                //         message: '删除成功',
                //         type: 'success'
                //     });
                //     this.getUnits();
                // });
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
                        // editUser(para).then((res) => {
                        //     this.editLoading = false;
                        //     //NProgress.done();
                        //     this.$message({
                        //         message: '提交成功',
                        //         type: 'success'
                        //     });
                        //     this.$refs['editForm'].resetFields();
                        //     this.editFormVisible = false;
                        //     this.getUnits();
                        // });
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
                        // addUser(para).then((res) => {
                        //     this.addLoading = false;
                        //     //NProgress.done();
                        //     this.$message({
                        //         message: '提交成功',
                        //         type: 'success'
                        //     });
                        //     this.$refs['addForm'].resetFields();
                        //     this.addFormVisible = false;
                        //     this.getUnits();
                        // });
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
                // batchRemoveUser(para).then((res) => {
                //     this.listLoading = false;
                //     //NProgress.done();
                //     this.$message({
                //         message: '删除成功',
                //         type: 'success'
                //     });
                //     this.getUnits();
                // });
            }).catch(() => {

            });
        }
    },
    mounted() {
        this.getColumnsConfig();
        this.getUnits();
    }
}


