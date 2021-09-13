<template>
  <mask-layer :maskActive="MASK_ACTIVE">
    <transition name="gallery-mask-wrap">
      <div class="gallery-mask-wrap" v-show="MASK_ACTIVE">
        <i class="iconfont iconguanbi gallery-btn--close" @click="closeMask"></i>
        <div class="gallery-container">
          <div class="gallery-box" :style="galleryStyle">
            <img :src="GALLERY_IMG" class="gallery-box-img" @load="imgLoad" ref="gallery-img" alt="">
          </div>
          <div class="gallery-info">
            <span class="gallery-title">
              R E C O R D<br>
              K E Y W O R D S
            </span>
            <span class="gallery-tag" v-for="(item, index) in GALLERY_TAG" :key="`gallery-tag-${index}`">{{item}}</span>
          </div>
        </div>
      </div>
    </transition>
  </mask-layer>
</template>

<script>
import MaskLayer from './MaskLayer'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'GalleryMask',

  components: {
    MaskLayer
  },
  data: () => ({
    galleryWidth: 0, // 大图宽度
    galleryHeight: 0
  }),
  created () {

  },
  mounted () {

  },
  watch: {

  },
  computed: {
    ...mapState({
      MASK_ACTIVE: state => state.Mask.GALLERY_MASK_ACTIVE,
      GALLERY_IMG: state => state.Mask.GALLERY_IMG,
      GALLERY_TAG: state => state.Mask.GALLERY_TAG
    }),
    galleryStyle () {
      if (this.galleryWidth !== 0 && this.galleryHeight !== 0) {
        return {
          'width': this.galleryWidth + 'px',
          'height': this.galleryHeight + 'px'
        }
      }
    }
  },
  methods: {
    closeMask () {
      this.galleryWidth = 0
      this.galleryHeight = 0
      this.$store.commit('Mask/SET_GALLERY_MASK_ACTIVE', {
        show: false
      })
    },
    imgLoad () {
      // 图片真实宽高
      let realWidth = this.$refs['gallery-img'].width
      let realHeight = this.$refs['gallery-img'].height
      let imgRatio = (realWidth / realHeight).toFixed(2) // 图片真实宽高比

      // 可视区宽高
      let clientWidth = document.documentElement.clientWidth
      let clientHeight = document.documentElement.clientHeight

      let widthRatio = realWidth / clientWidth
      let heightRatio = realHeight / clientHeight

      let scale = 0.8 // 缩放

      if (widthRatio > heightRatio) {
        this.galleryWidth = clientWidth * 0.8
        this.galleryHeight = Math.ceil(this.galleryWidth / imgRatio)
      } else {
        this.galleryHeight = clientHeight * 0.8
        this.galleryWidth = Math.ceil(this.galleryHeight * imgRatio)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.gallery-mask-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .gallery-btn--close {
    color: #fff;
    position: absolute;
    right: 0;
    bottom: 100%;
    font-size: pxTorem(35px);
    cursor: pointer;
  }

  .gallery-container {
    position: relative;
    flex-direction: column;

    .gallery-box {
      .gallery-box-img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .gallery-info {
      width: 100%;
      height: pxTorem(86px);
      background: #fff;
      display: flex;
      align-items: center;

      .gallery-title {
        display: inline-block;
        font-family: HelveticaInserat, sans-serif;
        font-weight: bold;
        color: #c4c4c4;
        font-size: pxTorem(16px);
        line-height: 1.5;
        text-align: justify;
        text-align-last: justify;
        border-right: 1px solid #c4c4c4;
        padding: 0 pxTorem(20px);
        margin-right: pxTorem(20px);

        &::before {
          content: "";
          display: inline-block;
          width: 0.5em;
          margin-right: 0.5em;
          height: 1em;
          background: #0096d9;
        }
      }
      .gallery-tag {
        color: #0075a9;
        font-family: "Noto Sans KR", sans-serif;
        font-size: pxTorem(16px);

        &:not(:last-child) {
          margin-right: pxTorem(10px);
        }
      }
    }
  }
}
</style>
