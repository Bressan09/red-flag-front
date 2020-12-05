import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const lazyAbout = () =>
  import(/* webpackChunkName: "about" */ '../views/About.vue');

const lazyChat = () =>
  import(/* webpackChunkName: "about" */ '../views/Chat.vue');

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: lazyAbout
  },
  {
    path: '/chat',
    name: 'Chat',
    component: lazyChat,
    beforeEnter(to, from, next) {
      next();
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
