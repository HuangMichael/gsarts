<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="机构名称"></el-input>
                </el-form-item>
                <template v-for="opt in operations">
                    <el-form-item>
                        <el-button icon="opt.icon" type="primary" v-on:click=applyMethod(opt.method)>{{opt.label}}
                        </el-button>
                    </el-form-item>
                </template>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="dataList" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <template v-for="config in columnsConfig">
                <el-table-column :type="config.type" :prop="config.prop" :min-width="config.width"
                                 :label="config.label">
                </el-table-column>
            </template>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="机构名称" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="上级机构" prop="parent">
                    <el-input v-model="editForm.parent" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input type="number" v-model="editForm.sortNo" :min="0" :max="200"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-switch v-model="editForm.status"  active-text="有效" inactive-text="无效"></el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="机构名称" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="上级机构" prop="parent">
                    <el-input v-model="addForm.parent" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input type="number" v-model="addForm.sortNo" :min="0" :max="200"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-switch v-model="addForm.status"  active-text="有效" inactive-text="无效"></el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import userJs from './index';
    export default userJs;

</script>

<style scoped>

</style>