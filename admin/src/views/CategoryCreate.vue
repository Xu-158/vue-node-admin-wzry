<template>
  <div>
    <h2 class="title">{{id?'编辑':'新建'}}分类</h2>
    <el-form label-width="80px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option
            v-for="item in parentOptions"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: String }
    // id2: { type: String }动态路由传参
  },
  data() {
    return {
      model: {},
      parentOptions: []
    };
  },
  methods: {
    async save() {
      let res, message;
      if (this.id) {
        // 更新
        res = await this.$http.put(`/rest/categories/${this.id}`, this.model);
        message = "修改";
      } else {
        // 新增
        res = await this.$http.post("/rest/categories", this.model);
        message = "添加";
      }
      if (res.data) {
        this.$message({
          message: `${message}成功！`,
          type: "success"
        });
        this.$router.push("/categories/list");
      } else {
        this.$message.error(`${message}错误!`);
      }
      console.log(res.data);
    },

    async getInfo(id) {
      const res = await this.$http.get(`/rest/categories/${id}`);
      this.model = res.data;
    },

    async getParentOption() {
      const res = await this.$http.get(`/rest/categories`);
      this.parentOptions = res.data;
    }
  },
  created() {
    // this.id2 = this.$route.params.id;动态路由传参
    this.id && this.getInfo(this.id);
    this.getParentOption();
  }
};
</script>

<style scoped>
.title {
  text-align: center;
}
</style>