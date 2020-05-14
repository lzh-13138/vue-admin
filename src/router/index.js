import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('views/login/Login')

Vue.use(VueRouter)

const routes = [
  { 
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 解决两次访问相同路由地址报错

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
