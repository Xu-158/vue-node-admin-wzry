<template>
  <div>
    <h2 class="title">{{id?'编辑':'新建'}}广告位</h2>
    <el-form label-width="80px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>

      <el-row type="flex" style="flex-wrap:wrap">
        <el-col :md="10" v-for="(item,index) in model.items" :key="index" class="items-item">
          <el-form-item label="Link-Url">
            <el-input v-model="item.url"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="res => $set(item,'image',res.url)"
            >
              <img v-if="item.image" :src="item.image" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item>
            <el-button type="danger" size="small" @click="toDelete(index)">删除</el-button>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" style="flex-wrap:wrap">
        <el-form-item>
          <el-button style type="success" @click="model.items.push({})">
            <i class="el-icon-plus" style="color:white;padding-right:0.5rem"></i>添加广告
          </el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
      </el-row>
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
        items: []
      }
    };
  },
  methods: {
    async save() {
      let res, message;
      if (this.id) {
        // 更新
        res = await this.$http.put(`/rest/ads/${this.id}`, this.model);
        message = "修改";
      } else {
        // 新增
        res = await this.$http.post("/rest/ads", this.model);
        message = "添加";
      }
      if (res.data) {
        this.$message({
          message: `${message}成功！`,
          type: "success"
        });
        this.$router.push("/ads/list");
      } else {
        this.$message.error(`${message}错误!`);
      }
      console.log(res.data);
    },

    
    toDelete(index) {
      this.$confirm(
        `此操作将永久删除 "${this.model.items[index].name}", 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(async () => {
        this.$message({
          message: `删除成功！`,
          type: "success"
        });
        this.model.items.splice(index, 1);
      });
    },

    async getInfo(id) {
      const res = await this.$http.get(`/rest/ads/${id}`);
      this.model = res.data;
    }
  },
  created() {
    this.id && this.getInfo(this.id);
  }
};
</script>

<style scoped>
.title {
  text-align: center;
}
.save-button {
  margin-top: 1rem;
}
.items-item {
  padding: 1rem;
  border: 0.1px dashed grey;
  margin: 2rem;
}
</style>