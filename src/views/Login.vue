<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
//控制注册与登录表单的显示， 默认显示注册
const isRegister = ref(false)
// 提示信息
ElMessage.success('请登录')
// 数据模型
const registerData = ref({
    username: "",
    password: '',
    rePassword: ''
})

// 自定义校验规则
const validatePass = (rules, value, callback) => {
    if (value === '') {
        callback(new Error('请再次输入密码'))
    } else if (value !== registerData.value.password) {
        callback(new Error("两次密码不匹配!"))
    } else {
        callback()
    }
}

// 检验数据
const rules = ({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur' }
    ],
    rePassword: [
        { validator: validatePass, trigger: 'blur' }
    ]

})

// 调用注册接口
import { userRegisterService } from '@/api/user.js'
const register = async () => {
    let result = await userRegisterService(registerData.value)
    /* if (result.code === 0) {
        alert(result.message ? result.message : '注册成功')
    } else {
        alert(result.message ? result.message : '注册失败')
    } */
    ElMessage.success(result.message!=="操作成功"? result.message : '注册成功')
}

// 调用登录接口
import { userLoginService } from '@/api/user.js'
import { useTokenStore } from '@/stores/token.js'
const tokenStore = useTokenStore()
const router = useRouter()
const login = async () => {
    let result = await userLoginService(registerData.value)
    /* if (result.code === 0) {                             
        alert('登录成功')
    } else {
        alert('用户名或密码错误')
    } */
    ElMessage.success(result.message!=="操作成功"? result.message : '登录成功')
    // 保存token
    tokenStore.setToken(result.data)
    router.push('/')
}

// 清空数据模型函数
const clearRgisterData = () => {
    registerData.value = {
        username: "",
        password: '',
        rePassword: ''
    }
}


</script>

<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form">
            <!-- 注册表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registerData" :rules="rules">
                <el-form-item>
                    <h1>注册</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码"
                        v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item prop="rePassword">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入再次密码"
                        v-model="registerData.rePassword"></el-input>
                </el-form-item>
                <!-- 注册按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="register">
                        注册
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = false;clearRgisterData()">
                        ← 返回
                    </el-link>
                </el-form-item>
            </el-form>
            <!-- 登录表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-else :model="registerData" :rules="rules">
                <el-form-item>
                    <h1>登录</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码"
                        v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item class="flex">
                    <div class="flex">
                        <el-checkbox>记住我</el-checkbox>
                        <el-link type="primary" :underline="false">忘记密码？</el-link>
                    </div>
                </el-form-item>
                <!-- 登录按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="login">登录</el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = true;clearRgisterData()">
                        注册 →
                    </el-link>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
/* 样式 */
.login-page {
    height: 100vh;
    background-color: #fff;

    .bg {
        background:
            /* url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
            url('@/assets/login_bg.jpg') no-repeat center / cover; */
            url('@/assets/bg_logo.png') no-repeat center / auto,
            url('@/assets/bg.jpg') no-repeat center / cover;
        border-radius: 0 20px 20px 0;
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;

        .title {
            margin: 0 auto;
        }

        .button {
            width: 100%;
        }

        .flex {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>