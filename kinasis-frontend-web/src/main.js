import { createApp } from 'vue'
import App from './App.vue'
import router from './router/routes'
import './assets/css/base.css'

const applyInitialDarkMode = () => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
        document.documentElement.classList.add('dark-mode');
        document.body.classList.add('dark-mode');
    }
};

applyInitialDarkMode();

const app = createApp(App)
app.use(router)
app.mount('#app')
