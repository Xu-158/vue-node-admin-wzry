import httpUtil from '@/utils/request'

// 添加英雄
export function saveHero (data) {
  return httpUtil({
    url: '/hero/add',
    method: 'post',
    data
  })
}

// 修改英雄
export function updateHero (data) {
  return httpUtil({
    url: '/hero/update',
    method: 'put',
    data
  })
}

// 删除英雄
export function deleteHero (params) {
  return httpUtil({
    url: '/hero/delete',
    method: 'delete',
    params
  })
}

// -----获取英雄二级分类-----
export function initHeroCategories (params) {
  return httpUtil({
    url: '/hero/cate',
    method: 'get',
    params
  })
}

// 获取英雄列表
export function getHero (params) {
  return httpUtil({
    url: '/hero/list',
    method: 'get',
    params
  })
}

// 获取要编辑的英雄信息
export function initHeroItem (params) {
  return httpUtil({
    url: '/hero/item',
    method: 'get',
    params
  })
}
