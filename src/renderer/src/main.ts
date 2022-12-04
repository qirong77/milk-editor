import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/css/index.scss'
import { GET_DIR_TREE } from '../../common/eventType'
import Mousetrap from 'mousetrap'
const app = createApp(App)
app.use(createPinia())
app.mount('#app')
window.api.sendToMain(GET_DIR_TREE)
Mousetrap.bind('4', function() { console.log('4'); });