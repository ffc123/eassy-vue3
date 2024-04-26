import request from '@/utils/request'

// 注册接口
export const userRegisterService = (registerData) => {
  // 借助URLSearchParams对象来处理参数
    const params = new URLSearchParams();
    for (let key in registerData) {
        params.append(key, registerData[key]);
        }
    return request.post('/user/register', params)
};

// 登录接口
export const userLoginService = (registerData) => {
    const params = new URLSearchParams();
    for (let key in registerData) {
        params.append(key, registerData[key]);
    }
    return request.post('/user/login', params)
}

// 获取用户信息接口
export const getUserInfoService = () => {
    return request.get('/user/userInfo')
}

// 修改用户信息接口
export const updateUserInfoService = (userInfo) => {
    return request.put('/user/update', userInfo)
}

// 修改用户头像接口
export const updateAvatarService = (avatarUrl)=>{
    const params = new URLSearchParams();
    params.append('avatarUrl',avatarUrl)
    return request.patch('/user/updateAvatar',params)
}

// 修改用户密码接口
export const updatePasswordService = (data) => {
    return request.patch('/user/updatePwd', JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
