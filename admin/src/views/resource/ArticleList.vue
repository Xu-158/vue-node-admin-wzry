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
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="articleTotal"
        :page-size="pageSize"
        :current-page="page"
        @current-change="pageChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { initArticle, deleteArticle } from "@/api/resource";
export default {
  data() {
    return {
      tableData: [],
      page: 1,
      pageSize: 8,
      articleTotal: 1, // 总数量
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      const { page, pageSize } = this;
      const res = await initArticle({ page, pageSize });
      this.tableData = res.data.articleList;
      this.articleTotal = res.data.articleTotal;

      this.tableData.map((obj) => {
        const categoryName = [];
        obj.categoryInfo.map((category) => {
          categoryName.push(category.name + " ");
        });
        this.$set(obj, "categoryName", categoryName);
      });
    },

    goEdit(id) {
      this.$router.push(`/resource/articleUpdate/${id}`);
    },

    toDelete(row) {
      const { page, tableData } = this;
      this.$confirm(`此操作将永久删除 "${row.title}", 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await deleteArticle({ id: row._id });
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