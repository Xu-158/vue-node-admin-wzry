<template>
  <div>
    <h2>英雄列表</h2>
    <el-table :data="tableData">
      <el-table-column prop="_id" label="id" width="400"></el-table-column>
      <el-table-column prop="name" label="英雄名称"></el-table-column>
      <el-table-column prop="title" label="英雄称号"></el-table-column>
      <el-table-column prop="avatar" label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt height="50px" />
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
        :total="heroTotal"
        :page-size="pageSize"
        :current-page="page"
        @current-change="pageChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { deleteHero, getHero } from "@/api/hero";
export default {
  data() {
    return {
      tableData: [],
      page: 1,
      pageSize: 5,
      heroTotal: 1, // 装备总数量
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      const { page, pageSize } = this;
      const res = await getHero({ page, pageSize });
      this.tableData = res.data.heroList;
      this.heroTotal = res.data.heroTotal;
    },

    goEdit(id) {
      this.$router.push(`/hero/heroUpdate/${id}`);
    },

    toDelete(row) {
      this.$confirm(`此操作将永久删除 "${row.name}", 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const result = await deleteHero({ id: row._id });
          if (result.data) {
            this.$message({
              message: `删除成功！`,
              type: "success",
            });
            // 如果当前不是第一页且当前页只有一条数据
            if (page != 1 && heroList.length == 1) {
              this.page = page - 1;
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
      console.log(window.location.href);
      console.log(this.$route.path);
      console.log(this.$route.params);
    },
  },
};
</script>

<style scoped>
.row-button {
  display: flex;
}
</style>