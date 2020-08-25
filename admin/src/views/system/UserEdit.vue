<template>
  <div>
    <h2 class="title">{{id?'编辑':'新建'}}管理员</h2>
    <el-form label-width="80px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="text" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addUser, updateUser, initUserInfo } from "@/api/user";
export default {
  props: {
    id: { type: String },
  },
  data() {
    return {
      model: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async save() {
      let res, message;
      const { username, password } = this.model;
      const id = this.id;
      if (id) {
        // 更新
        res = await updateUser({ id, username, password });
        message = "修改";
      } else {
        // 新增
        res = await addUser({ username, password });
        message = "添加";
      }
      if (res.statusCode === 0) {
        this.$message.success(`${res.msg}`);
        this.$router.push("/system/userList");
      } else {
        this.$message.error(`${res.msg}!`);
      }
    },

    async getInfo(id) {
      const res = await initUserInfo({ id });
      this.model = res.data;
    },
  },
  created() {
    this.id && this.getInfo(this.id);
  },
};
</script>

<style scoped>
.title {
  text-align: center;
}
</style>