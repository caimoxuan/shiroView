<template>
  <!-- 模态框（Modal） -->
  <div class="modal fade" id="editBox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
            &times;
          </button>
          <h4 class="modal-title" id="myModalLabel">{{title}}</h4>
        </div>
        <div class="modal-body">
          <el-form :model="initialData" :rules="rules" ref="modifyForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="角色代码(越小权限越高)" prop="roleCode">
              <el-input v-model="initialData.roleCode"></el-input>
            </el-form-item>
            <el-form-item label="角色名称" >
              <el-input v-model="initialData.roleName"></el-input>
            </el-form-item>
            <el-form-item label="角色说明" >
              <el-input v-model="initialData.description"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" v-on:click="save('modifyForm')">
            保存
          </button>
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: '操作角色',
        modalUrl:'',
        initialData:{
          roleId: '',
          roleName: '',
          description: '',
          roleCode: ''
        },
        rules: {
          roleCode: [
            {required: true, message: '请输入角色编码', trigger: 'blur'},
            {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    props: {
      initData: Object,
      m_title: String,
      m_modalUrl: String
    },
    methods: {
      save (formName) {
        this.$refs[formName].validate((valid) => {
          if(valid){
            let self = this;
            self.$http.post(self.modalUrl, self.initialData).then(function(res){
              if(res.data){
                $("#editBox").modal('hide');
                self.$emit('reload');
              }
            }).catch(function(err) {
              console.log(err);
              self.$message('添加失败， 请稍后重试');
            });
          }else{
            console.log("check fail !");
            return false;
          }
        })
      }
    },
    watch: {
      initData() {
        this.initialData = this.initData;
      },
      m_title () {
        this.title = this.m_title;
      },
      m_modalUrl () {
        this.modalUrl = this.m_modalUrl;
      }
    }
  }
</script>

<style scoped>

</style>

