/**
 * Created by huangbin on 2018/1/26.
 */

import util from 'common/js/util'
import axios  from 'axios'
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
                method: "getDataList()",
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
            this.getDataList();
        },


        formatStatus: function (row, column) {
            return row.status == "1" ? '有效' : row.status == '0' ? '无效' : '未知';
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
                }];
        },


        //获取用户列表
        getDataList() {
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

        },
        //显示编辑界面
        handleEdit: function (index, row) {

        },
        //显示新增界面
        handleAdd: function () {

        },
        //编辑
        editSubmit: function () {

        },
        //新增
        addSubmit: function () {

        },
        selsChange: function (sels) {

        },
        //批量删除
        batchRemove: function () {

        }
    },
    mounted() {
        this.getDataList();
        this.getColumnsConfig();
    }
}


