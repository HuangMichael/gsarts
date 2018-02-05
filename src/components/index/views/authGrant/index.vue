<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="姓名"></el-input>
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
        <el-table :data="roles" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
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
        <el-dialog title="系统授权" v-model="editFormVisible" :close-on-click-modal="false">
            <el-col :span="24">
                <template>
                    <el-transfer v-model="value1" :data="data" :titles="['未授权限', '已授权限']"></el-transfer>
                </template>
            </el-col>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
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