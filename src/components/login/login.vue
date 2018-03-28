<template>
  <div>
    <div class="demo-1">
      <div class="content">
        <div id="large-header" class="large-header">
          <canvas id="demo-canvas"></canvas>
          <div class="logo_box">
            <form action="" name="f" method="post" id = "login_form">
              <div class="input_outer">
                <span class="u_user"></span>
                <input  v-model="ruleForm.username" class="text" style="color: #FFFFFF !important"  placeholder="请输入账户">
              </div>
              <div class="input_outer">
                <span class="us_uer"></span>
                <input v-model="ruleForm.password" class="text"  style="color: #FFFFFF !important; position:absolute; z-index:100;"value="" type="password" placeholder="请输入密码">
              </div>
              <div class="mb2"><input @click="submitForm()" class="act-but submit"  style="color: #FFFFFF"  value = "登陆"/></div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <NormalDialog :show.sync="show" v-bind:message="message"></NormalDialog>
  </div>
</template>

<script>
  import TweenLite from "../../../static/login/js/TweenLite.min.js"
  import Circ from "../../../static/login/js/EasePack.min"
  import("../../../static/login/js/rAF.js")
  import("../../../static/login/js/demo-1.js")
  import NormalDialog from '../tool/dialog/normal_dialog'
  export default{
    data: function() {
      return {
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            {require: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {require: true, message: '请输入密码', trigger: 'blur'}
          ]
        },
        show: false,
        message: ''
      }
    },
    methods: {
      submitForm() {
        const self = this;
        self.$http.post("/login", this.ruleForm).then(function(res){
          var result = res.data;
          console.log(result.data.userName);
          if(result){
            if(result.success){
              localStorage.setItem("userInfo", JSON.stringify(result.data));
              self.$store.commit("STORE_USER_INFO", {userInfo : result.data});
              self.$router.push("/menu");
            }else{
              self.$message(result.message);
            }
          }
        }).catch(function(err){
          self.$message.error('请求认证服务器未成功，请稍后再试');
          console.log(err);
        })
      }
    },
    components: {
      NormalDialog
    }
  }
</script>

<style>
  @import "../../../static/login/css/normalize.css";
  @import "../../../static/login/css/demo.css";
  @import "../../../static/login/css/component.css";
</style>
