<template>
  <div>
    <h2 class="title">{{id?'编辑':'新建'}}英雄</h2>
    <el-form label-width="80px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>

      <el-form-item label="头像">
      <el-upload
        class="avatar-uploader"
        :action="$http.defaults.baseURL + '/upload'"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
      >
        <img v-if="model.avatar" :src="model.avatar" class="avatar" />
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
export default {
  props: {
    id: { type: String }
  },
  data() {
    return {
      model: {
        name:'',
        avatar:''
      },
    };
  },
  methods: {
    async save() {
      let res, message;
      if (this.id) {
        // 更新
        res = await this.$http.put(`/rest/heroes/${this.id}`, this.model);
        message = "修改";
      } else {
        // 新增
        res = await this.$http.post("/rest/heroes", this.model);
        message = "添加";
      }
      if (res.data) {
        this.$message({
          message: `${message}成功！`,
          type: "success"
        });
        this.$router.push("/heroes/list");
      } else {
        this.$message.error(`${message}错误!`);
      }
      console.log(res.data);
    },

    async getInfo(id) {
      const res = await this.$http.get(`/rest/heroes/${id}`);
      this.model = res.data;
    },

    handleAvatarSuccess(res) {
      // this.$set(this.model,'icon',res.url)
      this.model.avatar = res.url
    },
  },
  created() {
    this.id && this.getInfo(this.id);
  }
};
</script>

<style>
.title {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #575757;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 30px;
  color: #050505;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>