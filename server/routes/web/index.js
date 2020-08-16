module.exports = app =>{
  const router = require('express').Router()
  const mongoose = require('mongoose')

  const Category = mongoose.model('Category')
  const Article = mongoose.model('Article')
  router.get('/news/init',async(req,res)=>{
    const parent = await Category.findOne({
      name:'新闻'
    })
    const cats = await Category.find().where({
      parent:parent
    }).lean()
    const newsTitle =  ["“缘起峡谷，情定七夕”——《王者荣耀》七夕告白季，邀你来峡谷，表达爱！", "叮！你的潇潇子已抵达王者营地", "策划有话说丨新一系野刀即将到来", "三分之地，阵营对决赢手机周边，快来参与！", "曲韵芳华丨经典咏流传 《数字化破局》新文创微纪录片首期全网上线", "8月14日全服不停机优化公告", "8月14日体验服停机更新公告", "“游戏家中国行·王者零距离”活动重启说明", "8月12日IP核心团招募公告", "8月12日净化游戏环境声明及处罚公告", "【看世冠对决 赢豪华大礼】活动公告", "应援世冠得好礼，墨子两款皮肤重塑完成即将登场", "夏日盛典开启，新英雄阿古朵登场！送皮肤、抽内测惊喜好礼享不停", "【三分探险】活动开启公告", "夏日有好礼，峡谷乐不停", "2020年王者荣耀世界冠军杯总决赛门票8月10日正式开售", "8月7日【比赛服】版本更新公告", "7月29日【比赛服】版本更新公告", "7月13日【比赛服】版本更新公告", "2020年王者荣耀世界冠军杯小组赛赛程出炉"]
    const newsList = newsTitle.map(e =>{
      const randomCats = cats.slice(0).sort((a,b)=>Math.random() - 0.5)
      return{
        categories:randomCats.slice(0,2),
        title:e,

      }
    })
    await Article.deleteMany({})
    await Article.insertMany(newsList)
    res.send(newsList)
  })

  app.use('/web/api',router)
}