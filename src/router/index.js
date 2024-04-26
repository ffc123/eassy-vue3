import { createWebHistory,createRouter } from 'vue-router'

// 导入组件
import LoginVUe from '@/views/Login.vue'
import LayoutVue from '@/views/Layout.vue'
import ArticleCategory from '@/views/article/ArticleCategory.vue'
import ArticleManage from '@/views/article/ArticleManage.vue'
import UserInfo from '@/views/user/UserInfo.vue'
import UserResetPassword from '@/views/user/UserResetPassword.vue'
import UserAvatar from '@/views/user/UserAvatar.vue'

// 创建路由
const routes = [
    {
        path: '/',
        component: LayoutVue,
        redirect: '/article/category',
        
        // 子路由
        children: [
            { path: "/article/category", component: ArticleCategory },
            { path: "/article/manage", component: ArticleManage },
            { path: "/user/info", component: UserInfo },
            { path: "/user/avatar", component: UserAvatar },
            { path: "/user/resetPassword", component: UserResetPassword }
        ]
    },
    {
        path: '/login',
        component: LoginVUe
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 导出路由
export default router