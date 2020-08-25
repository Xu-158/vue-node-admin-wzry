<template>
  <div class="login">
    <el-card header="请先登录" class="login-card">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item class="btn-row">
          <el-button type="primary" @click="submitForm" :loading="loading">登陆</el-button>
          <el-button type="primary" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { login } from "../api/user";

export default {
  name:"Login",
  data() {
    return {
      loading:false,
      ruleForm: {
        username: "admin",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    resetForm(){
      this.$refs.ruleForm.resetFields()
    },

    submitForm(){
      this.$refs.ruleForm.validate(valid => {
        if(valid){
          this.loginF()
        }
      })
    },

    async loginF() {
      const {username,password} = this.ruleForm
      this.loading = true
      const res = await login({username,password})
      this.loading = false
      if(res.statusCode == 1){
        this.$message.error(res.msg)
        return
      }
      localStorage.setItem('token',res.token)
      localStorage.setItem('username',res.data.username)

      this.$router.push('/home')
    },
  },
};
</script>

<style>
.login-card {
  width: 30%;
  margin: 10rem auto;
}
.btn-row{
  display: flex;
  justify-content: space-around;
}
</style>