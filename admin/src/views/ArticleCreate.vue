<template>
  <div>
    <h2 class="title">{{id?'编辑':'新建'}}文章</h2>
    <el-form label-width="80px" @submit.native.prevent="save">
      <el-form-item label="文章类型">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <vue-editor v-model="model.content" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  components: { VueEditor },
  props: {
    id: { type: String }
  },
  data() {
    return {
      model: {
        categories: []
      },
      categories: []
    };
  },
  methods: {
    async save() {
      let res, message;
      if (this.id) {
        // 更新
        res = await this.$http.put(`/rest/articles/${this.id}`, this.model);
        message = "修改";
      } else {
        // 新增
        res = await this.$http.post("/rest/articles", this.model);
        message = "添加";
      }
      if (res.data) {
        this.$message({
          message: `${message}成功！`,
          type: "success"
        });
        this.$router.push("/articles/list");
      } else {
        this.$message.error(`${message}错误!`);
      }
      console.log(res.data);
    },

    async getInfo(id) {
      const res = await this.$http.get(`/rest/articles/${id}`);
      this.model = res.data;
    },

    async getCategoriesOption() {
      const res = await this.$http.get(`/rest/categories`);
      this.categories = res.data;
    },

    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const result = await this.$http.post("/upload", formData);
      Editor.insertEmbed(cursorLocation, "image", result.data.url);
      resetUploader();
    }
  },
  created() {
    this.id && this.getInfo(this.id);
    this.getCategoriesOption();
  }
};
</script>

<style scoped>
.title {
  text-align: center;
}
</style>