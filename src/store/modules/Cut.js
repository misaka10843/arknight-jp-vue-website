// ------------------------------------ 活动演出已结束 -----------------------------------------

const moduleCut = {
    namespaced: true,
	state: {
		CUT_SHOW: false,        
		CUT_STAGE: 4,
		HOME_SHOW: true
	},
	mutations: {
		SET_CUT_SHOW: (state, params) => {
            state.CUT_SHOW = params
		},
		SET_CUT_STAGE: (state, params) => {
			state.CUT_STAGE = params
		},
		SET_HOME_SHOW: (state, params) => {
			state.HOME_SHOW = params
		}
	},
	actions: {
	}
}

export default moduleCut
