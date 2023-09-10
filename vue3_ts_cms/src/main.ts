import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import loadPinia from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import registerIcons from './global/register-icons'

//createApp(App).use(ElementPlus).use(router).use(pinia).mount('#app')


const app = createApp(App)
app.use(registerIcons)
app.use(ElementPlus)

app.use(loadPinia)
app.use(router)
app.mount('#app')