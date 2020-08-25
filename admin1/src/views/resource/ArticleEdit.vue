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
import {
  getArticleTwo,
  saveArticle,
  updateArticle,
  uploadEditorFile,
  initArticleInfo,
} from "@/api/resource";
export default {
  components: { VueEditor },
  props: {
    id: { type: String },
  },
  data() {
    return {
      model: {
        categories: [],
      },
      categories: [],
    };
  },
  methods: {
    async save() {
      let res, message;
      const { id, model } = this;
      if (this.id) {
        // 更新
        res = await updateArticle({ id, model });
        message = "修改";
      } else {
        // 新增
        res = await saveArticle({ model });
        message = "添加";
      }
      if (res.statusCode === 0) {
        // 如果当前不是第一页且当前页只有一条数据
        if (page != 1 && articleList.length == 1) {
          this.page = page - 1;
        }
        this.$message.success(`${res.msg}`);
        this.$router.push("/resource/articleList");
      } else {
        this.$message.error(`${res.msg}错误!`);
      }
    },

    async getInfo(id) {
      const res = await initArticleInfo({ id });
      this.model = res.data;
    },

    async getCategoriesOption() {
      const res = await getArticleTwo();
      this.categories = res.data;
    },

    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadEditorFile(formData);
      Editor.insertEmbed(cursorLocation, "image", result.data.url);
      resetUploader();
    },
  },
  created() {
    this.id && this.getInfo(this.id);
    this.getCategoriesOption();
  },
};
</script>

<style scoped>
.title {
  text-align: center;
}
</style>