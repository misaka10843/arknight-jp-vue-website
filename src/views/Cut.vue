<template>
  <div class="cut-page" :class="{ 'cut-page-hide': transStage >= 2 }">
    <div class="middle-originium-wrap" :class="{ 'middle-originium-wrap-hide': transStage >= 2 }">
      <div class="middle-originium-container">
        <div class="middle-originium">
          <!-- cut container -->
          <div class="cut-container">
            <div class="cut-1 cut-box" ref="cut-1" :class="{ 'cut-animation-1': stepStage >= 1 }"></div>
            <div class="cut-show-1 cut-show-box" :class="{ 'cut-show': cutShowStage >= 1 }">
              <div class="cut-show-dot-1 cut-show-dot"></div>
              <div class="cut-show-dot-2 cut-show-dot"></div>
            </div>

            <div class="cut-2 cut-box" ref="cut-2" :class="{ 'cut-animation-2': stepStage >= 2 }"></div>
            <div class="cut-show-2 cut-show-box" :class="{ 'cut-show': cutShowStage >= 2 }">
              <div class="cut-show-dot-1 cut-show-dot"></div>
              <div class="cut-show-dot-2 cut-show-dot"></div>
              <div class="cut-show-dot-3 cut-show-dot"></div>
            </div>

            <div class="cut-3 cut-box" ref="cut-3" :class="{ 'cut-animation-3': stepStage >= 3 }"></div>
            <div class="cut-show-3 cut-show-box" :class="{ 'cut-show': cutShowStage >= 3 }">
              <div class="cut-show-dot-1 cut-show-dot"></div>
              <div class="cut-show-dot-2 cut-show-dot"></div>
              <div class="cut-show-dot-3 cut-show-dot"></div>
            </div>

            <div class="cut-4 cut-box" ref="cut-4" :class="{ 'cut-animation-4': stepStage >= 4 }"></div>
            <div class="cut-show-4 cut-show-box" :class="{ 'cut-show': cutShowStage >= 4 }"></div>
          </div>
        </div>

        <effect class="effect-area-1" v-if="cutShowStage >= 1"></effect>
        <effect class="effect-area-2" v-if="cutShowStage >= 2"></effect>
        <effect class="effect-area-3" v-if="cutShowStage >= 3"></effect>
        <effect class="effect-area-4" v-if="cutShowStage >= 4"></effect>
      </div>
    </div>
    <!-- cut mask -->
    <div class="cut-mask" :class="`cut-mask-flicker-${CUT_STAGE}`"></div>
    <!-- pv mask -->
    <div class="pv-mask-wrap" :class="{ 'pv-mask-animation': transStage>= 1, 'pv-mask-wrap-hide': transStage >= 2 }">
      <div class="pv-mask-container" :class="{ 'pv-mask-container-animation': transStage>= 1 }"></div>
    </div>
    <div class="pv-box-wrap" :class="{ 'pv-box-wrap-animation': transStage >= 2 }">
      <div class="pv-box" ref="pv-box" :class="{ 'pv-box-animation': transStage >= 2 }">
      </div>
    </div>
    <div class="pv-content" v-if="CUT_STAGE >= 4" :class="{ 'pv-content-show': transStage >= 2 }">
      <div class="skip-button" @click="skip">
        <img src="../assets/images/cut/skip.png" alt="">
      </div>
      <div class="audio-button" v-if="transStage >= 2">
        <i class="iconfont audio-icon" :class="[videoMuted ? 'iconjingyin' : 'iconshengyin' ]" @click="toggleAudio"></i>
      </div>
      <video class="pv-player" ref="pv-player" :muted="videoMuted" preload :src="videoUrl" x5-video-player-type='h5' x5-video-player-fullscreen='true' playsinline webkit-playsinline></video>
    </div>
  </div>
</template>

<script>
// ------------------------------------ 活动演出已结束 -----------------------------------------

