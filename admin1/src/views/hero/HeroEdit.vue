<template>
  <div>
    <h2 class="title">{{id?'编辑':'新建'}}英雄</h2>
    <el-form label-width="80px" @submit.native.prevent="save">
      <el-tabs value="basic" type="border-card">
        <el-tab-pane label="基础信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>

          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :headers="getAuthHeaders()"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="res =>$set(model,'avatar',res.url)"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="banner">
            <el-upload
              class="avatar-uploader"
              :headers="getAuthHeaders()"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="res => $set(model,'banner',res.url)"
            >
              <img v-if="model.banner" :src="model.banner" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>

          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item of categories"
                :key="item.id"
                :label="item.name"
                :value="item._id"
              >{{item.name}}</el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="难度">
            <el-rate
              style="margin-top:0.7rem"
              v-model="model.scores.difficult"
              :max="10"
              show-score
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate style="margin-top:0.7rem" v-model="model.scores.skills" :max="10" show-score></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate style="margin-top:0.7rem" v-model="model.scores.attack" :max="10" show-score></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate style="margin-top:0.7rem" v-model="model.scores.survive" :max="10" show-score></el-rate>
          </el-form-item>

          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option
                v-for="item of items"
                :key="item.id"
                :label="item.name"
                :value="item._id"
              >{{item.name}}</el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option
                v-for="item of items"
                :key="item.id"
                :label="item.name"
                :value="item._id"
              >{{item.name}}</el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane label="技能" name="skills">
          <el-button style="margin-bottom:1rem" @click="model.skills.push({})">
            <i class="el-icon-plus" style="color:blue;padding-right:0.5rem"></i>添加技能
          </el-button>

          <el-row type="flex" style="flex-wrap:wrap">
            <el-col :md="10" v-for="(item,index) in model.skills" :key="index" class="skill-item">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图片">
                <el-upload
                  class="avatar-uploader"
                  :headers="getAuthHeaders()"
                  :action="uploadUrl"
                  :show-file-list="false"
                  :on-success="res => $set(item,'icon',res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="冷却值">
                <el-input type="text" v-model="item.delay"></el-input>
              </el-form-item>
              <el-form-item label="消耗">
                <el-input type="text" v-model="item.cost"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" size="small" @click="toDelete(index)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="搭档" name="partners">
          <el-button style="margin-bottom:1rem" @click="model.partners.push({})">
            <i class="el-icon-plus" style="color:blue;padding-right:0.5rem"></i>添加搭档
          </el-button>

          <el-row type="flex" style="flex-wrap:wrap">
            <el-col :md="10" v-for="(item,index) in model.partners" :key="index" class="skill-item">
              <el-form-item label="英雄">
                <el-select filterable v-model="item.hero">
                  <el-option 
                  v-for="hero in heroes" 
                  :key="hero._id"
                  :value="hero._id"
                  :label="hero.name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" size="small" @click="model.partners.slice(index,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <el-form-item>
        <el-button class="save-button" type="primary" native-type="submit">保存</el-button>
      </el-form-item>
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
        name: "",
        avatar: "",
        skills: [],
        partners: [],
        scores: {
          difficult: 0,
          skills: 0,
          attack: 0,
          survive: 0
        }
      },
      categories: [],
      items: [],
      heroes:[]
    };
  },
  methods: {
    async save() {
      let res, message;
      if (this.id) {
        // 更新
        res = await this.$http.put(`/rest/heroes/${this.id}`, this.model);
        message = "修改";
      } else {
        // 新增
        res = await this.$http.post("/rest/heroes", this.model);
        message = "添加";
      }
      if (res.data) {
        this.$message({
          message: `${message}成功！`,
          type: "success"
        });
        this.$router.push("/heroes/list");
      } else {
        this.$message.error(`${message}错误!`);
      }
      console.log(res.data);
    },

    async initInfo(id) {
      const res = await this.$http.get(`/rest/heroes/${id}`);
      // this.model = res.data;
      this.model = Object.assign({}, this.model, res.data);
    },

    async initHeroCategories() {
      const res = await this.$http.get(`/rest/categories`);
      this.categories = res.data;
    },

    async initHeroItems() {
      const res = await this.$http.get(`/rest/items`);
      this.items = res.data;
    },

     async initHeroes() {
      const res = await this.$http.get(`/rest/heroes`);
      this.heroes = res.data;
    },

    toDelete(index) {
      this.$confirm(
        `此操作将永久删除 "${this.model.skills[index].name}", 是否继续?`,
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
        this.model.skills.splice(index, 1);
      });
    }
  },
  created() {
    this.initHeroCategories();
    this.initHeroItems();
    this.initHeroes();
    this.id && this.initInfo(this.id);
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
.skill-item {
  padding: 2rem;
  border: 0.1px dashed grey;
  margin: 2rem;
}
</style>