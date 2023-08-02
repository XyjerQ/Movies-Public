import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/movie',
      name: 'movie',
      component: () => import('../views/MovieView.vue'),
    },
    {
      path: '/series',
      name: 'series',
      component: () => import('../views/SeriesView.vue'),
    },
    {
      path: '/people',
      name: 'people',
      component: () => import('../views/PeopleView.vue'),
    },
    {
      path: '/search/:query',
      name: 'search',
      component: () => import('../views/SearchView.vue'),
      props: true
    },
    {
      path: '/movie/:id-:title',
      name: 'movieDetails',
      component: () => import('../views/DetailMovieView.vue'),
      props: true
    },
    {
      path: '/series/:id-:title',
      name: 'seriesDetails',
      component: () => import('../views/DetailSeriesView.vue'),
      props: true
    },
    {
      path: '/people/:id-:name',
      name: 'peopleDetails',
      component: () => import('../views/DetailPeopleView.vue'),
      props: true
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
