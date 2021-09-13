<template>
  <div>
    <transition name="fade">
      <!-- ------------------- 活动演出已结束 ------------------- -->
      <cut-page class="cut-wrap" v-if="CUT_SHOW"></cut-page>
    </transition>
    <div @click="clickEvent" v-if="HOME_SHOW">
      <page-nav :navlist="NAVLIST" :fullpage="fullpage"></page-nav>
      <div class="home-wrap">
        <top-page class="home-page"></top-page>
        <news-page class="home-page"></news-page>
        <character-page class="home-page"></character-page>
        <story-page class="home-page"></story-page>
        <gallery-page class="home-page"></gallery-page>
        <footer-bar class="home-page"></footer-bar>
      </div>
    </div>
  </div>
</template>

<script>
import '../plugins/fullpage.min.js'
import pageNav from '../components/Nav'
import topPage from '../pages/home/Top'
import newsPage from '../pages/home/News'
import characterPage from '../pages/home/Character'
import storyPage from '../pages/home/Story'
import galleryPage from '../pages/home/Gallery'
import FooterBar from '../components/Footer'
import cutPage from './Cut.vue'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'home',

  components: {
    pageNav,
    topPage,
    newsPage,
    characterPage,
    storyPage,
    galleryPage,
    FooterBar,
    cutPage
  },
  data: () => ({
    fullpage: null
  }),
  created () {

  },
  mounted () {
    if (this.HOME_SHOW) {
      this.initFullPage()
    }
  },
  watch: {
    HOME_SHOW (val) {
      if (val) {
        this.$nextTick(() => {
          this.initFullPage()
        })
      }
    },
    CUT_SHOW (val) {
      if (!val) {
        this.fullpage.fullScrollDisable(false)
      }
    }
  },
  computed: {
    ...mapState({
      NAVLIST: state => state.Home.NAVLIST,
      HOME_SHOW: state => state.Cut.HOME_SHOW,
      CUT_SHOW: state => state.Cut.CUT_SHOW // 活动演出已经结束
    })
  },
  methods: {
    clickEvent () {
      // 全局点击时，关闭导航栏
      this.$store.commit('Nav/SET_NAVBTN_ACTIVED', false)
    },
    initFullPage () {
      this.fullpage = new FullPage({
        containerClassName: '.home-wrap',
        pageClassName: '.home-page',
        lastBar: true,
        disableSrcollClassName: []
      })
      this.fullpage.init()
      this.$store.commit('Home/INIT_FULLPAGE', this.fullpage)

      if (this.$route.params.navIndex >= 0) {
        this.fullpage.goTo(this.$route.params.navIndex + 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home-wrap {
  width: 100%;
  .home-page {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
