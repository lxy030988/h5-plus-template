import { createApp } from 'vue'
import App from './App.vue'
import { setupVant, setupSvgIcon } from '@/plugins'
import router from './router'
import store from './store'

import 'amfe-flexible'
import './styles/index.scss' //引入通用样式

const app = createApp(App)
setupVant(app)
setupSvgIcon(app)

app.use(store).use(router).mount('#app')