import effect from '../components/Effect.vue'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Cut',

  components: {
    effect
  },
  data: () => ({
    transStage: 0, // 转场阶段
    stepStage: 0, // 分段阶段
    cutShowStage: 0,
    videoMuted: true, // 视频声音是否静音
    videoUrl: require('../assets/video/ep5.mp4')
  }),
  created () {
    if (process.env.VUE_APP_ENV !== 'online' && this.$route.query.stage >= 1) {
      this.$store.commit('Cut/SET_CUT_STAGE', this.$route.query.stage)
    }
  },
  mounted () {
    setTimeout(() => {
      this.CUT_STAGE >= 1 && (this.stepStage += 1)

      this.prefixedEventListener(this.$refs['cut-1'], 'animationend', () => {
        console.log('cut-animation-1 end.')
        this.cutShowStage += 1
        this.CUT_STAGE >= 2 && (this.stepStage += 1)
        this.CUT_STAGE == 1 && setTimeout(() => {
          this.transStage += 1
          setTimeout(() => {
            this.transStage += 1
          }, 1800)
        }, 500)
      })
      this.prefixedEventListener(this.$refs['cut-2'], 'animationend', () => {
        console.log('cut-animation-2 end.')
        this.cutShowStage += 1
        this.CUT_STAGE >= 3 && (this.stepStage += 1)
        this.CUT_STAGE == 2 && setTimeout(() => {
          this.transStage += 1
          setTimeout(() => {
            this.transStage += 1
          }, 1800)
        }, 500)
      })
      this.prefixedEventListener(this.$refs['cut-3'], 'animationend', () => {
        console.log('cut-animation-3 end.')
        this.cutShowStage += 1
        this.CUT_STAGE >= 4 && (this.stepStage += 1)
        this.CUT_STAGE == 3 && setTimeout(() => {
          this.transStage += 1
          setTimeout(() => {
            this.transStage += 1
          }, 1800)
        }, 500)
      })
      this.prefixedEventListener(this.$refs['cut-4'], 'animationend', () => {
        console.log('cut-animation-4 end.')
        this.cutShowStage += 1

        setTimeout(() => {
          this.transStage += 1
          setTimeout(() => {
            this.transStage += 1
          }, 1800)
        }, 500)
      })
      this.prefixedEventListener(this.$refs['pv-box'], 'animationend', () => {
        console.log('pv-box-animation end.')

        if (this.CUT_STAGE >= 4) {
          let playPromise = this.$refs['pv-player'].play()
          if (playPromise !== undefined) {
            playPromise.then(() => {
              console.log('play video.')
            }).catch(error => {
              console.error('play error: ', error)
            })
          }
        } else {
          this.skip()
        }
      })
    }, 2000)

    if (this.CUT_STAGE >= 4) {
      this.$refs['pv-player'].addEventListener('ended', () => {
        console.log('video end')
        this.skip()
      })
    }
  },
  watch: {
    transStage (val) {
      if (val == 1) {
        this.$store.commit('Cut/SET_HOME_SHOW', true)
      }
    },
    FULLPAGE (val) {
      if (val) {
        this.FULLPAGE.fullScrollDisable(true)
      }
    }
  },
  computed: {
    ...mapState({
      CUT_STAGE: state => state.Cut.CUT_STAGE,
      FULLPAGE: state => state.Home.FULLPAGE
    })
  },
  methods: {
    prefixedEventListener (element, type, callback) { // 监听动画事件
      var pfx = ['webkit', 'moz', 'MS', 'o', '']
      for (var p = 0; p < pfx.length; p++) {
        if (!pfx[p]) type = type.toLowerCase()
        element.addEventListener(pfx[p] + type, callback, false)
      }
    },
    skip () {
      this.$store.commit('Cut/SET_CUT_SHOW', false)
    },
    toggleAudio () {
      this.videoMuted = !this.videoMuted
    }
  }
}
</script>

