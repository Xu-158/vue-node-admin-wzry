import httpUtil from '@/utils/request'

// 登陆
export function login(data){
  return httpUtil({
    url:'/login',
    method:'post',
    data
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

export function auth () {
  return httpUtil({
    url: '/auth',
    method: 'post',
  })
}