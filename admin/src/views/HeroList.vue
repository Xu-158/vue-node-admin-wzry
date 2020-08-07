<template>
  <div>
    <el-table :data="tableData">
      <el-table-column prop="_id" label="id" width="400"></el-table-column>
      <el-table-column prop="name" label="英雄名称"></el-table-column>
      <el-table-column prop="avatar" label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt="" height="50px">
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
      const res = await this.$http.get("/rest/heroes");
      this.tableData = res.data;
    },

    goEdit(id) {
      this.$router.push(`/heroes/edit/${id}`);
    },

    toDelete(row) {
      this.$confirm(`此操作将永久删除 "${row.name}", 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const result = await this.$http.delete(`/rest/heroes/${row._id}`);
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