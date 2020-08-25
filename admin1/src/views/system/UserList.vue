<template>
  <div>
    <h2>管理员列表</h2>
    <el-table :data="tableData">
      <el-table-column prop="_id" label="id" width="400"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
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
import { getUser, deleteUser } from "@/api/user";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      const res = await getUser();
      this.tableData = res.data;
    },

    goEdit(id) {
      this.$router.push(`/system/userUpdate/${id}`);
    },

    toDelete(row) {
      this.$confirm(`此操作将永久删除 "${row.username}", 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const result = await deleteUser({ id: row._id });
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
  },
};
</script>

<style scoped>
.row-button {
  display: flex;
}
</style>