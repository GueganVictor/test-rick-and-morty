import { RouteRecordRaw } from 'vue-router';
import CharacterListVue from '../views/CharacterList.vue';
import CharacterDetailVue from '../views/CharacterDetail.vue';
import PageNotFoundVue from '../views/PageNotFound.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/characters',
  },
  {
    path: '/characters',
    name: 'CharacteList',
    component: CharacterListVue,
  },
  {
    path: '/characters/:id',
    name: 'CharacterDetail',
    component: CharacterDetailVue,
  },
  { 
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: PageNotFoundVue
},
];

export default routes;
