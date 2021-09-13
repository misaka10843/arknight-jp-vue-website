<template>
  <mask-layer :maskActive="MASK_ACTIVE">
    <transition name="video-wrap">
      <div class="video-wrap" v-show="MASK_ACTIVE">
        <i class="iconfont iconguanbi video-btn--close" @click="closeMask"></i>
        <div class="video-box">
          <video ref="videoplayer" :src="VIDEO_URL" muted preload autoplay controls class="video-content" @contextmenu.prevent></video>
        </div>
      </div>
    </transition>
  </mask-layer>
</template>

<script>
import MaskLayer from './MaskLayer'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'VideoMask',

  components: {
    MaskLayer
  },
  data: () => ({
  }),
  created () {
  },
  mounted () {

  },
  watch: {

  },
  computed: {
    ...mapState({
      MASK_ACTIVE: state => state.Mask.VIDEO_MASK_ACTIVE,
      VIDEO_URL: state => state.Mask.VIDEO_URL
    })
  },
  methods: {
    closeMask () {
      this.$refs['videoplayer'].currentTime = 0
      this.$store.commit('Mask/SET_VIDEO_MASK_ACTIVE', {
        show: false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.video-wrap {
  width: 50%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .video-btn--close {
    color: #fff;
    position: absolute;
    right: 0;
    bottom: 100%;
    font-size: pxTorem(35px);
    cursor: pointer;
  }

  .video-box {
    width: 100%;
    height: auto;
    position: relative;
    padding-top: 56.25%;
    background: #000;

    .video-content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
}
.video-wrap-enter-active,
.video-wrap-leave-active {
  transition: all 0.3s ease-in-out;
}
.video-wrap-enter,
.video-wrap-leave-to {
  transform: translate(-50%, -50%) scale(1.1);
  opacity: 0;
}
</style>
