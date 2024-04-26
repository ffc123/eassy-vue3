import './assets/main.scss'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue' 
import router from './router' //引入router
import locale from 'element-plus/dist/locale/zh-cn';



const app = createApp(App)
app.use(ElementPlus, { locale })
app.use(router)
app.mount('#app')


// pinia
import { createPinia } from 'pinia' 
import { createPersistedState } from 'pinia-persistedstate-plugin' 
const pinia = createPinia()
const persist = createPersistedState()
app.use(pinia)
pinia.use(persist)


