<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-menu"></i> 菜单</el-breadcrumb-item>
        <el-breadcrumb-item>页面菜单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="handle-box">
      <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
      <el-select v-model="select_cate" placeholder="筛选菜单" class="handle-select mr10">
        <el-option key="1" label="主菜单" value="主菜单"></el-option>
        <el-option key="2" label="子菜单" value="字菜单"></el-option>
      </el-select>
      <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
      <el-button type="primary" icon="search" @click="search">搜索</el-button>
      <el-button type="primary" icon="add" class="handle-add mr10" @click="addMenu">新增菜单</el-button>
    </div>
    <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="menuName" label="菜单名称" sortable width="150">
      </el-table-column>
      <el-table-column prop="menuCode" label="菜单编号" width="120">
      </el-table-column>
      <el-table-column prop="parentMenuCode" label="上级菜单编号" width="130">
      </el-table-column>
      <el-table-column prop="menuUrl" label="链接地址" width="120">
      </el-table-column>
      <el-table-column prop="menuIcon" label="菜单图标" width="120">
      </el-table-column>
      <el-table-column prop="sequence" label="排序" >
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
    <NormalModal v-bind:initData="edit_row" v-bind:m_title="modal_table_title" v-bind:m_modalUrl="urlModal"></NormalModal>
  </div>
</template>

<script>
    import NormalPagination from '../../tool/pagination/normal-pagination'
    import NormalModal from './menu-manager-modal'
    export default {
      data() {
        return {
          totalCount: 0,
          url: '/menu-manager',
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
          editUrl: '/menu-manager/modifyMenu',
          addUrl: '/menu-manager/addMenu'
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
          this.modal_table_title = '编辑菜单';
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
            idList.push(row.id);
            self.$http.post('/menu-manager/delMenu', {ids: idList.toString()}).then(function(res) {
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
          this.modal_table_title = '添加菜单';
          this.edit_row = {menuType: 'HTML_MENU'};
          this.urlModal = this.addUrl;
          $("#editBox").modal();
        },
        delAll(){
          const self = this,
            length = self.multipleSelection.length;
          if(length < 1){
            self.$message("未选择任何条例");
            return;
          }
          var delList = new Array();
          self.del_list = self.del_list.concat(self.multipleSelection);
          for (let i = 0; i < length; i++) {
            delList.push(self.multipleSelection[i].id);
          }

          self.$confirm("确认删除下列条例：" + delList, "提示", {
            type: 'warning'
          }).then(()=> {
            self.$http.post('/menu-manager/delMenu', {ids:delList.toString()}).then(function(res){
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
        search () {
          this.is_search = true;
        }
      },
      components: {
        NormalPagination,
        NormalModal
      }
    }
</script>

<style scoped>
  .handle-box{
    margin-bottom: 20px;
  }
  .handle-select{
    width: 120px;
  }
  .handle-input{
    width: 300px;
    display: inline-block;
  }
</style>
