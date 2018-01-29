import Vue from 'vue';
import Router from 'vue-router';

import Login from '../components/page/Login.vue';
import Home from '../components/page/Home.vue';
import Hotel from '../components/page/Hotel.vue';
import Menber from '../components/page/Menber.vue';
import Order from '../components/page/Order.vue';
import HomePage from '../components/commom/Home.vue';
Vue.use(Router);

export default new Router({
   routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
          path: '/login',
          name: 'login',
          component: Login 
        },
        {
          path:'/',
          name:'HomePage',
          component:HomePage,
          children:[
            {
              path:'/',
              redirect:'/home'
            },
            {
              path:'/home',
              name:'Home',
              component:Home
            },
            {
              path:'/menber',
              name:Menber,
              component:Menber
            },
            {
              path:'/hotel',
              name:Hotel,
              component:Hotel
            },
            {
              path:'/order',
              name:Order,
              component:Order
            }
          ]
        }
       
    ]

})