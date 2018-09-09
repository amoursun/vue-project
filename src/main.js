import 'babel-polyfill';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import routes from './routes'; // Array
import store from './store'
import VueLazyload from 'vue-lazyload'
import App from './App.vue';
import AppChicken from './AppChicken.vue';

var attachFastClick = require('fastclick');
attachFastClick.attach(document.body);

Vue.use(VueResource); //http请求注册
Vue.use(VueRouter); //路由注册

Vue.use(VueLazyload, {
    loading: require('basis/image/default.png')
});

console.log(routes);

// 实例化路由
const router = new VueRouter({
    // mode: 'history', //H5 路由模式，需要服务端做渲染防止404错误
    base: __dirname,
    linkActiveClass: 'on',
    routes
});

// let routeName = 'recommend'
let routeName = 'home';

let render = new Vue({
    router,
    store,
    el: '#app',
    render: h => {
        if (routeName === 'recommend') {
            return h(AppChicken)
        }
        else {
            return h(App)
        }
    },
    renderError: (h, err) => {
        return h('pre', { style: { color: 'red' }}, err.stack)
    }
});

// render;

if (module.hot) {
    module.hot.accept(App, () => render);
}
