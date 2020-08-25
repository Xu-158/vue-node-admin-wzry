<template>
  <div>
    <h2 class="title">{{id?'编辑':'新建'}}广告位</h2>
    <el-form label-width="80px" @submit.native.prevent="save">
      <el-form-item label="广告位名称" label-width="120px">
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
              :action="uploadUrl"
              :show-file-list="false"
              :headers="uploadHeaders"
              :on-success="uploadAds"
            >
              <div @click="changeIndex(index)" class="banner">
                <img v-if="item.image" :src="item.image" class="banner-img" />
                <i v-else class="el-icon-plus banner-uploader-icon"></i>
              </div>
            </el-upload>
          </el-form-item>

          <el-form-item>
            <el-button type="danger" size="small" @click="toDelete(index)">删除</el-button>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" style="flex-wrap:wrap">
        <el-form-item>
          <el-button style type="success" @click="addAd">
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
import { saveAds, updateAds, initAdsInfo } from "@/api/system";
import mixins_upload from "@/assets/javascript/mixins_upload";
export default {
  props: {
    id: { type: String },
  },
  mixins: [mixins_upload],
  data() {
    return {
      model: {
        name: "",
        items: [],
      },
      uploadAdsIndex: 0,
    };
  },
  watch: {
    $route() {
      if (this.id) {
        this.getInfo();
      } else {
        this.model.name = "";
        this.model.items = [];
      }
    },
  },
  methods: {
    async save() {
      let res, message;
      const { name, items } = this.model;
      const id = this.id;
      if (this.id) {
        // 更新
        res = await updateAds({ id, name, items });
        message = "修改";
      } else {
        // 新增
        res = await saveAds(this.model);
        message = "添加";
      }
      if (res.statusCode === 0) {
        this.$message.success(`${res.msg}`);
        this.$router.push("/system/adsList");
      } else {
        this.$message.error(`${res.msg}错误!`);
      }
    },

    toDelete(index) {
      this.$confirm(`此操作将永久删除, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        this.$message({
          message: `删除成功！`,
          type: "success",
        });
        this.model.items.splice(index, 1);
      });
    },

    async getInfo(id) {
      const res = await initAdsInfo({ id: id });
      if (!res.data.items && res.data.items.length == 0) {
        this.model.items = [];
      }
      this.model = res.data;
    },

    // 添加一个广告项
    addAd() {
      this.model.items.push({
        image: "",
        url: "",
      });
    },

    uploadAds(res) {
      this.$set(this.model.items[this.uploadAdsIndex], "image", res.data.url);
    },
    changeIndex(index) {
      this.uploadAdsIndex = index;
    },
  },
  mounted() {
    this.id && this.getInfo(this.id);
  },
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
.banner {
  min-width: 100px;
  min-height: 100px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.banner-img {
  width: 100%;
  height: 100%;
  line-height: 0px;
}
</style>