<template>
  <div>
    <h2 class="title">{{id?'编辑':'新建'}}分类</h2>
    <el-form label-width="80px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option label="无上级分类" value :disabled="id && !editFlag"></el-option>
          <el-option
            v-for="item in parentOptions"
            :key="item._id"
            :label="item.name"
            :value="item._id"
            :disabled="id && editFlag"
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
import { saveCate, updateCate, initCateOne, initCateItem } from "@/api/system";
export default {
  props: {
    id: { type: String },
    // id2: { type: String }动态路由传参
  },
  data() {
    return {
      model: {
        name: "",
        parent: "",
      },
      editFlag: true,
      parentOptions: [],
    };
  },
  methods: {
    async save() {
      let res, message;
      const { model, id } = this;
      if (this.id) {
        // 更新
        res = await updateCate({ id, model });
        message = "修改";
      } else {
        // 新增
        res = await saveCate(model);
        message = "添加";
      }
      if (res.statusCode === 0) {
        this.$message.success(`${res.msg}`);
        this.$router.push("/system/CateList");
      } else {
        this.$message.error(`${res.msg}错误!`);
      }
    },

    async getInfo(id) {
      const res = await initCateItem({ id });
      this.model = res.data;
    },

    async getParentOption() {
      const res = await initCateOne();
      this.parentOptions = res.data;
      this.editFlag = res.data.parent ? false : true;
    },
  },
  mounted() {
    // this.id2 = this.$route.params.id;动态路由传参
    this.id && this.getInfo(this.id);
    this.getParentOption();
  },
};
</script>

<style scoped>
.title {
  text-align: center;
}
</style>