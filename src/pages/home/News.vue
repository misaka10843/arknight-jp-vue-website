<template>
  <section class="news-page">
    <div class="news-container">
      <div class="news-tag-box">
        <ul class="news-tag-ul">
          <template v-for="(tag, index) in tagList">
            <li class="news-tag-li" :class="{ 'active': tagId === tag.id }" :key="`tag-li-${index}`" @click="pickTag(tag)" v-show="tag.show">{{ tag.text }}</li>
          </template>
        </ul>
      </div>
      <div class="news-banner-box">
        <swiper class="news-banner-swiper" ref="newsSwiper" :options="swiperNewsOption">
          <swiper-slide class="news-swiper-slide" v-for="(item, index) in newsBanner" :key="`news-${index}`">
            <router-link class="news-banner-link" :to="`/news/${item.id}`" target="_blank">
              <img :src="item.content[0].bannerUrl" class="news-banner-img" alt="">
              <div class="news-info-box">
                <p class="news-info-time">{{ $utils.formatTime(item.publishedAt) }}</p>
                <p class="news-info-title">
                  <span>{{ item.title }}</span>
                </p>
                <p class="news-more">READ MORE +</p>
              </div>
            </router-link>
          </swiper-slide>
        </swiper>
        <div class="swiper-nav-wrap">
          <div class="swiper-nav-box" v-for="(item, index) in newsBanner" :key="`swiper-nav-${index}`" @click="slideToNews(index)">
            <div class="swiper-nav-item" :class="{ 'active': swiper_activeIndex === index }" :style="{ 'transitionDuration': `${swiperNewsOption.autoplay.delay}ms` }"></div>
          </div>
        </div>
      </div>
      <div class="news-content">
        <router-link :to="routerTo(item)" target="_blank" class="news-box" :class="{ 'place': !item }" v-for="(item, index) in initNewsList" :key="`news-box-${index}`">
          <div class="news-inner" v-if="item">
            <p class="news-row">
              <span class="news-tag">{{ tagMap[item.category] }}</span>
              <span class="news-time">{{ $utils.formatTime(item.publishedAt) }}</span>
            </p>
            <p class="news-title">{{ item.title }}</p>
            <p class="news-more">READ MORE +</p>
          </div>
        </router-link>
      </div>
      <div class="news-more-row">
        <router-link to="/news" target="_blank" class="news-more-button">
          <i class="iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></i>
          <span>MORE</span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

