// 定义store
import { defineStore } from "pinia";
import { ref } from "vue";

export const useTokenStore = defineStore('token', () => {
    // 响应式变量
    const token = ref('')

    // 定义函数,修改token
    const setToken = (newToken) => {
        token.value = newToken
    }
    // 定义函数,移除token
    const removeToken = () => {
        token.value = ''
    }

    return {
        token,
        setToken,
        removeToken
    }
},
{
    persist:true // 持久化
}
)