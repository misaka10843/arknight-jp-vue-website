<template>
  <section class="gallery-wrap">
    <div class="gallery-container">
      <div class="gallery-outer">
        <div class="gallery-inner">
          <div class="gallery-item" v-for="(item, index) in galleryList" :key="`gallery-item-${index}`">
            <a href="javascript: void(0);" class="gallery-link" :class="mouseEnterIndex === index ? 'gallery-link-active' : (mouseEnterIndex !== -1 ? 'gallery-link-inactive' : '')" @click="showGallery(item)" @mouseenter="mouseEnterHandler(index)" @mouseleave="mouseLeaveHandler">
              <img :src="item.thumbnailImg" :alt="item.tag" class="gallery-thumbnail">
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'gallery',
  components: {
  },
  data: () => ({
    galleryList: [
      {
        thumbnailImg: require('../../assets/images/home/gallery/thumbnail/gallery01.png'),
        galleryImg: require('../../assets/images/home/gallery/gallery01.jpg'),
        tag: ['#レユニオン', '#タルラ']
      },
      {
        thumbnailImg: require('../../assets/images/home/gallery/thumbnail/gallery02.png'),
        galleryImg: require('../../assets/images/home/gallery/gallery02.jpg'),
        tag: ['#ケルシー', '#ロドス医療センター']
      },
      {
        thumbnailImg: require('../../assets/images/home/gallery/thumbnail/gallery03.png'),
        galleryImg: require('../../assets/images/home/gallery/gallery03.jpg'),
        tag: ['#安心院', '#アンジェリーナ']
      },
      {
        thumbnailImg: require('../../assets/images/home/gallery/thumbnail/gallery04.png'),
        galleryImg: require('../../assets/images/home/gallery/gallery04.jpg'),
        tag: ['#ペンギン急便', '#休憩']
      },
      {
        thumbnailImg: require('../../assets/images/home/gallery/thumbnail/gallery05.png'),
        galleryImg: require('../../assets/images/home/gallery/gallery05.jpg'),
        tag: ['#ターゲット', '#ペンギン急便']
      },
      {
        thumbnailImg: require('../../assets/images/home/gallery/thumbnail/gallery06.png'),
        galleryImg: require('../../assets/images/home/gallery/gallery06.jpg'),
        tag: ['#イェラグ']
      },
      {
        thumbnailImg: require('../../assets/images/home/gallery/thumbnail/gallery07.png'),
        galleryImg: require('../../assets/images/home/gallery/gallery07.jpg'),
        tag: ['#ロドス', '#アーミヤ']
      },
      {
        thumbnailImg: require('../../assets/images/home/gallery/thumbnail/gallery08.png'),
        galleryImg: require('../../assets/images/home/gallery/gallery08.jpg'),
        tag: ['#ペンギン急便', '#エクシア', '#作戦行動中']
      },
      {
        thumbnailImg: require('../../assets/images/home/gallery/thumbnail/gallery09.png'),
        galleryImg: require('../../assets/images/home/gallery/gallery09.jpg'),
        tag: ['#ロドス', '#集結']
      },
      {
        thumbnailImg: require('../../assets/images/home/gallery/thumbnail/gallery10.png'),
        galleryImg: require('../../assets/images/home/gallery/gallery10.jpg'),
        tag: ['#イェラグ', '#クリフハート']
      },
      {
        thumbnailImg: require('../../assets/images/home/gallery/thumbnail/gallery11.png'),
        galleryImg: require('../../assets/images/home/gallery/gallery11.jpg'),
        tag: ['#ロドス', '#エイヤフィヤトラ']
      },
      {
        thumbnailImg: require('../../assets/images/home/gallery/thumbnail/gallery12.png'),
        galleryImg: require('../../assets/images/home/gallery/gallery12.jpg'),
        tag: ['#イェラグ', '#プラマニクス']
      },
      {
        thumbnailImg: require('../../assets/images/home/gallery/thumbnail/gallery13.png'),
        galleryImg: require('../../assets/images/home/gallery/gallery13.jpg'),
        tag: ['#レユニオン', '#タルラ']
      },
      {
        thumbnailImg: require('../../assets/images/home/gallery/thumbnail/gallery14.png'),
        galleryImg: require('../../assets/images/home/gallery/gallery14.jpg'),
        tag: ['#オリジニウム', '#天災']
      },
      {
        thumbnailImg: require('../../assets/images/home/gallery/thumbnail/gallery15.png'),
        galleryImg: require('../../assets/images/home/gallery/gallery15.jpg'),
        tag: ['#イェラグ', '#集結']
      },
      {
        thumbnailImg: require('../../assets/images/home/gallery/thumbnail/gallery16.png'),
        galleryImg: require('../../assets/images/home/gallery/gallery16.jpg'),
        tag: ['#龍門近衛局']
      }
    ],
    mouseEnterIndex: -1
  }),
  created () {

  },
  mounted () {

  },
  watch: {

  },
  computed: {

  },
  methods: {
    mouseEnterHandler (index) {
      this.mouseEnterIndex = index
    },
    mouseLeaveHandler () {
      this.mouseEnterIndex = -1
    },
    showGallery (item) {
      this.$store.commit('Mask/SET_GALLERY_MASK_ACTIVE', {
        show: true,
        img: item.galleryImg,
        tag: item.tag
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.gallery-wrap {
  background-color: #141516;

  .gallery-container {
    position: relative;
    width: 80%;
    max-width: 1400px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .gallery-outer {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 54%;

      .gallery-inner {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        overflow: hidden;
        display: flex;
        align-content: flex-start;
        flex-direction: column;
        flex-wrap: wrap;

        .gallery-item {
          width: 20%;
          position: relative;

          .gallery-link {
            display: block;
            position: relative;
            overflow: hidden;

            .gallery-thumbnail {
              display: block;
              max-width: 100%;
              height: auto;
              transition: all ease-in-out 0.3s;
            }

            &::after {
              content: "";
              display: block;
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
              transition: all ease-in-out 0.3s;
            }

            &.gallery-link-active {
              &::after {
                background: rgba(255, 255, 255, 0.068);
              }
            }
            &.gallery-link-inactive {
              &::after {
                background: rgba(0, 0, 0, 0.26);
              }
            }
            &:hover {
              .gallery-thumbnail {
                transform: translateZ(0) scale(1.1);
              }
            }
          }
        }
      }
    }
  }

  .test-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(173, 216, 230, 0.418);
    top: 0;
    left: 0;
    z-index: 999;

    .test-box {
      width: 500px;
      height: 80%;
      background: lightgray;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
