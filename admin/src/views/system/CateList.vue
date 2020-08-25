<template>
  <div class="cateList">
    <div class="title">
      <h2>分类列表</h2>
      <div class="back">
        <el-button type="danger" @click="initData" v-if="showBackBtn" size="big">返回上级</el-button>
      </div>
    </div>

    <el-table :data="tableData">
      <el-table-column prop="_id" label="id" width="400"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column label="查看">
        <template slot-scope="scope">
          <el-button
            size="mini"
            :disabled="scope.row.level==='二级'"
            @click="initTwo(scope.row._id)"
          >查看下级</el-button>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="goEdit(scope.row._id)" type="primary" size="small">编辑</el-button>
          <el-button @click="toDelete(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { initCateOne, initCateTwo, deleteCate } from "@/api/system";
export default {
  data() {
    return {
      tableData: [],
      levelOneId: "",
    };
  },
  created() {
    this.initData();
  },
  computed: {
    showBackBtn() {
      return this.tableData.every((item) => item.level === "二级");
    },
  },
  methods: {
    async initData() {
      const res = await initCateOne();
      this.handleLevel(res.data);
    },

    async initTwo(id) {
      this.levelOneId = id;
      let res = await initCateTwo({ id });
      this.handleLevel(res.data);
    },

    goEdit(id) {
      this.$router.push(`/system/cateUpdate/${id}`);
    },

    toDelete(row) {
      this.$confirm(`此操作将永久删除 "${row.name}", 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const result = await deleteCate({ id: row._id });
          if (result.data) {
            this.$message({
              message: `删除成功！`,
              type: "success",
            });
            this.initData();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 对返回的分类数据处理
    handleLevel(data) {
      data.forEach((item, index) => {
        if (item.parent) {
          item.level = "二级";
        } else {
          item.level = "一级";
        }
        item.number = index + 1;
      });
      this.tableData = data;
    },
  },
};
</script>

<style scoped>
.row-button {
  display: flex;
}
.cateList .title {
  display: flex;
  line-height: 5vh;
  justify-content: space-between;
  align-items: center;
}
</style>