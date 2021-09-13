<template>
  <section class="top-page">
    <img src="../../assets/images/home/top/bg.png" class="bg" alt="bg">
    <video muted preload autoplay class="video-bg" id="home-top-bg" ref="home-top-bg" loop :src="topBgUrl" @canplaythrough="loaded"></video>
    <!-- right-nav -->
    <div class="right-nav">
      <div class="box-wrap">
        <div class="pv-box">
          <span class="pv-box-tip">PV</span>
          <a v-for="(item, index) in pvList" :key="`pv-${index}`" href="javascript: void(0);" @click="updateVideo(item.videoUrl !== '', item)" class="pv-box-a" :class="{ 'active': item.name === currentVideo }">{{ item.text }}</a>
        </div>
      </div>

      <div class="other-nav">
        <a :href="item.to" target="_blank" class="link-box" v-for="(item, index) in linkList" :key="`link-${index}`">
          <img :src="item.icon" alt="">
        </a>
      </div>
    </div>
    <!-- btn-wrap -->
    <div class="play-btn-box" @click="showVideoMask">
      <img src="../../assets/images/home/top/play_btn.png" alt="play">
    </div>
    <div class="pre-download-box">
      <!-- <img src="../../assets/images/home/top/prebutton_bg_special.png" v-if="CUT_STAGE >= 4" class="bg" alt="">
            <img src="../../assets/images/home/top/prebutton_bg.png" v-else class="bg" alt=""> -->
      <img src="../../assets/images/home/top/prebutton_bg.png" class="bg" alt="">

      <div class="pre-button" :class="{ 'special': CUT_STAGE >= 4 }">
        <a href="https://apps.apple.com/jp/app/id1478990007?mt=8" target="_blank" class="ios-btn">
          <img src="../../assets/images/home/top/ios_btn.png" alt="">
        </a>
        <a href="https://play.google.com/store/apps/details?id=com.YoStarJP.Arknights" target="_blank" class="google-btn">
          <img src="../../assets/images/home/top/google_btn.png" alt="">
        </a>
      </div>
    </div>
    <!-- banner -->
    <!-- <div class="pre-banner-container">
            <div class="pre-banner-inner">
                <div class="pre-banner-content">
                    <swiper class="pre-banner-swiper" ref="preSwiper" :options="swiperPreOption">
                        <swiper-slide class="pre-swiper-slide" v-for="(item, index) in preBanner" :key="`pre-slide-${index}`">
                            <router-link :to="item.to" target="_blank" class="pre-slide--a">
                                <img :src="item.imgUrl" class="pre-slide--img" alt="">
                            </router-link>
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
            <div class="pre-banner-nav">
                <div class="pre-nav-item" v-for="(item, index) in preBanner" :key="`pre-nav-item-${index}`" @click="bannerSlideTo(index)">
                    <div class="pre-nav-bar" :class="{ 'active': index === swiper_activeIndex }" :style="{ 'transitionDuration': `${swiperPreOption.autoplay.delay}ms` }"></div>
                </div>
            </div>
        </div> -->
    <!-- scroll logo -->
    <div class="scroll-box">
      <img src="../../assets/images/logo02.png" class="logo" alt="logo">
      <div class="mouse-box">
        <div class="mouse-tip">
          <img src="../../assets/images/home/top/mouse.png" class="mouse" alt="">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'top',

  components: {
    swiper,
    swiperSlide
  },
  data: () => ({
    swiperDom: null,
    swiperPreOption: {
      initialSlide: 0,
      loop: false,
      allowTouchMove: true,
      preventClicks: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      }
    },
    preBanner: [
      /* {
                to: '/cbt',
                imgUrl: require("../../assets/images/home/top/cbt.png")
            }, */
      {
        to: '/prereg',
        imgUrl: require('../../assets/images/home/top/prereg1.png')
      }
    ],
    topBgUrl: require('../../assets/video/home_top_bg.mp4'),
    pvList: [
      {
        text: 'EP5',
        videoUrl: require('../../assets/video/ep5.mp4'),
        name: 'ep5'
      },
      {
        text: '001',
        videoUrl: require('../../assets/video/pv01.mp4'),
        name: 'pv001'
      },
      {
        text: '002',
        videoUrl: require('../../assets/video/home_top_bg.mp4'),
        name: 'pv002'
      },
      {
        text: '003',
        videoUrl: require('../../assets/video/pv03.mp4'),
        name: 'pv003'
      }
    ],
    linkList: [
      {
        icon: require('../../assets/images/home/top/twitter_icon.png'),
        to: 'https://twitter.com/ArknightsStaff'
      },
      {
        icon: require('../../assets/images/home/top/yotube_icon.png'),
        to: 'https://www.youtube.com/channel/UCvoQlzEzqa6vQA8hq9GNNug'
      }
      /* {
                icon: require("../../assets/images/home/top/prereg.svg"),
                to: "/prereg"
            }, */
      /* {
                icon: require("../../assets/images/home/top/cbt.svg"),
                to: "/cbt"
            } */
    ],
    currentVideo: 'pv002'
  }),
  created () {
    // 初始视频
    this.$store.commit('Mask/SET_VIDEO_MASK_ACTIVE', {
      show: false,
      videoUrl: this.pvList[2].videoUrl
    })
  },
  mounted () {
    // this.swiperDom = this.swiper;
  },
  watch: {
  },
  computed: {
    swiper () {
      return this.$refs.preSwiper.swiper
    },
    swiper_activeIndex () {
      if (this.swiperDom) {
        return this.swiperDom.realIndex
      }
    },
    ...mapState({
      CUT_STAGE: state => state.Cut.CUT_STAGE,
      CUT_SHOW: state => state.Cut.CUT_SHOW
    })
  },
  methods: {
    loaded () {
      console.log('video load')
    },
    updateVideo (open, item) {
      if (!open) {
        return false
      }
      this.currentVideo = item.name
      this.$store.commit('Mask/SET_VIDEO_MASK_ACTIVE', {
        show: false,
        videoUrl: item.videoUrl
      })
    },
    showVideoMask () {
      this.$store.commit('Mask/SET_VIDEO_MASK_ACTIVE', {
        show: true
      })
    },
    bannerSlideTo (index) {
      this.swiper.slideTo(index + 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.top-page {
  background: #000;

  .bg {
    position: absolute;
    width: 100%;
    bottom: 0;
    z-index: 1;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .video-bg {
    position: absolute;
    z-index: 2;
    width: auto;
    height: auto;
    min-width: 100%;
    min-height: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: url("../../assets/images/home/top/bg_texture.png");
    z-index: 3;
  }

  /* nav */
  .right-nav {
    position: absolute;
    z-index: 4;
    top: pxTorem(15px);
    right: pxTorem(26px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    font-family: HelveticaInserat, sans-serif;

    .box-wrap {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    .pv-box {
      order: 2;
      color: #fff;
      font-size: 0;
      .pv-box-tip {
        font-size: pxTorem(16px);
      }
      .pv-box-a {
        font-size: pxTorem(18px);
        margin-left: pxTorem(12px);
        opacity: 0.5;
        cursor: pointer;
        color: #fff;

        &.active {
          opacity: 1;
          border-bottom: 2px solid #06a3da;
        }
      }
    }
    .other-nav {
      width: pxTorem(30px);

      .link-box {
        display: block;
        width: 100%;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        img {
          width: 100%;
          opacity: 1;
          transition: all 0.3s ease-in-out;
        }
        &:nth-of-type(2) {
          display: block;
          width: 240%;
        }
        &:nth-of-type(3) {
          display: block;
          width: 180%;
        }
        &:nth-of-type(4) {
          display: block;
          width: 180%;
        }
        /* &:hover {
                    img {
                        opacity: 1;
                    }
                } */
      }
    }
  }

  .play-btn-box {
    position: absolute;
    width: pxTorem(92px);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 4;
    cursor: pointer;

    img {
      width: 100%;
      opacity: 0;
      transition: all 0.3s ease-in-out;
    }

    &:hover {
      img {
        opacity: 1;
      }
    }
  }
  .pre-download-box {
    position: absolute;
    width: pxTorem(820px);
    bottom: pxTorem(78px);
    z-index: 4;
    left: 50%;
    transform: translateX(-50%);

    .pre-a {
      width: 100%;
      .pre-img {
        width: 100%;
      }
    }

    .bg {
      width: 100%;
    }
    .pre-button {
      width: pxTorem(400px);
      position: absolute;
      display: flex;
      left: pxTorem(40px);
      bottom: pxTorem(35px);
      z-index: 2;

      &.special {
        bottom: pxTorem(25px);
      }

      a {
        flex: 1;
        display: block;
        img {
          width: 100%;
        }

        &:first-child {
          margin-right: pxTorem(15px);
        }
      }
    }
  }
  .pre-banner-container {
    position: absolute;
    width: pxTorem(820px);
    bottom: pxTorem(78px);
    z-index: 4;
    left: 50%;
    transform: translateX(-50%);

    .pre-banner-inner {
      width: 100%;
      height: 0;
      padding-top: 34.65%;
      position: relative;

      .pre-banner-content {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;

        .pre-banner-swiper {
          width: 100%;
          height: 100%;

          .pre-slide--a {
            display: block;
            width: 100%;
            height: 100%;

            .pre-slide--img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }
      }
    }
    .pre-banner-nav {
      display: flex;
      justify-content: center;
      margin-top: pxTorem(10px);

      .pre-nav-item {
        width: pxTorem(60px);
        height: pxTorem(10px);
        box-sizing: border-box;
        border: 2px solid #fff;
        font-size: 0;
        position: relative;
        cursor: pointer;

        &:not(:last-of-type) {
          margin-right: pxTorem(8px);
        }

        .pre-nav-bar {
          display: block;
          width: 0;
          height: 100%;
          background: #fff;
          position: absolute;
          left: 0;
          transition: none;

          &.active {
            width: 100%;
            transition-property: all;
            transition-timing-function: linear;
          }
        }
      }
    }
  }
  .scroll-box {
    width: pxTorem(482px);
    position: absolute;
    z-index: 4;
    right: pxTorem(45px);
    bottom: 0%;

    .logo {
      width: 100%;
      margin-bottom: pxTorem(35px);
    }
    .mouse-box {
      width: pxTorem(30px);
      height: pxTorem(300px);
      position: relative;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;

      &::before {
        content: "";
        display: block;
        width: 2px;
        background: #fff;
        height: pxTorem(300px);
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        animation: FadeOut 3s ease-in-out infinite backwards;
      }

      .mouse-tip {
        width: pxTorem(30px);
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        animation: FadeOut 3s ease-in-out infinite backwards;

        .mouse {
          width: pxTorem(20px);
        }

        &::before {
          content: "scroll";
          position: absolute;
          transform-origin: left top;
          transform: translate(pxTorem(-4px), pxTorem(0px)) rotateZ(90deg);
          color: #fff;
          text-transform: uppercase;
          font-size: pxTorem(12px);
        }

        &::after {
          content: "";
          display: block;
          width: 2px;
          background: #fff;
          height: pxTorem(280px);
          position: relative;
          left: 50%;
          transform: translateX(-50%);
          animation: translt 3s ease-in-out infinite backwards;
        }

        @keyframes translt {
          0% {
            height: pxTorem(200px);
          }
          100% {
            height: pxTorem(20px);
          }
        }
      }

      @keyframes FadeOut {
        0% {
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
    }
  }
}
</style>
