import axios from 'axios'
import Cookies from 'js-cookie'

import Toast from './components/Toast'

export const instance = axios.create({
    // baseURL: process.env.NODE_ENV === 'production' ? 'https://api.likeyun.net' : '',
    baseURL: 'http://192.168.0.104:8080/step',
    timeout: 5000,
})

let isConfig = true
let isError = true

let getPlanList = async () => {
    try {
        const res = await auth.getRefreshToken()
        Cookies.set('token', res.data.jwtToken, {
            domain: process.env.NODE_ENV === 'production' ? '.likeyun.net' : 'localhost',
            expires: 365,
        })
        Cookies.set('uploadToken', res.data.uploadToken, {
            domain: process.env.NODE_ENV === 'production' ? '.likeyun.net' : 'localhost',
            expires: 365,
        })
        instance.defaults.headers.common['Authorization'] = 'Basic ' + res.data.jwtToken
    } catch (error) {}
}

instance.interceptors.response.use(
    function(config) {
        if (config && config.data.code === 4205) {
            if (isConfig) {
                getPlanList()
                isConfig = false
            }
        }
        return config
    },
    function(error) {
        Toast.error('需要重新')
        // 对请求错误做些什么
        if (error && error.response.data.code === 4004) {
            if (isError) {
                Cookies.remove('token')
                Cookies.remove('uploadToken')
                window.location.href =
                    process.env.NODE_ENV === 'production' ? 'https://www.likeyun.net' : 'http://localhost:1234'
                isError = false
            }
        } else if (error && error.response.data.code === 4005) {
            Cookies.remove('token')
            Cookies.remove('uploadToken')
            window.location.href =
                process.env.NODE_ENV === 'production' ? 'https://www.likeyun.net' : 'http://localhost:1234'
            isError = false
        } else if (error && error.response.data.code === 4016) {
            Cookies.remove('token')
            Cookies.remove('uploadToken')
            window.location.href =
                process.env.NODE_ENV === 'production' ? 'https://www.likeyun.net' : 'http://localhost:1234'
            isError = false
        }
    }
)

if (isConfig) {
    if (Cookies.get('token')) {
        instance.defaults.headers.common['Authorization'] = 'Basic ' + Cookies.get('token')
    }
}

const request = {
    get: async (url: string, data?: any) => {
        try {
            const res = await instance.get(url, {
                params: data,
            })
            return res.data
        } catch (error) {
            return Promise.reject(error.response.data)
        }
    },
    post: async (url: string, data?: object) => {
        try {
            const res = await instance.post(url, data)
            return res.data
        } catch (error) {
            return Promise.reject(error.response.data)
        }
    },
    put: async (url: string, data?: object) => {
        try {
            const res = await instance.put(url, data)
            return res.data
        } catch (error) {
            return Promise.reject(error.response.data)
        }
    },
    del: async (url: string) => {
        try {
            const res = await instance.delete(url)
            return res.data
        } catch (error) {
            return Promise.reject(error.response.data)
        }
    },
}

const auth = {
    getCaptcha: () => request.get('/captchas/base64'),
    getRefreshToken: () => request.get('/refresh-token'),
    logOut: () => request.del('/logout'),
}
const user = {
    getUserInfo: () => request.get('/user-info'),
}

const exercise = {
    getProblemList: (data: any) => request.get('/work-problem/list', data),
    getProblem: (workerProblemId: number) => request.get(`/work-problem/get`, { workerProblemId }),
    addProblem: (data: any) => request.post('/work-problem/create', data),
    editProblem: (data: any) => request.put('/work-problem/update', data),
    putApplyAudit: (id: number) => request.put('/work-problem/apply-audit', { id }),
}

const point = {
    getPoints: (data?: any) => request.get('/lore-list', data),
    getTags: (subjectId: number) => request.get('/target-list', { subjectId }),
}

export default {
    auth,
    user,
    exercise,
    point,
}
