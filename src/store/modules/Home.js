const moduleHome = {
	namespaced: true,
	state: {
		PRELOAD_IMGLIST: [],		// 预加载图片
		FULLPAGE: null,		// home 全屏滚动类
		NAVLIST: [
			{
				text_en: 'HOME',
				text_jp: "トップ"
			},
			{
				text_en: "NEWS",
				text_jp: "ニュース"
			},
			{
				text_en: "CHARACTER",
				text_jp: "オペレーター"
			},
			{
				text_en: "SYSTEM",
				text_jp: "世界観"
			},
			{
				text_en: "GALLERY",
				text_jp: "ギャラリー"
			},
			{
				text_en: "FAQ&SUPPORT",
				text_jp: "サポート",
				router_path: '/contact-1-hint',
			},
			{
				text_en: "Fankit",
				text_jp: "ファンキット",
				router_path: '/fankit',
			},
		]
	},
	mutations: {
		SET_PRELOADIMGLIST: (state, params) => {
			state.PRELOADIMGLIST = params
		},
		INIT_FULLPAGE: (state, params) => {
			state.FULLPAGE = params
		},
	},
	actions: {
	},
	getters: {
		NAV_ACTIVE_INDEX: state => {
			if(state.FULLPAGE) {
				return state.FULLPAGE.activeIndex
			} else {
				return -1
			}
		}
	}
}

export default moduleHome
