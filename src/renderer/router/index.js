import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/main',
      name: 'main',
      component: require('@/views/main/index').default,
    },
    {
      path: '/album',
      name: 'album',
      component: require('@/views/album/index').default,
    },
    {
      path: '/info',
      name: 'info',
      component: require('@/views/info/index').default,
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: require('@/views/calendar/index').default,
    },
    {
      path: '*',
      redirect: '/main',
    },
  ],
});
