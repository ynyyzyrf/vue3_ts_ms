import { createPinia } from 'pinia'
import type { App } from 'vue/dist/vue.js'
import useLoginStore from './login'
const pinia = createPinia()
function loadPinia(app:App<Element>) {
    app.use(pinia)
    const LoginStore = useLoginStore()
    LoginStore.loadStoreCache()
}
export default loadPinia