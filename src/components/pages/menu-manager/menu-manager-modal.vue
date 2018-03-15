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
            <el-form-item label="菜单代码" prop="menuCode">
              <el-input v-model="initialData.menuCode"></el-input>
            </el-form-item>
            <el-form-item label="菜单名称" >
              <el-input v-model="initialData.menuName"></el-input>
            </el-form-item>
            <el-form-item label="菜单链接" >
              <el-input v-model="initialData.menuUrl"></el-input>
            </el-form-item>
            <el-form-item label="菜单图标" >
              <el-input v-model="initialData.menuIcon"></el-input>
            </el-form-item>
            <el-form-item label="上级编码" >
              <el-input v-model="initialData.parentMenuCode"></el-input>
            </el-form-item>
            <el-form-item label="菜单排序" >
              <el-input v-model="initialData.sequence"></el-input>
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
        title: '操作菜单',
        modalUrl:'',
        initialData:{
          id: '',
          menuUrl: '',
          menuCode: '',
          menuName: '',
          menuIcon: '',
          parentMenuCode: '',
          sequence: '',
          menuType: '1'
        },
        rules: {
          menuCode: [
            {required: true, message: '请输入菜单编码', trigger: 'blur'},
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
                self.$parent.getTableData();
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

