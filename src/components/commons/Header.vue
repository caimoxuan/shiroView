<template>
    <div class="header">
        <div class="logo">招募管理系统</div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" v-bind:src="avatorurl">
                    {{username}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                name: 'cmx1111',
                avatar: require('../../../static/img/img.jpg')
            }
        },
        computed:{
            username() {
              let user = this.$store.getters.ApplicationUserInfo;
              let username = user ? user.userName : null;
              return username ? username : this.name;
            },
            avatorurl() {
              let user = this.$store.getters.ApplicationUserInfo;
              let avatarurl = user ? user.avatarUrl : null;
              return avatarurl ? avatarurl : this.avatar;
            }
        },
        methods:{
            handleCommand(command) {
                if(command == 'logout'){
                    let self = this;
                    self.$http.post("/logout").then(function(res){
                      console.log(res);
                      if(res){
                        localStorage.removeItem('userInfo');
                        self.$store.commit("CLEAR_USER_INFO");
                      }
                    }).catch(function(err){
                      console.log(err)
                      self.$message.error("登出出现异常，请直接关闭浏览器");
                    });
                    self.$router.push('/login');
                }
            }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
    }
    .header .logo{
        float: left;
        width:250px;
        text-align: center;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
