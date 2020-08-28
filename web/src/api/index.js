import httpUtil from '@/utils/httpUtil'

// 首页轮播图
export function getHomeAds(params) {
  return httpUtil({
    url: '/ads/home',
    method: 'get',
    params
  })
}

// 首页新闻数据
export function getNews() {
  return httpUtil({
    url: '/news/listOne',
    method: 'get',
  })
}

// 文章详情
export function getArticleInfo (params) {
  return httpUtil({
    url: '/article/item',
    method: 'get',
    params
  })
}

// 首页英雄数据
// export function getHeroes() {
//   return httpUtil({
//     url: '/hero/listOne',
//     method: 'get',
//   })
// }

// 英雄详情
export function getHeroInfo(params) {
  return httpUtil({
    url: '/hero/item',
    method: 'get',
    params
  })
}

// 英雄列表分类
export function getHeroCate() {
  return httpUtil({
    url: '/hero/listOne',
    method: 'get',
  })
}