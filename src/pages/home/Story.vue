<template>
  <section class="story-wrap" ref="story-wrap">
    <transition name="story">
      <div class="story-cover" v-show="initShow" @mousemove="mouseMoveHandler">
        <div class="story-itme" :class="[`story-item--${item.name}`, stroySelectedIndex === index ? 'active' : (stroySelectedIndex !== -1 ? 'inactive' : '')]" v-for="(item, index) in storyList" :key="`story-item-${index}`">
          <div class="story-item-inner">
            <div class="story-image-container" :style="parallaxStyle">
              <div class="story-tip" :class="{ 'story-tip--focus': storyImageFocusIndex === index }">
                <p class="story-tip--jp">{{ item.title.jp }}</p>
                <p class="story-tip--en">{{ item.title.en }}</p>
              </div>
              <div class="story-image-wrapper" :style="parallaxStyle" :class="{ 'story-image-wrapper--focus': storyImageFocusIndex === index }">
                <img :src="item.sotryImg" class="story-image" alt="">
              </div>
              <a href="javascript: void(0);" v-show="stroySelectedIndex === -1" class="story-image-mask" @mouseenter="maskMouseEnter(index)" @mouseleave="maskMouseLeave" @click="showDetail(index)"></a>
            </div>
            <div class="story-detail">
              <i class="iconfont iconguanbi1 story-detail-close" @click="hideDetail"></i>
              <div class="story-detail-title">
                <p class="story-tip--jp">{{ item.title.jp }}</p>
                <p class="story-tip--en">{{ item.title.en }}</p>
              </div>
              <div class="story-detail-text">{{ item.detail.text }}</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Story',

  components: {

  },
  data: () => ({
    storyList: [
      {
        name: 'origin',
        title: {
          jp: '源石（オリジニウム）',
          en: 'Originiums'
        },
        sotryImg: require('../../assets/images/home/story/item_origin.png'),
        detail: {
          text: '莫大なエネルギーを秘めた黒みがかった鉱物。世界各地で巻き起こる原因不明の天災であるが、天災はこの「源石(オリジニウム)」をまるで足跡と言わんばかりに被災地に残していく。現代文明の飛躍的な進歩は、技術の発達により源石に含まれるエネルギーが産業に取り入れられ始めたことに起因する。しかしその反面、源石は恐ろしい感染症の病原でもあり、「感染者」と呼ばれる存在を生み出す原因にもなっている。'
        }
      },
      {
        name: 'infected',
        title: {
          jp: '感染者',
          en: 'Infected'
        },
        sotryImg: require('../../assets/images/home/story/item_infected.png'),
        detail: {
          text: '源石（オリジニウム）によりもたらされる感染症「鉱石病（オリパシー）」に感染した者たちの俗称。鉱石病の死亡率は理論上100%とされており、感染者は死亡時にその感染リスクを広げることから、各国では隔離や駆逐の対象とされている。生き方すら誰にも教えてもらえない彼らであったが、一人の感染者が反旗を翻すと、それは「レユニオン・ムーブメント」という波となり、多くの感染者がその中に身を投じていった。'
        }
      },
      {
        name: 'reunion',
        title: {
          jp: 'レユニオン・ムーブメント',
          en: 'Reunion'
        },
        sotryImg: require('../../assets/images/home/story/item_reunion.png'),
        detail: {
          text: '感染者であれば種族を問わず受け入れるが、非感染者に対しては極端に排他的な姿勢を見せる感染者組織。彼らは「感染者は自らの立場に誇りを持ち、積極的に力をつけ、そしてそれを行使すべきだ」と宣言し、暴力という最も原始的な手段を用いて感染者の権利を奪い返そうと目論む。とある大都市で彼らが起こした暴動に、医療機関「ロドス・アイランド」が介入したことにより、情勢は未知の領域に発展していくこととなる。'
        }
      },
      {
        name: 'rhodes',
        title: {
          jp: 'ロドス・アイランド',
          en: 'Rhodes Island'
        },
        sotryImg: require('../../assets/images/home/story/item_rhodes.png'),
        detail: {
          text: '表向きは製薬会社であり、正式名称は「ロドス・アイランド製薬」という。しかし、その実体は感染者自身の手で感染者問題の解決に取り組む専門組織であり、様々な手段を用いて感染者が巻き起こす事件を解決に導いてきた実績を持つ。前代未聞の暴動が各地で巻き起こる中、新たにロドスに加わったドクターの決断が、ロドスの未来を決めることになるだろう。'
        }
      },
      {
        name: 'mortal',
        title: {
          jp: '移動都市',
          en: 'Nomadic City'
        },
        sotryImg: require('../../assets/images/home/story/item_mortal_city.png'),
        detail: {
          text: '移動可能な基礎の上に建設された都市。天災がこの大地を席巻した後、ほぼ全て国家が天災からの避難を余儀なくされたことにより、その需要の下長い年月を経て開発、確立されていった都市形態である。始めは小さな集落や各種装置を移動式の基礎に搭載する程度の規模だったが、文明と技術の発達によりそれは徐々に拡大し、最終的に人々はとてつもなく巨大な移動都市を造り上げるに至った。'
        }
      },
      {
        name: 'crafts',
        title: {
          jp: '源石術（オリジニウムアーツ）',
          en: 'Originium Arts'
        },
        sotryImg: require('../../assets/images/home/story/item_art_crafts.png'),
        detail: {
          text: '源石（オリジニウム）の特性を利用し、物質の形や性質を変化させる技術。一般的には「アーツ」と呼ばれている。アーツのエネルギー源は源石であると広く認知されているが、源石さえあれば誰でもアーツを扱えるというわけではなく、アーツを行使できるか否か、その性質、強度、効果などはアーツを扱う者の先天的な素質と、その学習能力により決定される。'
        }
      }
    ],
    storyImageFocusIndex: -1, // 图片缩放标识
    stroySelectedIndex: -1, // 图片选中标识
    initShow: false, // 第一次进入该板块标识
    parallax_pos: { // 视差偏移值
      x: 0,
      y: 0
    },
    mouse_pos: { // 鼠标屏幕移动坐标
      x: 0,
      y: 0
    }
  }),
  created () {

  },
  mounted () {
  },
  watch: {
    NAV_ACTIVE_INDEX (val) {
      if (val === 4) {
        this.initShow = true
        this.animateImage() // 开启动画
      }
    }
  },
  computed: {
    ...mapGetters({
      NAV_ACTIVE_INDEX: 'Home/NAV_ACTIVE_INDEX'
    }),
    parallaxStyle () { // 鼠标滑动时，视差样式
      return `transform: translate(${this.parallax_pos.x}%, ${this.parallax_pos.y}%);`
    }
  },
  methods: {
    maskMouseEnter (index) {
      this.storyImageFocusIndex = index
    },
    maskMouseLeave () {
      this.storyImageFocusIndex = -1
    },
    showDetail (index) {
      this.stroySelectedIndex = index
    },
    hideDetail () {
      this.stroySelectedIndex = -1
      this.animateImage()
    },
    getStep (delValue, minValue) {
      if (Math.abs(delValue) - minValue < 0) {
        return delValue
      }
      let stepValue = Math.abs(delValue / 20)
      stepValue = (stepValue - minValue) > 0 ? stepValue : minValue
      return delValue > 0 ? stepValue : (stepValue * -1)
    },
    mouseMoveHandler (event) {
      let boxW = this.$refs['story-wrap'].clientWidth
      let boxH = this.$refs['story-wrap'].clientHeight

      this.mouse_pos.x = (event.clientX / boxW - 0.5) * 5
      this.mouse_pos.y = (event.clientY / boxH - 0.5) * 5
    },
    animateImage () {
      this.parallax_pos.x = this.parallax_pos.x + this.getStep(this.mouse_pos.x - this.parallax_pos.x, 0.001)
      this.parallax_pos.y = this.parallax_pos.y + this.getStep(this.mouse_pos.y - this.parallax_pos.y, 0.001)

      if (this.NAV_ACTIVE_INDEX === 4 && this.stroySelectedIndex === -1) { // 离开停止
        window.requestAnimationFrame(this.animateImage)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.story-wrap {
  background: url("../../assets/images/home/story/bg.jpg") no-repeat;
  background-size: cover;

  .story-cover {
    position: relative;
    width: 100%;
    height: 100%;

    .story-itme {
      position: absolute;
      transition: all ease-in-out 0.3s;

      .story-item-inner {
        position: absolute;
        width: 80%;
        height: 80%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        // background: rgb(153, 153, 153);

        .story-image-container {
          position: absolute;
          width: 50%;
          height: 0;
          padding-top: 50%;

          &::before {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url("../../assets/images/home/story/item_shadow.png")
              no-repeat;
            background-size: 100% 100%;
            transition: all ease-in-out 0.3s;
          }

          .story-tip {
            position: absolute;
            left: 22.5%;
            width: 0;
            transition: all ease-in-out 0.3s;
            overflow: hidden;
            opacity: 0.5;
            font-size: 0;

            .story-tip--jp {
              font-family: "rohonminsink";
              font-size: pxTorem(24px);
              line-height: 1;
              white-space: nowrap;
            }
            .story-tip--en {
              font-family: "rohonminsink";
              font-size: pxTorem(18px);
              line-height: 1.5;
              white-space: nowrap;
            }

            &.story-tip--focus {
              width: 100%;
              opacity: 1;
            }
          }

          .story-image-wrapper {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            // background: lightskyblue;

            .story-image {
              transition: transform ease-in-out 0.3s;
              width: 100%;
              height: 100%;
            }

            &.story-image-wrapper--focus {
              .story-image {
                transform: scale(1.1);
              }
            }
          }
          .story-image-mask {
            display: block;
            position: absolute;
            left: 25%;
            right: 25%;
            top: 0;
            bottom: 0;
            cursor: pointer;
            background: transparent;
            // background: #d8674583;
          }
        }
        .story-detail {
          opacity: 0;
          position: relative;
          top: 50%;
          transform: translateY(-50%);
          margin: 0 18% 0 46%;

          .story-detail-close {
            position: absolute;
            color: #000;
            transform-origin: left center;
            right: pxTorem(-5px);
            bottom: 100%;
            font-size: pxTorem(32px);
            cursor: pointer;
          }

          .story-detail-title {
            transform-origin: center bottom;
            transform: scaleY(0);
            font-size: 0;

            .story-tip--jp {
              font-family: "rohonminsink";
              font-size: pxTorem(55px);
              line-height: 1;
              white-space: nowrap;
            }
            .story-tip--en {
              font-family: "rohonminsink";
              font-size: pxTorem(30px);
              line-height: 1.5;
              white-space: nowrap;
            }
          }
          .story-detail-text {
            transform-origin: center bottom;
            transform: scaleY(0);
            font-family: "STHeiti", sans-serif;
            font-size: pxTorem(16px);
            color: #010101;
            border-top: 1px solid #000;
            padding-top: pxTorem(22px);
            margin-top: pxTorem(28px);
            line-height: 1.5;
          }
        }
      }

      &.story-item--origin {
        width: 80%;
        height: 80%;
        left: -5%;
        top: 5%;
        // background: lightgoldenrodyellow;
        z-index: 1;

        .story-image-container::before {
          top: 0;
          left: 0;
        }
        .story-tip {
          top: 77.5%;
        }
      }
      &.story-item--infected {
        left: 47%;
        top: 40%;
        width: 40%;
        height: 40%;
        z-index: 3;
        transition-delay: 25ms;
        // background: lightgray;

        .story-image-container::before {
          top: 15%;
          left: 5%;
        }
        .story-tip {
          top: 92.5%;
        }
      }
      &.story-item--reunion {
        left: 35%;
        top: 0;
        width: 40%;
        height: 40%;
        transition-delay: 50ms;
        // background: lightgreen;
        z-index: 4;

        .story-image-container::before {
          top: 20%;
          left: 0;
        }
        .story-tip {
          top: 97.5%;
        }
      }
      &.story-item--rhodes {
        left: 68%;
        top: 40%;
        width: 60%;
        height: 60%;
        z-index: 4;
        transition-delay: 75ms;
        // background: lightpink;

        .story-image-container::before {
          top: 0;
          left: 0;
        }
        .story-tip {
          top: 75.5%;
          left: -14% !important;
        }
      }
      &.story-item--mortal {
        left: 60%;
        top: -5%;
        width: 50%;
        height: 50%;
        z-index: 5;
        transition-delay: 0.1s;
        // background: lightskyblue;

        .story-image-container {
          transition: margin ease-in-out 0.3s;
        }

        .story-image-container::before {
          top: 20%;
          left: 0;
        }
        .story-tip {
          top: 97.5%;
        }
      }
      &.story-item--crafts {
        left: 25%;
        top: 46%;
        width: 50%;
        height: 50%;
        transition-delay: 125ms;
        // background: lightseagreen;
        z-index: 2;

        .story-image-container::before {
          top: 10%;
          left: 0;
        }
        .story-tip {
          top: 95%;
        }
      }

      // active
      &.active {
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        opacity: 1;
        z-index: 99;

        &.story-item--mortal {
          .story-image-container {
            margin-top: -5%;
            margin-left: -3%;
          }
        }

        .story-detail {
          transition: all ease-in-out 0.3s 0.3s;
          opacity: 1;

          .story-detail-title {
            transform: none;
            opacity: 1;
            transition: all ease-in-out 0.3s 0.3s;
          }
          .story-detail-text {
            transition: all ease-in-out 0.3s 0.3s;
            transform: none;
            opacity: 1;
          }
        }
      }
      // inactive
      &.inactive {
        opacity: 0;
        transform: translateY(-100%);
      }
    }
  }

  .story-enter-active,
  .story-leave-active {
    transition: all ease-in-out 0.6s 0.5s;
  }
  .story-enter,
  .story-leave-to {
    opacity: 0;
    transform: translateY(-20%);
  }
}
</style>
