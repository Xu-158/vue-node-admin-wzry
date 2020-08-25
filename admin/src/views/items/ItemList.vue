<template>
  <div>
    <h2>物品列表</h2>
    <el-table :data="tableData">
      <el-table-column prop="_id" label="id" width="400"></el-table-column>
      <el-table-column prop="name" label="物品名称"></el-table-column>
      <el-table-column prop="icon" label="图标">
        <template slot-scope="scope">
          <img :src="scope.row.icon" alt height="50px" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="goEdit(scope.row._id)" type="primary" size="small">编辑</el-button>
          <el-button @click="toDelete(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="itemTotal"
        :page-size="pageSize"
        :current-page="page"
        @current-change="pageChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getItem, deleteItem } from "@/api/items";
export default {
  data() {
    return {
      tableData: [],
      page: 1,
      pageSize: 5,
      itemTotal: 1, // 装备总数量
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      const { page, pageSize } = this;
      const res = await getItem({ page, pageSize });
      this.tableData = res.data.itemList;
      this.itemTotal = res.data.itemTotal;
    },

    goEdit(id) {
      this.$router.push(`/items/itemUpdate/${id}`);
    },

    toDelete(row) {
      const { page, tableData } = this;
      this.$confirm(`此操作将永久删除 "${row.name}", 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await deleteItem({ id: row._id });
          if (res.statusCode === 0) {
            this.$message.success(`${res.msg}`);
            // 如果当前不是第一页且当前页只有一条数据
            if (page != 1 && tableData.length == 1) {
              this.page--;
            }
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

    // 页数改变
    pageChange(currentPage) {
      this.page = currentPage;
      this.initData();
    },
  },
};
</script>

<style scoped>
.row-button {
  display: flex;
}
</style>