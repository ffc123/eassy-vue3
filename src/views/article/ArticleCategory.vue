<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'
import { ref } from 'vue'
const categorys = ref([
    {
        "id": 3,
        "categoryName": "美食",
        "categoryAlias": "my",
        "createTime": "2023-09-02 12:06:59",
        "updateTime": "2023-09-02 12:06:59"
    },
    {
        "id": 4,
        "categoryName": "娱乐",
        "categoryAlias": "yl",
        "createTime": "2023-09-02 12:08:16",
        "updateTime": "2023-09-02 12:08:16"
    },
    {
        "id": 5,
        "categoryName": "军事",
        "categoryAlias": "js",
        "createTime": "2023-09-02 12:08:33",
        "updateTime": "2023-09-02 12:08:33"
    }
])
// 声明异步方法
import { getArticleListService } from '@/api/article.js'
const getArticleList = async () => {
    let result = await getArticleListService()
    categorys.value = result.data;
}
getArticleList();

//控制添加分类弹窗
const dialogVisible = ref(false)
const title = ref('')

//添加分类数据模型
const categoryModel = ref({
    categoryName: '',
    categoryAlias: ''
})
//添加分类表单校验
const rules = {
    categoryName: [
        { required: true, message: '请输入分类名称', trigger: 'blur' },
    ],
    categoryAlias: [
        { required: true, message: '请输入分类别名', trigger: 'blur' },
    ]
}
// 调用添加分类接口
import { addArticleCategoryService } from '@/api/article.js'
import { ElMessage } from 'element-plus'
const addCategory = async () => {
    let result = await addArticleCategoryService(categoryModel.value)
    ElMessage.success(result.message ? result.message : '添加成功')
    dialogVisible.value = false
    getArticleList()
}
// 显示修改分类弹窗
const showEditDialog = (row) => {
    dialogVisible.value = true
    title.value = '修改分类'
    // 将当前行数据赋值给categoryModel
    categoryModel.value.categoryName = row.categoryName
    categoryModel.value.categoryAlias = row.categoryAlias
    categoryModel.value.id = row.id // 保存分类id
}


// 调用修改分类接口
import { updateArticleCategoryService } from '@/api/article.js'
const updateArticleCategory = async () => {
    let result = await updateArticleCategoryService(categoryModel.value)
    ElMessage.success(result.message ? result.message : '修改成功')
    dialogVisible.value = false
    getArticleList()
}
// 判断是添加还是修改
const jungle = () => {
    if (title.value === '添加分类') {
        addCategory()
    } else {
        updateArticleCategory()
    }
}

// 删除分类
import { deleteArticleCategoryService } from '@/api/article.js'
const deleteCategory = async (id) => {
    let result = await deleteArticleCategoryService(id)
    getArticleList()
}

// 确认删除弹出框
import { ElMessageBox } from 'element-plus'

const deleteOR = (row) => {
    ElMessageBox.confirm(
        '确认删除此分类?',
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            // 调用接口
            deleteCategory(row.id)
            ElMessage({
                type: 'success',
                message: '删除成功',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
        })
}

</script>
<template>
    <!-- 主页面 -->
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>文章分类</span>
                <div class="extra">
                    <el-button type="primary" @click="dialogVisible = true,
                        title = '添加分类'">添加分类</el-button>
                </div>
            </div>
        </template>
        <el-table :data="categorys" style="width: 100%">
            <el-table-column label="序号" width="100" type="index"> </el-table-column>
            <el-table-column label="分类名称" prop="categoryName"></el-table-column>
            <el-table-column label="分类别名" prop="categoryAlias"></el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary" @click="showEditDialog(row)"></el-button>
                    <el-button :icon="Delete" circle plain type="danger"
                        @click="deleteOR(row)"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>
    </el-card>

    <!-- 添加分类弹窗 -->
    <el-dialog v-model="dialogVisible" :title="title" width="30%">
        <el-form :model="categoryModel" :rules="rules" label-width="100px" style="padding-right: 30px">
            <el-form-item label="分类名称" prop="categoryName">
                <el-input v-model="categoryModel.categoryName" minlength="1" maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="分类别名" prop="categoryAlias">
                <el-input v-model="categoryModel.categoryAlias" minlength="1" maxlength="15"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="jungle"> 确认 </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style lang="scss" scoped>
.page-container {
    min-height: 100%;
    box-sizing: border-box;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
</style>