export default {
  name: 'news',

  components: {
    swiper,
    swiperSlide
  },
  data: () => ({
    tagList: [
      {
        id: 0,
        text: 'すべて',
        show: true
      },
      {
        id: 2,
        text: 'イベント',
        show: false
      },
      {
        id: 1,
        text: 'お知らせ',
        show: false
      },
      {
        id: 4,
        text: 'メンテナンス',
        show: false
      },
      {
        id: 3,
        text: 'アップデート',
        show: false
      }
    ],
    tagId: 0, // 当前新闻类别id
    initNewsList: [],
    swiperDom: null,
    swiperNewsOption: {
      initialSlide: 0,
      allowTouchMove: false,
      preventClicks: false,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      }
    },
    newsBanner: []
  }),
  created () {
    if (process.env.VUE_APP_ENV !== 'online' && this.$route.query.userToken) {
      this.$router.push({ path: `/news/preview`, query: { userToken: this.$route.query.userToken } })
    }
    this.getNewsBanner()
    this.getInitNews()
    this.setNewsTagShow()
  },
  mounted () {
    this.swiperDom = this.swiper
  },
  watch: {
  },
  computed: {
    swiper () {
      return this.$refs.newsSwiper.swiper
    },
    swiper_activeIndex () {
      if (this.swiperDom) {
        return this.swiperDom.realIndex
      }
    },
    tagMap () {
      let map = {}
      for (let i = 0, len = this.tagList.length; i < len; i++) {
        map[this.tagList[i].id] = this.tagList[i].text
      }
      return map
    }
  },
  methods: {
    pickTag (tag) {
      this.tagId = tag.id
      this.getInitNews()
    },
    slideToNews (index) {
      if (this.swiperDom) {
        this.swiperDom.slideTo(index)
      }
    },
    setNewsTagShow () {
      for (let i = 0, len = this.tagList.length; i < len; i++) {
        if (this.tagList[i].show == false) {
          this.checkNewsLen(this.tagList[i])
        }
      }
    },
    checkNewsLen (tag) {
      this.axios.get(`${process.env.VUE_APP_NEWS_HOST}/news/withHighlights`, {
        params: {
          lang: 'ja',
          category: tag.id,
          limit: 6,
          page: 1
        }
      }).then(v => {
        if (v.code == 20000 && v.data.total > 0) {
          tag.show = true
        }
      }).catch(e => {
        console.log(e)
      })
    },
    getInitNews () {
      this.axios.get(`${process.env.VUE_APP_NEWS_HOST}/news/withHighlights`, {
        params: {
          lang: 'ja',
          category: this.tagId == 0 ? undefined : this.tagId,
          limit: 6,
          page: 1
        }
      }).then(v => {
        // this.newsBanner = v.data.withHighlights.items
        if (v.data.items.length > 6) {
          this.initNewsList = v.data.items.slice(0, 6)
        } else if (v.data.items.length < 6) {
          let newslist = v.data.items
          newslist.length = 6
          this.initNewsList = newslist
        } else {
          this.initNewsList = v.data.items
        }
      }).catch(e => {
        console.log(e)
      })
    },
    getNewsBanner () {
      this.axios.get(`${process.env.VUE_APP_NEWS_HOST}/news/withHighlights`, {
        params: {
          lang: 'ja',
          limit: 6,
          page: 1
        }
      }).then(v => {
        if (v.code == 20000) {
          this.newsBanner = v.data.withHighlights.items
        }
      }).catch(e => {
        console.log(e)
      })
    },
    routerTo (item) {
      if (item && item.id) {
        return `/news/${item.id}`
      } else {
        return '/news'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.news-page {
  background: url("../../assets/images/home/news/bg.jpg") no-repeat;
  background-size: cover;

  .news-container {
    position: absolute;
    width: pxTorem(1300px);
    box-sizing: border-box;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .news-tag-box {
      width: 100%;
      height: pxTorem(50px);
      border: 1px solid #535353;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-end;
      margin-bottom: pxTorem(23px);

      .news-tag-ul {
        display: flex;
        height: 100%;

        .news-tag-li {
          height: 100%;
          line-height: pxTorem(50px);
          font-family: "STHeiti", sans-serif;
          font-size: pxTorem(24px);
          font-weight: bold;
          color: #898989;
          padding: 0 pxTorem(18px);
          cursor: pointer;

          &.active {
            background: #22bbff;
            color: #000;
          }
        }
      }
    }
    .news-banner-box {
      width: 100%;
      height: 0;
      padding-top: 18.28%;
      box-sizing: border-box;
      border: 1px solid #535353;
      position: relative;

      .news-banner-swiper {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;

        .news-swiper-slide {
          width: 100%;
          height: 100%;

          .news-banner-link {
            width: 100%;
            height: 100%;
            display: block;
            position: relative;
            z-index: 3;
            overflow: hidden;

            .news-banner-img {
              width: 100%;
              height: 100%;
            }
            .news-info-box {
              position: absolute;
              width: 34%;
              height: 100%;
              top: 0;
              right: 0;
              box-sizing: border-box;
              padding: pxTorem(20px);
              display: flex;
              flex-direction: column;
              justify-content: space-between;

              .news-info-time {
                color: #fe2;
                font-family: "Bender";
                font-size: pxTorem(20px);
                text-align: right;
              }
              .news-info-title {
                width: 100%;
                font-size: 0;
                padding-top: pxTorem(14px);
                position: relative;

                span {
                  display: block;
                  width: 100%;
                  font-size: pxTorem(20px);
                  font-family: "STHeiti";
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  color: #898989;
                }

                &::before {
                  content: "";
                  display: block;
                  width: pxTorem(40px);
                  height: 4px;
                  background: #fe2;
                  position: absolute;
                  border-radius: 3px;
                  top: 0;
                  left: 0;
                  transform: translateY(-50%) translateZ(0);
                }
                &::after {
                  content: "";
                  display: block;
                  width: pxTorem(355px);
                  height: 1px;
                  border-radius: 3px;
                  background: #898989;
                  position: absolute;
                  top: 0;
                  right: 0;
                  transform: translateY(-50%);
                }
              }
              .news-more {
                width: pxTorem(166px);
                height: pxTorem(24px);
                background: #fe2;
                color: #141515;
                font-family: "Bender";
                font-size: pxTorem(18px);
                line-height: pxTorem(24px);
                align-self: flex-end;
                text-align: right;
                box-sizing: border-box;
                padding-right: pxTorem(10px);
              }
            }
          }
        }
      }
      .swiper-nav-wrap {
        position: absolute;
        bottom: pxTorem(15px);
        left: pxTorem(10px);
        display: flex;
        z-index: 3;

        .swiper-nav-box {
          width: pxTorem(65px);
          height: pxTorem(5px);
          background: rgba(255, 255, 255, 0.4);
          transition: all 0.3s ease-in-out;
          cursor: pointer;

          &:not(:last-child) {
            margin-right: pxTorem(5px);
          }

          .swiper-nav-item {
            background: rgba(255, 255, 255, 0.8);
            width: 0;
            height: 100%;
            transition: none;
            display: block;

            &.active {
              width: 100%;
              transition-property: all;
              transition-timing-function: linear;
            }
          }
        }
      }

      &:hover {
        .swiper-nav-wrap {
          .swiper-nav-box {
            height: pxTorem(10px);
          }
        }
      }
    }
    .news-content {
      width: 100%;
      display: flex;
      flex-wrap: wrap;

      .news-box {
        display: block;
        width: 33.33%;
        height: 0;
        padding-top: 16.66%;
        border-right: 1px solid #535353;
        border-bottom: 1px solid #535353;
        box-sizing: border-box;
        position: relative;

        &:nth-of-type(3n + 1) {
          border-left: 1px solid #535353;
        }

        .news-inner {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          box-sizing: border-box;
          padding: pxTorem(25px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          cursor: pointer;
          transition: all 0.3s ease-in-out;

          .news-row {
            font-size: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .news-tag {
              color: #22bbff;
              font-family: "STHeiti";
              font-size: pxTorem(24px);
              font-weight: bold;
            }
            .news-time {
              color: #898989;
              font-size: pxTorem(24px);
              font-family: "Bender";
            }
          }
          .news-title {
            width: 100%;
            font-size: pxTorem(20px);
            font-family: "SourceHanSansSubset";
            color: #fff;
            // white-space: nowrap;
            // overflow: hidden;
            // text-overflow: ellipsis;
            overflow: hidden;
            -webkit-line-clamp: 2;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;

            &::before {
              content: "";
              display: block;
              width: pxTorem(65px);
              height: pxTorem(8px);
              background: #22bbff;
              margin-bottom: pxTorem(20px);
            }
          }
          .news-more {
            width: pxTorem(166px);
            height: pxTorem(24px);
            background: #22bbff;
            color: #141515;
            font-family: "Bender";
            font-size: pxTorem(18px);
            line-height: pxTorem(24px);
            align-self: flex-end;
            text-align: right;
            box-sizing: border-box;
            padding-right: pxTorem(10px);
          }

          &:hover {
            background: #22bbff;
            .news-row {
              .news-tag {
                color: #000000;
              }
              .news-time {
                color: #000;
              }
            }
            .news-title {
              &::before {
                background: #000;
              }
            }
            .news-more {
              background: #141515;
              color: #fff;
            }
          }
        }

        &.place {
          visibility: hidden;
        }
      }
    }
    .news-more-row {
      width: 100%;
      margin-top: pxTorem(18px);
      display: flex;
      justify-content: flex-end;

      .news-more-button {
        display: block;
        width: pxTorem(193px);
        height: pxTorem(48px);
        box-sizing: border-box;
        border: 1px solid #22bbff;
        color: #fff;
        font-size: 0;
        line-height: pxTorem(46px);
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        i {
          font-size: pxTorem(20px);
          margin-right: pxTorem(10px);
        }
        span {
          font-family: "STHeiti";
          font-size: pxTorem(18px);
        }

        &:hover {
          background: #22bbff;
          color: #000;
        }
      }
    }
  }
}
</style>
