import Vue from 'vue'
import Vuex from 'vuex'

// modules引入
let ms = require.context('./modules', false, /\.js$/)
let modules = {}
ms.keys().forEach(k => {
	let n = k.substring(2, k.length -3)
	modules[n] = ms(k).default
})

Vue.use(Vuex)

export default new Vuex.Store({
	modules,
	state: {
	}
})
