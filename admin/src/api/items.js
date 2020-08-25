import httpUtil from '@/utils/request'
// 添加装备
export function saveItem (data) {
  return httpUtil({
    url: '/item/add',
    method: 'post',
    data
  })
}

// 删除装备
export function deleteItem (params) {
  return httpUtil({
    url: '/item/delete',
    method: 'delete',
    params
  })
}


// 更新装备
export function updateItem (data) {
  return httpUtil({
    url: '/item/update',
    method: 'put',
    data
  })
}

// 获取装备
export function getItem (params) {
  return httpUtil({
    url: '/item/list',
    method: 'get',
    params
  })
}

// 获取装备详情
export function getItemInfo (params) {
  return httpUtil({
    url: '/item/item',
    method: 'get',
    params
  })
}