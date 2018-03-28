<template>
  <div class="table">
    <el-tabs type="border-card">
      <el-tab-pane label="用户管理">用户管理</el-tab-pane>
      <el-tab-pane label="用户角色">
        <div class="handle-box">
          <el-input v-model="s_userName" placeholder="查询用户" class="handle-input mr10"></el-input>
          <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <el-transfer v-model = "selectData" :data="data" :titles="titles">
        </el-transfer>
        <div class="handle-footer">
          <el-button type="success" @click="changeRole">保存修改</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
    import ElTransfer from "element-ui/packages/transfer/src/main";
    export default {
      data() {
        return {
          titles: ['可设置', '已拥有'],
          roleData: [],
          selectData: [],
          s_userName:''
        }
      },
      created() {
        this.getRoleData();
      },
      computed: {
        data() {
          return this.roleData;
        }
      },
      methods: {
        getRoleData () {
          let self = this;
          self.$http.post("/role-manager", {pageSize:2000}).then(function(res){
            const roles = res.data.items;
            for(let i = 0; i < roles.length; i++){
              self.roleData.push({
                key: roles[i].roleId,
                label: roles[i].roleName
              });
            }
          }).catch(function(err){
            console.log(err);
          })
        },
        changeRole() {
          if(!this.s_userName){
            this.$message("请先选择用户!");
            return;
          }
          const self = this;
          self.$confirm("确认修改用户权限角色?", {
            type: "waring"
          }).then(() => {
            self.$http.post("/user-manager/modifyUserRole",{userName: self.s_userName, roleIds: self.selectData.toString()}).then(function(res){
              if(res.data.success){
                self.$message("修改成功");
              }else{
                self.$message.error(res.data.message);
              }
            }).catch(function(err){
              console.log(err);
            })
          }).catch(() =>{
            console.log("取消修改用户角色");
          })
        },
        search () {
          let self = this;
          self.selectData = [];
          self.$http.post("/user-manager/findUserRole", {userName: self.s_userName}).then(function(res){
            console.log(res);
            const usersRole = res.data.items;
            if(usersRole) {
              for (let i = 0; i < usersRole.length; i++) {
                for(var index in self.roleData){
                  if(self.roleData[index].key === usersRole[i].roleId){
                    self.selectData.push(usersRole[i].roleId);
                  }
                }
              }
            }else{
              self.$message.error(res.data.message);
            }
          }).catch(function(err){
            console.log(err);
            self.$message.error("获取用户角色信息失败!");
          })
        }
      },
      components: {ElTransfer}
    }
</script>

<style scoped>
  .handle-box{
    margin-bottom: 20px;
  }
  .handle-input{
    width: 300px;
    display: inline-block;
  }
  .handle-footer {
    margin-top: 10px;
  }
</style>
