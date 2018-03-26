<template>
  <div class="table">
    <el-tabs type="border-card">
      <el-tab-pane label="角色管理">
        <div class="handle-box">
          <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
          <el-button type="primary" icon="add" class="handle-add mr10" @click="addMenu">添加角色</el-button>
        </div>
        <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="roleName" label="角色名称">
          </el-table-column>
          <el-table-column prop="roleCode" label="角色编码" sortable>
          </el-table-column>
          <el-table-column prop="description" label="详细描述">
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="small"
                         @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="small" type="danger"
                         @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <NormalPagination v-bind:count="totalCount" v-on:handleCurrentChangeVal="handlerCurrentPageChange" v-on:handleSizeChangeVal="handlerPageSizeChange"></NormalPagination>
        <NormalModal v-bind:initData="edit_row" v-bind:m_title="modal_table_title" v-bind:m_modalUrl="urlModal" @reload="reloadTable"></NormalModal>
      </el-tab-pane>
      <el-tab-pane label="角色菜单">
        <RoleMenuTransfer></RoleMenuTransfer>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
    import NormalPagination from '../../tool/pagination/normal-pagination'
    import NormalModal from './role-manager-modal'
    import RoleMenuTransfer from './role-menu-transfer'
    export default {
      data() {
        return {
          totalCount: 0,
          url: '/role-manager',
          currentPage: 1,
          currentPageSize: 10,
          tableData: [],
          multipleSelection: [],
          select_cate: '',
          select_word: '',
          del_list: [],
          is_search: false,
          modal_table_title: '',
          edit_row:{},
          urlModal:'',
          editUrl: '/role-manager/modifyRole',
          addUrl: '/role-manager/addRole'
        }
      },
      created() {
        this.getTableData();
      },
      computed: {
        data() {
          return this.tableData;
        }
      },
      methods: {
        getTableData () {
            const self = this;
            self.$http.post(self.url, {
                pageSize: self.currentPageSize,
                startPage: self.currentPage
            }).then(function(res){
              self.tableData = res.data.items;
              self.totalCount = res.data.totalCount;
              console.log(self.tableData);
            }).catch(function(err){
                console.log(err);
            })
        },
        handlerCurrentPageChange: function(data) {
          this.currentPage = data;
          this.getTableData();
        },
        handlerPageSizeChange: function(data) {
          this.currentPageSize = data;
          this.getTableData();
        },
        handleEdit(index, row) {
          this.modal_table_title = '编辑角色';
          this.edit_row = row;
          this.urlModal = this.editUrl;
          $("#editBox").modal();
        },
        handleDelete(index, row) {
          let self = this;
          self.$confirm("确认删除第" + index + "条数据?", "提示", {
            type: 'warning'
          }).then(() => {
            var idList = new Array();
            idList.push(row.roleId);
            self.$http.post('/role-manager/delRole', {ids: idList.toString()}).then(function(res) {
              if(res.data.success){
                self.$message("删除成功");
                self.getTableData();
              }
            }).catch(function(err){
              console.log(err);
              self.$message("删除未成功， 请稍后再试");
            });
          }).catch(() => {
            console.log("取消删除数据id:" + row.id);
          })
        },
        addMenu () {
          this.modal_table_title = '添加角色';
          this.edit_row = {};
          this.urlModal = this.addUrl;
          $("#editBox").modal();
        },
        delAll(){
          const self = this, length = self.multipleSelection.length;
          if(length < 1){
            self.$message("未选择任何条例");
            return;
          }
          var delList = new Array();
          self.del_list = self.del_list.concat(self.multipleSelection);
          for (let i = 0; i < length; i++) {
            delList.push(self.multipleSelection[i].roleId);
          }

          self.$confirm("确认删除下列条例：" + delList, "提示", {
            type: 'warning'
          }).then(()=> {
            self.$http.post('/role-manager/delRole', {ids:delList.toString()}).then(function(res){
              console.log(res);
              self.getTableData();
            }).catch(function(err){
              console.log(err);
              self.$message("删除不成功，请稍后再试");
            });
          }).catch(() => {
            self.$refs.multipleTable.clearSelection();
            console.log("取消删除");
          })
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        reloadTable () {
          this.getTableData();
        },
        search () {
          this.is_search = true;
        }
      },
      components: {
        NormalPagination,
        NormalModal,
        RoleMenuTransfer
      }
    }
</script>

<style scoped>
  .handle-box{
    margin-bottom: 20px;
  }
</style>
