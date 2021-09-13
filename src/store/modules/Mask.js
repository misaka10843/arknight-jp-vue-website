const moduleMask = {
    namespaced: true,
	state: {
		VIDEO_MASK_ACTIVE: false,		// 视频遮罩开启状态
		GALLERY_MASK_ACTIVE: false,		// 图片遮罩状态
		TIP_MASK_ACTIVE: false,			// 提示语遮罩状态
		CBT_TIP_MASK_ACTIVE: false,
		VIDEO_URL: '',					// 视频地址
		GALLERY_IMG: '',
		GALLERY_TAG: []
	},
	mutations: {
		SET_VIDEO_MASK_ACTIVE: (state, params) => {		// 设置视频遮罩栏状态
			state.VIDEO_MASK_ACTIVE = params.show
			state.VIDEO_URL = params.videoUrl
		},
		SET_GALLERY_MASK_ACTIVE: (state, params) => {	// 设置图片遮罩状态
			state.GALLERY_MASK_ACTIVE = params.show
			state.GALLERY_IMG = params.img
			state.GALLERY_TAG = params.tag
		},
		SET_TIP_MASK_ACTIVE: (state, params) => {
			state.TIP_MASK_ACTIVE = params
		},
		SET_CBT_TIP_MASK_ACTIVE: (state, params) => {
			state.CBT_TIP_MASK_ACTIVE = params
		}
	},
	actions: {
	}
}

export default moduleMask
