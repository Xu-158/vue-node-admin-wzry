import httpUtil from '@/utils/request'

// 添加分类
export function saveCate (data) {
  return httpUtil({
    url: '/categories/add',
    method: 'post',
    data
  })
}

// 修改分类
export function updateCate (data) {
  return httpUtil({
    url: '/categories/update',
    method: 'put',
    data
  })
}

// 删除分类
export function deleteCate (params) {
  return httpUtil({
    url: '/categories/delete',
    method: 'delete',
    params
  })
}

// 查询一级分类
export function initCateOne (params) {
  return httpUtil({
    url: '/categories/levelOne',
    method: 'get',
    params
  })
}

// 查询二级分类
export function initCateTwo (params) {
  return httpUtil({
    url: '/categories/levelTow',
    method: 'get',
    params
  })
}

// 查询要编辑的分类信息
export function initCateItem (params) {
  return httpUtil({
    url: '/categories/item',
    method: 'get',
    params
  })
}