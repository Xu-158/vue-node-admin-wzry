import {auth} from '../api/user'

export async function existToken(){
  let token = false
  if(localStorage.getItem('token')){
    const res = await auth()
    if(res.statusCode == 0) token = true
  }
  return token
} 