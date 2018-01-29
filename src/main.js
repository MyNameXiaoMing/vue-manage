import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import ElementUI from 'element-ui';
import '../static/css/theme-green/index.css';       // 浅绿色主题

Vue.use(VueAxios,axios)
Vue.use(ElementUI);
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');