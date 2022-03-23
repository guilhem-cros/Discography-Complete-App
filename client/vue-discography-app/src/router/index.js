import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/genres',
    name : 'genres',
    component: () => import('../views/GenreView.vue'),
  },
  {
    path: '/artists',
    name : 'artists',
    component: () => import('../views/ArtistView.vue'),
  },
  {
    path: '/artists/details/:id',
    name : 'artistDetails',
    component: () => import('../views/ArtistDetailsView.vue'),
    props : true
  },
  {
    path: '/albumDetails/:idAlbum',
    name: 'albumDetails',
    component: () => import('../views/AlbumDetailsView.vue'),
    props : true
  },
  {
    path: '/album/:idAlbum',
    name : 'album',
    component: () => import('../views/AlbumFormView.vue'),
    props : true
  },
  //catchall 404 
  {
    path : '/:catchAll(.*)',
    name : 'notFound',
    component: () => import('../views/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
