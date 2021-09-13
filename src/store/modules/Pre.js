const modulePre = {
    namespaced: true,
	state: {
		PRE_NUM: 0,     // 预约人数
	},
	mutations: {
		SET_PRE_NUM: (state, params) => {
            state.PRE_NUM = params
        }
	},
	actions: {
	}
}

export default modulePre
