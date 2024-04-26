import request from '@/utils/request'
import {useTokenStore} from '@/stores/token'

// 调用获取文章列表接口
export const getArticleListService = () => {
   /*  const tokenStore = useTokenStore()
    // pina中定义的响应式数据,在这里可以直接使用
    return request.get('/category', {headers: {'Authorization': tokenStore.token}}) */
    return request.get('/category')
}

// 调用添加文章分类接口
export const addArticleCategoryService = (categoryModel) => {
    
    return request.post('/category',categoryModel)

}

// 调用修改文章分类接口
export const updateArticleCategoryService = (categoryModel) => {
  
    return request.put('/category', categoryModel)
}

// 调用删除文章分类接口
export const deleteArticleCategoryService = (categoryId) => {
    return request.delete('/category?id=' + categoryId)
}

// 调用获取文章列表接口
export const articleListService = (params) => {
    return request.get('/article', {params: params})
}

// 调用添加文章接口
export const addArticleService=(articleModel) =>{
    return request.post('/article',articleModel)
}

