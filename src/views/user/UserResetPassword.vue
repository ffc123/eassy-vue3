<template>
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon :rules="rules" label-width="auto"
        class="demo-ruleForm">
        <el-form-item label="原密码" prop="old_pwd">
            <el-input v-model="ruleForm.old_pwd" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="新密码" prop="new_pwd">
            <el-input v-model="ruleForm.new_pwd" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="新密码" prop="re_pwd">
            <el-input v-model="ruleForm.re_pwd" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="updatePassword">
                确认
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { parseAst } from 'vite';

const ruleFormRef = ref<FormInstance>()


const ruleForm = reactive({
    old_pwd: '',
    new_pwd: '',
    re_pwd: '',
})

const validatePass = (rules, value, callback) => {
    if (value === '') {
        callback(new Error('请再次输入密码'))
    } else if (value !== ruleForm.new_pwd) {
        callback(new Error("两次密码不匹配!"))
    } else {
        callback()
    }
}

const rules = reactive<FormRules<typeof ruleForm>>({
    old_pwd: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
    new_pwd: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur' }
    ],
    re_pwd: [{ required: true, message: '请再次输入新密码', trigger: 'blur' },
    { validator: validatePass, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!')
            return false
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

import router from '@/router';
import { ElMessage } from 'element-plus';
import { updatePasswordService } from '@/api/user.js';
import { useTokenStore } from '@/stores/token.js';
const tokenStore = useTokenStore()

const updatePassword = async () => {
    const data = {
        old_pwd: ruleForm.old_pwd,
        new_pwd: ruleForm.new_pwd,
        re_pwd: ruleForm.re_pwd
    };

    let result = await updatePasswordService(data);
    ElMessage.success(result.message === '修改成功' ? result.message : '修改成功')

    // 清空pinia中的数据
    tokenStore.removeToken();
    router.push('/login')
}

</script>