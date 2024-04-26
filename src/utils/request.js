//定制请求的实例

//导入axios  npm install axios
import axios from 'axios';
import { ElMessage } from 'element-plus';
import router from '../router'; // 导入路由
import { useTokenStore } from '@/stores/token';
//定义一个变量,记录公共的前缀  ,  baseURL
const baseURL = '/api';
const instance = axios.create({ baseURL })

// 添加请求拦截器
instance.interceptors.request.use(
    (config)=>{
        // 请求前回调
        const tokenStore = useTokenStore();
        if(tokenStore.token){
            config.headers.Authorization=tokenStore.token;
        }
        return config;
    },
    (err)=>{
        // 请求错误回调
        Promise.reject(err)
    }
    
)

//添加响应拦截器
instance.interceptors.response.use(
    result => {
        // 判断响应状态码
        if (result.data.code === 0) {
            //成功
            return result.data;
        }
        //失败
        // alert(result.message?result.message:'服务异常');
        ElMessage.error(result.message ? result.message : '服务异常');
        // 异步操作转化成失败的状态
        return Promise.reject(result.data);

    },
    err => {
        if (err.response.status === 401) {
            //未登录
            // ElMessage.error('请先登录');
            router.push('/login');
        } else {
            ElMessage.error('服务异常');
        }

        return Promise.reject(err);//异步的状态转化成失败的状态
    }
)

export default instance;