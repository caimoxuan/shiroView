<template>
  <div>
    <div class="handle-box">
      <el-select v-model="s_roleId"  placeholder="选择角色" class="handle-input mr10" @change="handleRoleChange">
        <el-option v-for="item in roleData" :key="item.roleId" :label="item.roleName" :value="item.roleId"></el-option>
      </el-select>
    </div>
    <el-transfer v-model = "selectData" :data="data" :titles="titles">
    </el-transfer>
    <div class="handle-footer">
      <el-button type="success" @click="changeRole">保存修改</el-button>
    </div>
  </div>
</template>

<script>
    import ElTransfer from "element-ui/packages/transfer/src/main";
    import ElOption from "element-ui/packages/select/src/option";
    export default {
      data() {
        return {
          titles: ['可设置', '已拥有'],
          roleData: [],
          selectData: [],
          menus: [],
          s_roleId:''
        }
      },
      created() {
        this.getRoleData();
      },
      computed: {
        data() {
          return this.menus;
        }
      },
      methods: {
        getRoleData () {
          let self = this;
          self.$http.post("/role-manager", {pageSize:2000}).then(function(res){
            const roles = res.data.items;
            if(roles){
              self.roleData = roles;
            }else{
              self.$message.error("获取角色信息失败");
            }
          }).catch(function(err){
            console.log(err);
          });
          self.$http.post("/menu-manager", {pageSize:2000}).then(function(res){
            const menus = res.data.items;
            if(menus){
              for(let i = 0; i < menus.length; i++){
                self.menus.push({
                  key: menus[i].menuCode,
                  label: menus[i].menuName
                })
              }
            }else{
              self.$message.error("获取菜单信息失败");
            }
          }).catch(function(err){

          });
        },
        changeRole() {
          if(!this.s_roleId){
            this.$message("请先选择角色!");
            return;
          }
          const self = this;
          self.$confirm("确认修改角色的菜单?", {
            type: "waring"
          }).then(() => {
            self.$http.post("/role-manager/modifyRoleMenu",{roleId: self.s_roleId, menuCodes: self.selectData.toString()}).then(function(res){
              if(res.data.success){
                self.$message("修改成功");
              }else{
                self.$message.error(res.data.message);
              }
            }).catch(function(err){
              console.log(err);
            })
          }).catch(() =>{
            console.log("取消修改角色菜单");
          })
        },
        handleRoleChange (val) {
          let self = this;
          self.selectData = [];
          self.$http.post("/role-manager/queryRoleMenu", {roleId: val}).then(function(res){
            console.log(res);
            const rolesMenu = res.data.items;
            if(rolesMenu) {
              for (let i = 0; i < rolesMenu.length; i++) {
                for(var index in self.menus){
                  if(self.menus[index].key === rolesMenu[i].menuCode){
                    self.selectData.push(rolesMenu[i].menuCode);
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
      components: {
        ElOption,
        ElTransfer}
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
