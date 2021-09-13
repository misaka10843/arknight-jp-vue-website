import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store/index.js'

Vue.use(Router)

// lazy-loaded
function loadView(path) {
	return () =>
		import(/* webpackChunkName: "view-[request]" */ `${path}`)
}

const router = new Router({
	mode: process.env.NODE_ENV === 'production' ? 'history' : 'hash',
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/cbt',
			name: 'cbt',
			component: loadView("./views/Cbt.vue"),
			redirect: "/"
		},
		{
			path: '/prereg',
			name: 'prereg',
			component: loadView("./views/Prereg.vue"),
			redirect: "/"
		},
		{
			path: '/news',
			name: 'news',
			component: loadView("./views/News.vue")
		},
		{
			path: '/news/:newsid',
			name: 'newsDetail',
			component: loadView("./views/NewsDetail.vue")
		},
		{
			path: '/contact-1-hint',
			name: 'contact-1-hint',
			component: loadView("./views/Faq.vue")
		},
		{
			path: '/contact-2-hint',
			name: 'contact-2-hint',
			component: loadView("./pages/contact/Contact-2.vue")
		},
		{
			path: '/contact-3-hint',
			name: 'contact-3-hint',
			component: loadView("./pages/contact/Contact-3.vue")
		},
		{
			path: '/contact-4-hint',
			name: 'contact-4-hint',
			component: loadView("./pages/contact/Contact-4.vue")
		},
		{
			path: '/contact-5-hint',
			name: 'contact-5-hint',
			component: loadView("./pages/contact/Contact-5.vue")
		},
		{
			path: '/fankit',
			name: 'fankit',
            component: loadView("./views/Fankit.vue"),
            children: [
                {
                    path: "/",
                    name: "FankitIndex",
                    component: loadView("./pages/fankit/index.vue"),
                },
                {
                    path: "precautions",
                    name: 'Precautions',
                    component: loadView("./pages/fankit/Precautions.vue"),
                },
                {
                    path: "guidelines",
                    name: "Guidelines",
                    component: loadView("./pages/fankit/Guidelines.vue"),
                }
            ]
		},
		{
			path: '/terms_of_service',
			name: 'TermsOfService',
			component: loadView("./views/TermsOfService.vue")
		},
		{
			
			path: '/privacy_policy',
			name: 'privacyPolicy',
			component: loadView("./views/privacyPolicy.vue")
		}
	]
})

router.beforeEach(async(to, from, next) => {
	if(from.name === 'home' && to.name !== null) {
        // 离开首页
		if(store.state.Home.FULLPAGE) {
			store.state.Home.FULLPAGE.fullScrollDisable(true)
            store.state.Home.FULLPAGE.bodyScrollable(true)
		}
	}
	next();
})

export default router