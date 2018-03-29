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
      <el-input v-model="selectWord" placeholder="筛选关键词" class="handle-input mr10"></el-input>
      <el-button type="primary" icon="search" @click="search">搜索</el-button>
    </div>
    <el-table :data="routeList" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="routeId" label="招募序号" sortable width="100">
      </el-table-column>
      <el-table-column prop="routeName" label="线路名称" width="150">
      </el-table-column>
      <el-table-column prop="originName" label="起点站" width="120">
      </el-table-column>
      <el-table-column prop="terminalName" label="终点站" width="120">
      </el-table-column>
      <el-table-column prop="price" label="票价" width="120">
      </el-table-column>
      <el-table-column prop="reverseRouteId" label="反向编号" >
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="small"
                     @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger"
                     @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <RecruitCheckModal v-bind:rowData="editRow"></RecruitCheckModal>
  </div>
</template>

<script>
  import RecruitCheckModal from './recruit-check-modal'
    export default {
      data () {
        return {
          routeList: [],
          selectWord:'',
          editRow: {},
          multipleSelection: [],
          collectionName:'recruit_test_0328'
        }
      },
      created () {
        this.getData();
      },
      methods: {
        getData () {
          let self = this;
          self.$http.get('http://localhost:8899/mongoRoute/getMongoRoute', {params:{collectionName: self.collectionName}}).then(function (res) {
            self.routeList = res.data;
          }).catch(function (err) {
            self.$message.error("获取线路数据失败");
            console.log(err);
          })
        },
        search () {
          console.log("search");
        },
        delAll () {
          console.log(this.multipleSelection);
        },
        handleSelectionChange (val) {
          this.multipleSelection = val;
        },
        handleEdit (index, row) {
          this.editRow = row;
          $("#editBox").modal();
        },
        handleDelete (index, row) {
          console.log(index);
        }
      },
      components: {
        RecruitCheckModal
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
