<template>
  <div>
    <h2 class="title">{{id?'编辑':'新建'}}物品</h2>
    <el-form label-width="80px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>

      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :headers="uploadHeaders"
          :on-success="uploadSuccess"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { saveItem, updateItem, getItemInfo } from "@/api/items";
import mixins_upload from "@/assets/javascript/mixins_upload";
export default {
  props: {
    id: { type: String },
  },
  mixins: [mixins_upload],
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async save() {
      let res, message;
      const { name, icon } = this.model;
      const id = this.id;
      if (this.id) {
        // 更新
        res = await updateItem({ id, name, icon });
        message = "修改";
      } else {
        // 新增
        res = await saveItem({ name, icon });
        message = "添加";
      }
      if (res.statusCode === 0) {
        this.$message.success(`${res.msg}`);
        this.$router.push("/items/itemList");
      } else {
        this.$message.error(`${res.msg}错误!`);
      }
    },

    async getInfo(id) {
      const res = await getItemInfo({ id: this.id });
      this.model = res.data;
    },

    handleAvatarSuccess(res) {
      this.$set(this.model, "icon", res.url);
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