<template>
  <div>
    <h2>文章列表</h2>
    <el-table :data="tableData">
      <el-table-column prop="_id" label="id" width="400"></el-table-column>
      <el-table-column prop="categoryName" label="文章类型"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
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
export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      const res = await this.$http.get("/rest/articles");
      this.tableData = res.data;

      this.tableData.map(obj => {
        const categoryName = [];
        obj.categories.map(category => {
          categoryName.push(category.name+" ")
        });
        this.$set(obj,'categoryName',categoryName)
      });
    },

    goEdit(id) {
      this.$router.push(`/articles/edit/${id}`);
    },

    toDelete(row) {
      this.$confirm(`此操作将永久删除 "${row.title}", 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const result = await this.$http.delete(`/rest/articles/${row._id}`);
          if (result.data) {
            this.$message({
              message: `删除成功！`,
              type: "success"
            });
            this.initData();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style scoped>
.row-button {
  display: flex;
}
</style>