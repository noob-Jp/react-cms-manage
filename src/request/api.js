import request from './request'

//注册接口
export const reqRegister = (params) => request.post('/register', params)
//登录接口
export const reqLogin = (params) => request.post('/login', params)
