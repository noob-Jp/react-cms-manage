import request from './request'

//注册接口
export const reqRegister = (params) => request.post('/register', params)
//登录接口
export const reqLogin = (params) => request.post('/login', params)
// 获取文章列表
export const reqGetArticleList = (params) => request.get('/article', {params})
//添加文章
export const reqAddArticle = (params) => request.post('/article/add', params)
// 更新文章
export const reqUpdateArticle = (params) => request.put('/article/update', params)











