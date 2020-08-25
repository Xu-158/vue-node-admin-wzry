<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-openeds="list" unique-opened :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>装备管理
          </template>
          <el-menu-item-group>
            <template slot="title">装备</template>
            <el-menu-item index="/items/itemAdd">新建装备</el-menu-item>
            <el-menu-item index="/items/itemList">装备列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-message"></i>英雄管理
          </template>
          <el-menu-item-group>
            <template slot="title">英雄</template>
            <el-menu-item index="/hero/heroAdd">新建英雄</el-menu-item>
            <el-menu-item index="/hero/heroList">英雄列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-message"></i>文章管理
          </template>
          <el-menu-item-group>
            <template slot="title">文章</template>
            <el-menu-item index="/resource/articleAdd">新建文章</el-menu-item>
            <el-menu-item index="/resource/articleList">文章列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-message"></i>运营管理
          </template>
          <el-menu-item-group>
            <template slot="title">广告位</template>
            <el-menu-item index="/system/adsAdd">新建广告位</el-menu-item>
            <el-menu-item index="/system/adsList">广告位列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-message"></i>分类管理
          </template>
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/system/cateAdd">新建分类</el-menu-item>
            <el-menu-item index="/system/cateList">分类列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-message"></i>系统设置
          </template>
          <el-menu-item-group>
            <template slot="title">管理员</template>
            <el-menu-item index="/system/userAdd">新建管理员</el-menu-item>
            <el-menu-item index="/system/userList">管理员列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <span style="margin-right: 15px">{{username}}</span>
        <el-dropdown @command="handleCommand">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="homepage">首页</el-dropdown-item>
            <el-dropdown-item :divided="true" command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      list: ["0"],
      username: "",
    };
  },
  beforeMount() {
    this.username = localStorage.username;
  },

  methods: {
    handleCommand(command) {
      switch (command) {
        case "homepage":
          this.$router.push("/home");
          break;
        case "logout":
          localStorage.removeItem("token");
          this.$router.push("/login");
          break;

        default:
          break;
      }
    },
  },
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>