<style lang="scss" scoped>
.cut-page {
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background: #000 url("../assets/images/cut/background.png") no-repeat;
  background-size: cover;
  background-position: center center;
  overflow: hidden;
  z-index: 9999;

  &.cut-page-hide {
    background: none;
  }

  .middle-originium-wrap {
    position: absolute;
    width: 30%;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);

    &.middle-originium-wrap-hide {
      opacity: 0;
    }

    .middle-originium-container {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 112.92%;

      .middle-originium {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: url("../assets/images/cut/middle_back.png") no-repeat;
        background-size: cover;
        z-index: 5;

        .cut-container {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;

          .cut-box {
            position: absolute;
            width: 150vw;
            height: 35px;
            background: rgba(228, 40, 40, 0.4);
            border: 2px solid #ffe2c5;
            box-sizing: border-box;
            box-shadow: 0px 0px 5px 5px rgba(228, 40, 40, 0.4);
            opacity: 0;

            &.cut-1 {
              top: 15%;
              right: 0;
              transform-origin: right center;
              transform: rotate(-45deg) translateX(100%);
            }
            &.cut-2 {
              top: 0;
              left: 0;
              transform-origin: left center;
              transform: rotate(30deg) translateX(-100%);
            }
            &.cut-3 {
              top: 54%;
              right: 0;
              transform-origin: right center;
              transform: rotate(-10deg) translateX(100%);
            }
            &.cut-4 {
              top: 0;
              left: 25%;
              transform-origin: left center;
              transform: rotate(70deg) translateX(-100%);
            }
            &.cut-animation-1 {
              animation: chop-1 0.2s ease-in forwards;
            }
            &.cut-animation-2 {
              animation: chop-2 0.2s ease-in 0.5s forwards;
            }
            &.cut-animation-3 {
              animation: chop-3 0.2s ease-in forwards;
            }
            &.cut-animation-4 {
              animation: chop-4 0.2s ease-in forwards;
            }
          }
          .cut-show-box {
            position: absolute;
            height: 4px;
            opacity: 0;
            mix-blend-mode: color-dodge;

            .cut-show-dot {
              height: 100%;
              background: #ff3527;
              box-shadow: 0 0 10px 2px rgba(255, 53, 39, 0.5);
            }

            &.cut-show-1 {
              width: 58%;
              top: 15%;
              right: 0;
              transform-origin: right center;
              transform: rotate(-45deg) translateX(-69%);
              display: flex;

              .cut-show-dot-1 {
                width: 6%;
              }
              .cut-show-dot-2 {
                margin-left: 3%;
                width: 91%;
              }
            }
            &.cut-show-2 {
              width: 53.5%;
              top: 0;
              left: 0;
              transform-origin: left center;
              transform: rotate(30deg) translateX(75.8%);
              display: flex;

              .cut-show-dot-1 {
                width: 4%;
              }
              .cut-show-dot-2 {
                margin-left: 12%;
                width: 55%;
              }
              .cut-show-dot-3 {
                margin-left: 24%;
                width: 5%;
              }
            }
            &.cut-show-3 {
              width: 46%;
              top: 54%;
              right: 0;
              transform-origin: right center;
              transform: rotate(-10deg) translateX(-50%);
              display: flex;

              .cut-show-dot-1 {
                width: 77.5%;
              }
              .cut-show-dot-2 {
                margin-left: 5.5%;
                width: 8%;
              }
              .cut-show-dot-3 {
                margin-left: 5.5%;
                width: 3.5%;
              }
            }
            &.cut-show-4 {
              width: 66%;
              top: 0;
              left: 25%;
              transform-origin: left center;
              transform: rotate(70deg) translateX(45%);
              background: #ff3527b0;
            }
            &.cut-show {
              opacity: 1;
            }
          }
        }
      }

      .effect-area-1 {
        position: absolute;
        // background: lightyellow;
        right: 44%;
        top: 60%;
        transform: rotate(45deg);
        clip-path: polygon(36% 0, 62% 1%, 100% 100%, 0% 100%);
      }
      .effect-area-2 {
        position: absolute;
        // background: lightyellow;
        left: 70%;
        top: 27%;
        transform: rotate(-58deg);
        clip-path: polygon(41% 0, 60% 0, 100% 100%, 0% 100%);
      }
      .effect-area-3 {
        position: absolute;
        // background: rgb(197, 197, 81);
        left: -22%;
        top: 35%;
        transform: rotate(75deg);
        clip-path: polygon(41% 0, 60% 0, 100% 100%, 0% 100%);
      }
      .effect-area-4 {
        position: absolute;
        // background: rgb(129, 129, 26);
        left: 20%;
        top: 48%;
        transform: rotate(-24deg);
        clip-path: polygon(41% 0, 60% 0, 100% 100%, 0% 100%);
      }
    }
  }

  .cut-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;

    &.cut-mask-flicker-1 {
      animation: flicker-1 0.2s ease-in 2s 1;
    }
    &.cut-mask-flicker-2 {
      animation: flicker-2 0.9s ease-in 2s 1;
    }
    &.cut-mask-flicker-3 {
      animation: flicker-3 1.1s ease-in 2s 1;
    }
    &.cut-mask-flicker-4 {
      animation: flicker-4 1.3s ease-in 2s 1;
    }
  }
  .pv-mask-wrap {
    position: absolute;
    width: 280%;
    top: 40.5%;
    left: 50.5%;
    transform: translateX(-50%);

    &.pv-mask-animation {
      animation: pv-mask-animation 2s ease-in forwards;
    }
    &.pv-mask-wrap-hide {
      opacity: 0;
    }

    .pv-mask-container {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      transform: translate(-50%, -50%) rotate(45deg);
      background: transparent;
      border: 100vw solid #000;
      box-shadow: inset 0 0 0px 30vw #fff;

      &.pv-mask-container-animation {
        animation: pv-mask-container-animation 2s ease-in forwards;
      }
    }
  }
  .pv-box-wrap {
    position: absolute;
    width: 4%;
    top: 40.5%;
    left: 50.5%;
    transform: translateX(-50%);
    opacity: 0;
    z-index: 999;
    pointer-events: none;

    &.pv-box-wrap-animation {
      opacity: 1;
      animation: pv-box-wrap-animation 1.5s ease-in forwards;
    }

    .pv-box {
      position: absolute;
      z-index: 999;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      transform: translate(-50%, -50%) rotate(45deg);
      border: 100vw solid #fff;
      box-shadow: inset 0 0 0px 10px #000;
      background: #fff;

      &.pv-box-animation {
        animation: pv-box-animation 1.5s ease-in forwards;
      }
    }
  }
  .pv-content {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #000;
    top: 0;
    left: 0;
    z-index: 998;
    opacity: 0;

    .pv-player {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .skip-button {
      position: absolute;
      right: pxTorem(20px);
      top: pxTorem(20px);
      cursor: pointer;
      z-index: 2;
      width: pxTorem(150px);

      img {
        display: block;
        width: 100%;
      }
    }
    .audio-button {
      position: absolute;
      right: pxTorem(100px);
      bottom: pxTorem(100px);
      z-index: 1003;
      cursor: pointer;

      .audio-icon {
        color: #fff;
        font-size: pxTorem(35px);
        position: absolute;
        top: 0;
        left: 0;
      }
    }

    &.pv-content-show {
      opacity: 1;
    }
  }

  @keyframes chop-1 {
    80% {
      opacity: 1;
      height: 4px;
      border: 1px solid #ffe2c5;
      box-shadow: 0px 0px 10px 15px rgba(252, 26, 26, 0.4);
      transform: rotate(-45deg) translateX(40%);
      background: #ff3627;
    }
    90% {
      opacity: 1;
      height: 4px;
      border: 0px solid #ffe2c5;
      box-shadow: 0px 0px 0px 0px rgba(252, 26, 26, 0.4);
      transform: rotate(-45deg) translateX(40%);
      background: #ff3627;
    }
    100% {
      opacity: 0;
      height: 4px;
      border: 0px solid #ffe2c5;
      box-shadow: 0px 0px 0px 0px rgba(252, 26, 26, 0.4);
      transform: rotate(-45deg) translateX(40%);
      background: #ff3627;
    }
  }
  @keyframes chop-2 {
    80% {
      opacity: 1;
      height: 4px;
      border: 1px solid #ffe2c5;
      box-shadow: 0px 0px 10px 15px rgba(252, 26, 26, 0.4);
      transform: rotate(30deg) translateX(-40%);
      background: #ff3627;
    }
    90% {
      opacity: 1;
      height: 4px;
      border: 0px solid #ffe2c5;
      box-shadow: 0px 0px 0px 0px rgba(252, 26, 26, 0.4);
      transform: rotate(30deg) translateX(-40%);
      background: #ff3627;
    }
    100% {
      opacity: 0;
      height: 4px;
      border: 0px solid #ffe2c5;
      box-shadow: 0px 0px 0px 0px rgba(252, 26, 26, 0.4);
      transform: rotate(30deg) translateX(-40%);
      background: #ff3627;
    }
  }
  @keyframes chop-3 {
    80% {
      opacity: 1;
      height: 4px;
      border: 1px solid #ffe2c5;
      box-shadow: 0px 0px 10px 15px rgba(252, 26, 26, 0.4);
      transform: rotate(-10deg) translateX(40%);
      background: #ff3627;
    }
    90% {
      opacity: 1;
      height: 4px;
      border: 0px solid #ffe2c5;
      box-shadow: 0px 0px 0px 0px rgba(252, 26, 26, 0.4);
      transform: rotate(-10deg) translateX(40%);
      background: #ff3627;
    }
    100% {
      opacity: 0;
      height: 4px;
      border: 0px solid #ffe2c5;
      box-shadow: 0px 0px 0px 0px rgba(252, 26, 26, 0.4);
      transform: rotate(-10deg) translateX(40%);
      background: #ff3627;
    }
  }
  @keyframes chop-4 {
    80% {
      opacity: 1;
      height: 4px;
      border: 1px solid #ffe2c5;
      box-shadow: 0px 0px 10px 15px rgba(252, 26, 26, 0.4);
      transform: rotate(70deg) translateX(-40%);
      background: #ff3627;
    }
    90% {
      opacity: 1;
      height: 4px;
      border: 0px solid #ffe2c5;
      box-shadow: 0px 0px 0px 0px rgba(252, 26, 26, 0.4);
      transform: rotate(70deg) translateX(-40%);
      background: #ff3627;
    }
    100% {
      opacity: 0;
      height: 4px;
      border: 0px solid #ffe2c5;
      box-shadow: 0px 0px 0px 0px rgba(252, 26, 26, 0.4);
      transform: rotate(70deg) translateX(-40%);
      background: #ff3627;
    }
  }

  @keyframes flicker-1 {
    50% {
      background: rgba(255, 255, 255, 0.8);
    }
    80% {
      background: rgba(244, 103, 103, 0.7);
    }
    90% {
      background: rgba(255, 0, 0, 0);
    }
    100% {
      background: rgba(255, 0, 0, 0);
    }
  }

  @keyframes flicker-2 {
    11% {
      background: rgba(255, 255, 255, 0.8);
    }
    18% {
      background: rgba(244, 103, 103, 0.7);
    }
    20% {
      background: rgba(255, 0, 0, 0);
    }
    22% {
      background: rgba(255, 0, 0, 0);
    }
    78% {
      background: rgba(255, 0, 0, 0);
    }
    89% {
      background: rgba(255, 255, 255, 0.8);
    }
    96% {
      background: rgba(244, 103, 103, 0.7);
    }
    98% {
      background: rgba(255, 0, 0, 0);
    }
    100% {
      background: rgba(255, 0, 0, 0);
    }
  }

  @keyframes flicker-3 {
    9% {
      background: rgba(255, 255, 255, 0.8);
    }
    14% {
      background: rgba(244, 103, 103, 0.7);
    }
    16% {
      background: rgba(255, 0, 0, 0);
    }
    18% {
      background: rgba(255, 0, 0, 0);
    }

    64% {
      background: rgba(255, 0, 0, 0);
    }

    73% {
      background: rgba(255, 255, 255, 0.8);
    }
    78% {
      background: rgba(244, 103, 103, 0.7);
    }
    80% {
      background: rgba(255, 0, 0, 0);
    }
    82% {
      background: rgba(255, 0, 0, 0);
    }

    91% {
      background: rgba(255, 255, 255, 0.8);
    }
    92% {
      background: rgba(244, 103, 103, 0.7);
    }
    96% {
      background: rgba(255, 0, 0, 0);
    }
    100% {
      background: rgba(255, 0, 0, 0);
    }
  }

  @keyframes flicker-4 {
    7.5% {
      background: rgba(255, 255, 255, 0.8);
    }
    12% {
      background: rgba(244, 103, 103, 0.7);
    }
    13.5% {
      background: rgba(255, 0, 0, 0);
    }
    15% {
      background: rgba(255, 0, 0, 0);
    }

    54% {
      background: rgba(255, 0, 0, 0);
    }

    61.5% {
      background: rgba(255, 255, 255, 0.8);
    }
    66% {
      background: rgba(244, 103, 103, 0.7);
    }
    67.5% {
      background: rgba(255, 0, 0, 0);
    }
    69% {
      background: rgba(255, 0, 0, 0);
    }

    76.5% {
      background: rgba(255, 255, 255, 0.8);
    }
    81% {
      background: rgba(244, 103, 103, 0.7);
    }
    82.5% {
      background: rgba(255, 0, 0, 0);
    }
    84% {
      background: rgba(255, 0, 0, 0);
    }

    91.5% {
      background: rgba(255, 255, 255, 0.8);
    }
    96% {
      background: rgba(244, 103, 103, 0.7);
    }
    97.5% {
      background: rgba(255, 0, 0, 0);
    }
    100% {
      background: rgba(255, 0, 0, 0);
    }
  }
  @keyframes pv-mask-animation {
    0% {
      width: 280%;
    }
    45% {
      width: 4%;
    }
    55% {
      width: 4%;
    }
    100% {
      width: 200%;
    }
  }
  @keyframes pv-mask-container-animation {
    0% {
      box-shadow: inset 0 0 0px 30vw #fff;
      background: transparent;
    }
    45% {
      box-shadow: inset 0 0 0px 10px #fff;
      background: transparent;
    }
    46% {
      box-shadow: inset 0 0 0px 10px #fff;
      background: #000;
    }
    55% {
      box-shadow: inset 0 0 0px 10px #fff;
      background: #000;
    }
    70% {
      box-shadow: inset 0 0 0px 100vw #fff;
      background: #000;
    }
    71% {
      box-shadow: inset 0 0 0px 100vw #fff;
      background: #fff;
    }
    100% {
      box-shadow: inset 0 0 0px 100vw #fff;
      background: #fff;
    }
  }
  @keyframes pv-box-wrap-animation {
    0% {
      width: 4%;
    }
    100% {
      width: 280%;
    }
  }
  @keyframes pv-box-animation {
    0% {
      box-shadow: inset 0 0 0px 10px #000;
      background: #fff;
    }
    10% {
      box-shadow: inset 0 0 0px 10px #000;
      background: #fff;
    }
    20% {
      box-shadow: inset 0 0 0px 50vw #000;
      background: transparent;
    }
    50% {
      box-shadow: inset 0 0 0px 0 #000;
      background: transparent;
    }
    100% {
      box-shadow: inset 0 0 0px 0 #000;
      background: transparent;
    }
  }
}
</style>
