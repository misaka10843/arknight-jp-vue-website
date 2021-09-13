const moduleNav = {
    namespaced: true,
	state: {
		NAVBTN_ACTIVED: false,		// 导航开启状态
	},
	mutations: {
		SET_NAVBTN_ACTIVED: (state, params) => {		// 设置导航栏状态
			state.NAVBTN_ACTIVED = params
		}
	},
	actions: {
	}
}

export default moduleNav
