import httpUtil from '@/utils/httpUtil'

// 登陆
export function login(data){
  return httpUtil({
    url:'/login',
    method:'post',
    data
  })
}

export function auth () {
  return httpUtil({
    url: '/auth',
    method: 'post',
  })
}

// 添加管理员
export function addUser(data){
  return httpUtil({
    url:'/user/add',
    method:'post',
    data
  })
}

// 删除管理员
export function deleteUser (params) {
  return httpUtil({
    url: '/user/delete',
    method: 'delete',
    params
  })
}


// 更新管理员
export function updateUser (data) {
  return httpUtil({
    url: '/user/update',
    method: 'put',
    data
  })
}

// 获取管理员列表
export function getUser (params) {
  return httpUtil({
    url: '/user/list',
    method: 'get',
    params
  })
}

// 获取管理员详情
export function initUserInfo (params) {
  return httpUtil({
    url: '/user/item',
    method: 'get',
    params
  })
}