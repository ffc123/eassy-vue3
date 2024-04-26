// 定义store
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserInfoStore = defineStore('userInfo', () => {
    // 响应式变量
    const userInfo = ref({})

    // 定义函数,修改userInfo
    const setUserInfo = (newUserInfo) => {
        userInfo.value = newUserInfo
    }
    // 定义函数,移除userInfo
    const removeUserInfo = () => {
        userInfo.value = {}
    }

    return {
        userInfo,
        setUserInfo,
        removeUserInfo
    }

},
    { persist: true }
)