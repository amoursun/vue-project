const initRoute = [{
    path: '/',
    redirect: 'home', // 默认指向路由
    // redirect: to => {
    //     console.log(to)
    //     if (to.path === '/') {
    //         return '/home'
    //     }
    // }
}];
export default initRoute;