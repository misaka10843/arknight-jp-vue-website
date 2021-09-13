<template>
  <section class="character-wrap" :class="{ 'mask': !showRole }">
    <audio ref="say" @canplay="canplay=true" @pause="pause" @ended="playing=false" @playing="playing=true" v-if="seledRole" :src="seledRole.cvFile"></audio>

    <div class="camp-wrap">
      <!-- 阵营选择 -->
      <ul class="camp-container">
        <template v-for="(item, index) in camplist">
          <transition :name="slideType(index)" :key="`camp-${index}`">
            <li class="camp-box" v-show="showCamp" @click="showCampRole(item)">
              <img class="camp-bg" :src="item.offImg" alt />
            </li>
          </transition>
        </template>
      </ul>
    </div>
    <!-- 阵营logo -->
    <transition name="camplogo">
      <div v-show="seledCampData" class="camp-logo" @click="returnCamplist">
        <a href="javascript:void(0)" title="back">
          <div class="current-camp-logo" :style="{ 'background-image': `url(${currentCampLogo})` }"></div>
          <div class="other-camp-logo-wrap">
            <div class="other-camp-logo" v-for="(item, index) in logoList" v-show="item.logo !== currentCampLogo" :key="`camp-logo-${index}`" :style="{ 'background-image': `url(${item.logo})` }"></div>
          </div>
        </a>
      </div>
    </transition>
    <!-- 角色选择 -->
    <div class="role-wrap" v-show="showRole">
      <!-- 真实角色列表 -->
      <ul class="role-container">
        <li class="role-box" v-for="(item, index) in seledCampData.rolelist" :key="`role-${index}`">
          <div class="role-content" :class="[hoverClass(index),  seledClass(index)]" :style="[posLeft(index, seledCampData.rolelist.length), item.roleStyle]">
            <img class="role" :style="item.imgStyle" :src="item.roleImg" alt />

            <transition name="roleDetail">
              <div class="role-detail" v-show="seledRoleIndex == index" :style="item.detailStyle">
                <transition name="roleClass">
                  <div class="role-class" v-show="seledRoleIndex == index">
                    <img :src="item.roleType" alt />
                  </div>
                </transition>
                <i class="iconfont iconguanbi1 role-close" @click="closeRole"></i>
                <transition name="clip">
                  <p class="role-name--jp" v-show="seledRoleIndex == index">{{ item.roleName_jp }}</p>
                </transition>
                <transition name="clip">
                  <div class="cv-name-box" v-show="seledRoleIndex == index">
                    <p class="cv-box">
                      <a class="cv-button" href="javascript:void(0);" @click="playAudio" :class="{ 'play': playing }">
                        <img src="../../assets/images/home/character/role_cv_close.png" class="cv-btn" alt="">
                      </a>
                      <span class="cv-name">{{ item.cvName }}</span>
                    </p>
                    <p class="role-name--en">{{ item.roleName_en }}</p>
                  </div>
                </transition>
                <transition name="clip">
                  <p class="role-detail-text" v-show="seledRoleIndex == index">{{ item.detailText }}</p>
                </transition>
              </div>
            </transition>
          </div>
        </li>
      </ul>
      <!-- 触发mouseover,click事件列表 -->
      <ul class="mover-container">
        <li class="mover-box" v-for="(item, index) in seledCampData.rolelist" :style="posLeft(index, seledCampData.rolelist.length)" :key="`mover-${index}`" @mouseover="moverRole(index)" @mouseleave="mouseleaveRole" @click="selRole(index, seledRoleIndex != -1)"></li>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'character',

  components: {

  },
  data: () => ({
    logoList: [
      {
        name: 'camp01',
        logo: require('../../assets/images/home/character/camp01/logo.png')
      },
      {
        name: 'camp02',
        logo: require('../../assets/images/home/character/camp02/logo.png')
      },
      {
        name: 'camp03',
        logo: require('../../assets/images/home/character/camp03/logo.png')
      },
      {
        name: 'camp04',
        logo: require('../../assets/images/home/character/camp04/logo.png')
      },
      {
        name: 'camp05',
        logo: require('../../assets/images/home/character/camp05/logo.png')
      }
    ],
    camplist: [
      {
        name: 'camp01',
        onImg: require('../../assets/images/home/character/camp01/1-on.png'),
        offImg: require('../../assets/images/home/character/camp01/1-off.png'),
        rolelist: [
          {
            roleImg: require('../../assets/images/home/character/camp01/role01.png'),
            roleType: require('../../assets/images/home/character/tezhong.png'),
            roleName_jp: 'レッド',
            roleName_en: 'PROJEKT RED',
            detailText: '身寄りのない捨て子だったが、現在はロドスに身を寄せている。本人は育ての親を「オバアサン」と呼んでいるが、その正体は一切不明。とある事情から、多くの同族に恐れられている。',
            cvName: '小清水亜美',
            cvFile: require('../../assets/audio/character/camp01/CN_001.mp3')
          },
          {
            roleImg: require('../../assets/images/home/character/camp01/role02.png'),
            roleType: require('../../assets/images/home/character/yiliao.png'),
            roleName_jp: 'ケルシー',
            roleName_en: "KAL'TSIT",
            detailText: 'ロドスの医療部門のリーダー。多分野にわたる深い知識を有しており、医療プロジェクトに従事するだけではなく、医療従事者として一部の作戦に参加し、医学理論に基づくサポートや応急医療機器による治療を行こともある。',
            cvName: '日笠陽子',
            cvFile: require('../../assets/audio/character/camp01/CN_002.mp3')
          },
          {
            roleImg: require('../../assets/images/home/character/camp01/role03.png'),
            roleType: require('../../assets/images/home/character/sushi.png'),
            roleName_jp: 'アーミヤ',
            roleName_en: 'AMIYA',
            detailText: 'ロドスのリーダーを務める少女。',
            cvName: '黒沢ともよ',
            cvFile: require('../../assets/audio/character/camp01/CN_003.mp3')
          },
          {
            roleImg: require('../../assets/images/home/character/camp01/role04.png'),
            roleType: require('../../assets/images/home/character/jinwei.png'),
            roleName_jp: 'ドーベルマン',
            roleName_en: 'DOBERMANN',
            detailText: 'ロドスの戦術訓練官。厳格で几帳面な性格。仲間が誰一人として戦場で犠牲にならぬよう、日々厳しい訓練の指導を行っている。',
            cvName: '種﨑敦美',
            cvFile: require('../../assets/audio/character/camp01/CN_004.mp3')
          },
          {
            roleImg: require('../../assets/images/home/character/camp01/role05.png'),
            roleType: require('../../assets/images/home/character/zhongzhuang.png'),
            roleName_jp: 'ニアール',
            roleName_en: 'NEARL',
            detailText: 'ロドスの防御要員。揺るぎない意志と、真面目でひたむきな性格を備えている。自らをロドスの盾と化し、仲間を守る。',
            cvName: '佐倉綾音',
            cvFile: require('../../assets/audio/character/camp01/CN_005.mp3'),
            detailStyle: {
              'width': '300%',
              'padding-left': '120%'
            }
          }
        ]
      },
      {
        name: 'camp02',
        onImg: require('../../assets/images/home/character/camp02/2-on.png'),
        offImg: require('../../assets/images/home/character/camp02/2-off.png'),
        rolelist: [
          {
            roleImg: require('../../assets/images/home/character/camp02/role01.png'),
            roleType: require('../../assets/images/home/character/zhongzhuang.png'),
            roleName_jp: 'ホシグマ',
            roleName_en: 'HOSHIGUMA',
            detailText: '龍門近衛局（ろんめんこのえきょく）の特別任務隊に所属する精鋭。犯罪歴があったが、龍門のウェイ総督との交渉を経て、特別に近衛局特別任務隊に迎え入れられたという。現在は重装戦闘員としてロドスに協力しており、現場での戦術行使、指揮支援などを行う。',
            cvName: '安野希世乃',
            cvFile: require('../../assets/audio/character/camp02/CN_001.mp3'),
            detailStyle: {
              'width': '290%',
              'padding-left': '100%'
            }
          },
          {
            roleImg: require('../../assets/images/home/character/camp02/role02.png'),
            roleType: require('../../assets/images/home/character/jinwei.png'),
            roleName_jp: 'チェン',
            roleName_en: "CH'EN",
            detailText: '龍門近衛局（ろんめんこのえきょく）特別督察隊の隊長。龍門では主に管轄内の不法行為や組織犯罪などの取り締まりを行っており、顕著な実績を挙げている。現在は特別パートナーとしてロドスに協力しており、現場での戦術指揮支援を行う。',
            cvName: '石上静香',
            cvFile: require('../../assets/audio/character/camp02/CN_002.mp3')
          }
        ]
      },
      {
        name: 'camp03',
        onImg: require('../../assets/images/home/character/camp03/3-on.png'),
        offImg: require('../../assets/images/home/character/camp03/3-off.png'),
        rolelist: [
          {
            roleImg: require('../../assets/images/home/character/camp03/role01.png'),
            roleType: require('../../assets/images/home/character/zhongzhuang.png'),
            roleName_jp: 'クロワッサン',
            roleName_en: 'CROISSANT',
            detailText: 'ペンギン急便の従業員。ショッピングが趣味で、活発で明るい性格。自身の暮らしをより良いものにしようと、日々一生懸命業務に取り組んでいる。',
            cvName: '久保ユリカ',
            cvFile: require('../../assets/audio/character/camp03/CN_001.mp3')
          },
          {
            roleImg: require('../../assets/images/home/character/camp03/role02.png'),
            roleType: require('../../assets/images/home/character/xianfeng.png'),
            roleName_jp: 'テキサス',
            roleName_en: 'TEXAS',
            detailText: 'ペンギン急便の従業員。秘密の連絡や、武装しての護送などの非公開任務に従事していることから、トランスポーターとして活動していると推測される。ロドスとペンギン急便との契約に基づき、駐在連絡員としてロドスに籍を置き、多方面の作戦に協力している。',
            cvName: '田所あずさ',
            cvFile: require('../../assets/audio/character/camp03/CN_002.mp3')
          },
          {
            roleImg: require('../../assets/images/home/character/camp03/role03.png'),
            roleType: require('../../assets/images/home/character/juji.png'),
            roleName_jp: 'エクシア',
            roleName_en: 'EXUSIAI',
            detailText: 'ラテラーノ国民であり、ペンギン急便の従業員でもある。秘密の連絡や、武装しての護送などの非公開任務に従事していることから、トランスポーターとして活動していると推測される。ロドスとペンギン急便との契約に基づき、駐在連絡員としてロドスに籍を置き、多方面の作戦に協力している。',
            cvName: '石見舞菜香',
            cvFile: require('../../assets/audio/character/camp03/CN_003.mp3'),
            detailStyle: {
              'width': '280%',
              'padding-left': '100%'
            }
          }
        ]
      },
      {
        name: 'camp04',
        onImg: require('../../assets/images/home/character/camp04/4-on.png'),
        offImg: require('../../assets/images/home/character/camp04/4-off.png'),
        rolelist: [
          {
            roleImg: require('../../assets/images/home/character/camp04/role01.png'),
            roleType: require('../../assets/images/home/character/yiliao.png'),
            roleName_jp: 'フィリオプシス',
            roleName_en: 'PTILOPSIS',
            detailText: '元ライン生命のデータアナリスト。応急手当や資料の整理を得意とする。冷静沈着に全ての仕事をこなす様子は、まるで機械がプログラム通りに動いているかのようである。',
            cvName: '金元寿子',
            cvFile: require('../../assets/audio/character/camp04/CN_001.mp3')
          },
          {
            roleImg: require('../../assets/images/home/character/camp04/role02.png'),
            roleType: require('../../assets/images/home/character/sushi.png'),
            roleName_jp: 'イフリータ',
            roleName_en: 'IFRIT',
            detailText: 'かつてライン生命で治療を受けていた重度の鉱石病感染者。極めて高い源石（オリジニウム）適応性を持つが、鉱石病（オリパシー）の影響で多発性の発火現象を起こすことがある。現在はロドスで引き続き治療を受けており、医療チームのサイレンスが彼女の後見人と保証人を担当している。',
            cvName: '花守ゆみり',
            cvFile: require('../../assets/audio/character/camp04/CN_002.mp3'),
            detailStyle: {
              'width': '280%',
              'padding-left': '100%'
            }
          },
          {
            roleImg: require('../../assets/images/home/character/camp04/role03.png'),
            roleType: require('../../assets/images/home/character/yiliao.png'),
            roleName_jp: 'サイレンス',
            roleName_en: 'SILENCE',
            detailText: 'ライン生命の源石（オリジニウム）研究員。未知の応用研究を複数担当したことがあり、同時にいくつかの鉱石病（オリパシー）臨床試験の責任者も担当していた。現在はロドスの各種作戦において、戦場医療救護サービスを提供している。',
            cvName: '鬼頭明里',
            cvFile: require('../../assets/audio/character/camp04/CN_003.mp3')
          }
        ]
      },
      {
        name: 'camp05',
        onImg: require('../../assets/images/home/character/camp05/5-on.png'),
        offImg: require('../../assets/images/home/character/camp05/5-off.png'),
        rolelist: [
          {
            roleImg: require('../../assets/images/home/character/camp05/role01.png'),
            roleType: require('../../assets/images/home/character/jinwei.png'),
            roleName_jp: 'フランカ',
            roleName_en: 'FRANKA',
            detailText: 'BSW（ブラックスチール・ワールドワイド）のスタッフであり、リスカムと行動を共にしている。何か特別な事情があってロドスに派遣されてきたようだが……',
            cvName: '加隈亜衣',
            cvFile: require('../../assets/audio/character/camp05/CN_001.mp3')
          },
          {
            roleImg: require('../../assets/images/home/character/camp05/role02.png'),
            roleType: require('../../assets/images/home/character/zhongzhuang.png'),
            roleName_jp: 'リスカム',
            roleName_en: 'LISKARM',
            detailText: 'BSW（ブラックスチール・ワールドワイド）のスタッフであり、紛争地帯での豊富な実戦経験を持つ。現在は安全保障条約に基づき、ロドスに安全保障サービスとそれに関連するコンサルティング業務を提供している。',
            cvName: '石川由依',
            cvFile: require('../../assets/audio/character/camp05/CN_002.mp3'),
            detailStyle: {
              'width': '260%',
              'padding-left': '70%'
            }
          }
        ]
      }
    ],
    showCamp: false,
    showRole: false, // 显示角色列表

    firstShow: true, // 第一次进入该版块
    seledCampData: '', // 选中的阵营数据
    hoverIndex: -1, // 鼠标mouseover角色index,
    seledRole: '', // 选中的角色数据
    seledRoleIndex: -1, // 选中角色index

    camplogoTemp: '', // 阵营图标临时数据

    // audio
    playing: false,
    canplay: false,

    // cv btn
    cvHoverLeft: 0,
    cvHoverTop: 0,
    cvHoverWidth: 0,
    cvHoverHeight: 0
  }),
  created () {

  },
  mounted () {

  },
  watch: {
    NAV_ACTIVE_INDEX (val) {
      if (val === 3 && this.firstShow) {
        this.firstShow = false

        setTimeout(() => {
          this.showCamp = true
        }, 500)
      }
      if (this.seledRole) {
        this.clearAudioState()
      }
    }
  },
  computed: {
    ...mapGetters({
      NAV_ACTIVE_INDEX: 'Home/NAV_ACTIVE_INDEX'
    }),
    currentCampLogo () {
      if (this.seledCampData) {
        for (let i = 0, len = this.logoList.length; i < len; i++) {
          if (this.logoList[i].name == this.seledCampData.name) {
            this.camplogoTemp = this.logoList[i].logo
            return this.logoList[i].logo
          }
        }
      } else {
        return this.camplogoTemp
      }
    }
  },
  methods: {
    playAudio () {
      if (this.playing) {
        this.$refs['say'].pause()
      } else {
        this.$refs['say'].play()
      }
    },
    pause () {
      this.playing = false
    },
    clearAudioState () {
      this.$refs['say'].currentTime = 0
      this.$refs['say'].pause()
      this.playing = false
    },
    campBg (item) {
      if (item.stage <= this.CAMP_STAGE) {
        return item.openImg
      } else {
        return item.closeImg
      }
    },
    slideType (index) {
      if (index % 2 == 0) {
        return 'slideTop'
      } else {
        return 'slideBottom'
      }
    },
    showCampRole (item) {
      // 隐藏阵营
      this.showCamp = false
      this.showRole = true
      this.seledCampData = item
    },
    moverRole (index) {
      if (this.seledRoleIndex != -1) {
        // 选中角色后禁止mouse事件
        return
      }
      this.hoverIndex = index
    },
    mouseleaveRole () {
      if (this.seledRoleIndex != -1) {
        // 选中角色后禁止mouse事件
        return
      }
      this.hoverIndex = -1
    },
    hoverClass (index) {
      if (this.hoverIndex == -1) {
        return ''
      } else if (this.hoverIndex == index) {
        // hover角色
        return 'hover-active'
      } else if (this.hoverIndex < index) {
        return 'hover-right'
      } else if (this.hoverIndex > index) {
        return 'hover-left'
      }
    },
    seledClass (index) {
      if (this.seledRoleIndex == -1) {
        return ''
      } else if (this.seledRoleIndex == index) {
        return 'sel-active'
      } else {
        return 'no-sel-active'
      }
    },
    posLeft (index, roleLength) {
      if (roleLength == 2) {
        let posleft = 30 + index * 20 + '%'
        return {
          left: posleft
        }
      } else if (roleLength == 3) {
        let posleft = 20 + index * 20 + '%'
        return {
          left: posleft
        }
      } else {
        let posleft = (index / roleLength) * 100 + '%'
        return {
          left: posleft
        }
      }
    },
    selRole (index, locked) {
      if (locked) {
        return
      }

      this.seledRole = this.seledCampData.rolelist[index]
      this.hoverIndex = -1
      this.seledRoleIndex = index
    },
    closeRole () {
      this.seledRole = ''
      this.seledRoleIndex = -1
    },
    returnCamplist () {
      this.showCamp = true
      this.showRole = false
      this.seledCampData = ''

      setTimeout(() => {
        this.closeRole()
      }, 50)
    }
  }
}
</script>

<style lang="scss" scoped>
.character-wrap {
  background: #000 url("../../assets/images/home/news/bg.jpg") no-repeat;
  background-size: cover;
  background-position: center top;
  position: relative;
  overflow: hidden;

  &.mask {
    &::after {
      opacity: 1;
    }
  }

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: #141516;
    z-index: 1;
    opacity: 0;
    transition: all 0.3s ease-in-out;
  }

  .camp-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;

    .camp-container {
      display: flex;
      justify-content: center;

      .camp-box {
        flex-grow: 0;
        width: auto;
        height: pxTorem(862px);
        cursor: pointer;
        position: relative;
        background: #141516;

        &::after {
          content: "";
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          opacity: 0;
          transition: all 0.8s;
        }

        &:not(:first-child) {
          margin-left: -2.5%;
        }

        &:nth-of-type(1) {
          z-index: 10;
          &::after {
            background: url("../../assets/images/home/character/camp01/1-on.png")
              no-repeat;
            background-size: 100%;
            background-position: center 100%;
          }
        }
        &:nth-of-type(2) {
          z-index: 9;
          &::after {
            background: url("../../assets/images/home/character/camp02/2-on.png")
              no-repeat;
            background-size: 100%;
            background-position: center 100%;
          }
        }
        &:nth-of-type(3) {
          z-index: 8;
          &::after {
            background: url("../../assets/images/home/character/camp03/3-on.png")
              no-repeat;
            background-size: 100%;
            background-position: center 100%;
          }
        }
        &:nth-of-type(4) {
          z-index: 7;
          &::after {
            background: url("../../assets/images/home/character/camp04/4-on.png")
              no-repeat;
            background-size: 100%;
            background-position: center 100%;
          }
        }
        &:nth-of-type(5) {
          z-index: 6;
          &::after {
            background: url("../../assets/images/home/character/camp05/5-on.png")
              no-repeat;
            background-size: 100%;
            background-position: center 100%;
          }
        }

        .camp-bg {
          display: block;
          height: 100%;
        }

        &:hover {
          &::after {
            opacity: 1;
          }
        }
      }
    }
  }
  /* camp logo */
  .camp-logo {
    position: absolute;
    z-index: 10;
    width: pxTorem(320px);
    height: pxTorem(320px);
    top: pxTorem(50px);
    left: pxTorem(40px);
    cursor: pointer;
    overflow: hidden;

    .current-camp-logo {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-size: 100%;
      backface-visibility: hidden;
      transition: all 0.3s ease-in-out;
    }
    .other-camp-logo-wrap {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      transition: all 0.3s ease-in-out;
      padding: 5%;
      backface-visibility: hidden;
      display: flex;
      flex-wrap: wrap;
      transform: rotateY(180deg);

      .other-camp-logo {
        background-size: 100%;
        background-repeat: no-repeat;
        width: 50%;
        height: 50%;
      }
    }

    &:hover {
      .current-camp-logo {
        transform: rotateY(-180deg);
      }
      .other-camp-logo-wrap {
        transform: rotateY(0);
      }
    }
  }
  /* 角色 */
  .role-wrap {
    position: absolute;
    top: 55%;
    left: 55%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 70%;
    height: 80%;
    box-sizing: border-box;

    .role-container {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      position: relative;

      .role-box {
        width: pxTorem(270px);
        height: 100%;
        box-sizing: border-box;

        .role-content {
          width: pxTorem(270px);
          height: 100%;
          position: absolute;
          top: 0;
          transition: transform 0.2s ease-in-out, all 0.3s ease-in-out;

          /* detail */
          .role-detail {
            width: pxTorem(650px);
            position: absolute;
            top: 53%;
            left: 40%;
            z-index: -1;
            box-sizing: border-box;
            padding: pxTorem(25px) pxTorem(20px) pxTorem(25px) pxTorem(220px);
            background: rgba(20, 21, 22, 0.9);
            transform: translateY(-50%) scaleX(1);
            transition: all 0.3s ease-in-out;

            .role-class {
              height: pxTorem(110px);
              position: absolute;
              left: 0;
              right: 45%;
              top: pxTorem(-55px);
              box-sizing: border-box;
              background: #fff;
              text-align: right;
              font-size: 0;

              img {
                height: 100%;
              }
            }
            /* .role-name-cv-box {
                                width: 100%;
                                height: pxTorem(80px);
                                display: flex;
                                justify-content: space-between;

                                .role-name {
                                    flex-grow: 0;
                                    height: 80%;
                                    img {
                                        height: 100%;
                                    }
                                }
                                .role-cv {
                                    width: pxTorem(116px);
                                    height: auto;
                                    align-self: flex-end;
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;

                                    .role-cv-box {
                                        position: relative;
                                        .cv-btn {
                                            height: 120%;
                                        }
                                        &::after {
                                            content: "";
                                            display: block;
                                            position: absolute;
                                            width: 100%;
                                            height: 100%;
                                            top: 0;
                                            left: 0;
                                            background: url("../../assets/images/home/character/role_cv.png") no-repeat;
                                            background-size: 100% 100%;
                                            opacity: 0;
                                        }
                                        &::before {
                                            content: "";
                                            display: block;
                                            width: 40%;
                                            height: 40%;
                                            position: absolute;
                                            top: 50%;
                                            left: 50%;
                                            transform: translate(-50%, -50%);
                                            z-index: -1;
                                            box-shadow: 0 0 20px 1px #007eff;
                                            border-radius: 50%;
                                            animation: lightScale 1s ease-in-out alternate infinite;
                                            opacity: 0;

                                            @keyframes lightScale {
                                                from {
                                                    box-shadow: 0 0 20px 1px #007eff;
                                                }
                                                to {
                                                    box-shadow: 0 0 20px 10px #007eff;
                                                }
                                            }
                                        }
                                        &.play {
                                            &::after {
                                                opacity: 1;
                                            }
                                            &::before {
                                                opacity: 1;
                                            }
                                        }
                                    }

                                    .cv {
                                        font-size: pxTorem(16px);
                                        color: #fff;
                                        white-space: nowrap;
                                        font-family: 'Noto Sans KR', sans-serif;
                                        font-weight: 700;
                                    }
                                }
                            } */
          }
          .role-close {
            color: #fff;
            font-size: pxTorem(35px);
            position: absolute;
            left: 100%;
            top: 0;
            transform: translateY(-100%);
            cursor: pointer;
          }
          .role-name--jp {
            width: 100%;
            color: #fff;
            font-family: "rohonminsink";
            font-size: pxTorem(38px);
            text-align: right;
            line-height: 1;
            margin-bottom: pxTorem(5px);
          }
          .cv-name-box {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            font-size: 0;
            line-height: 1;
            margin-bottom: pxTorem(20px);

            .cv-box {
              display: flex;
              font-size: 0;
              align-self: flex-end;
              align-items: center;

              .cv-button {
                display: block;
                width: pxTorem(30px);
                margin-bottom: pxTorem(-5px);
                position: relative;

                .cv-btn {
                  width: 100%;
                }

                &::after {
                  content: "";
                  display: block;
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  top: 0;
                  left: 0;
                  background: url("../../assets/images/home/character/role_cv.png")
                    no-repeat;
                  background-size: 100% 100%;
                  opacity: 0;
                }
                &::before {
                  content: "";
                  display: block;
                  width: 40%;
                  height: 40%;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  z-index: -1;
                  box-shadow: 0 0 20px 1px #007eff;
                  border-radius: 50%;
                  animation: lightScale 1s ease-in-out alternate infinite;
                  opacity: 0;

                  @keyframes lightScale {
                    from {
                      box-shadow: 0 0 20px 1px #007eff;
                    }
                    to {
                      box-shadow: 0 0 20px 10px #007eff;
                    }
                  }
                }
                &.play {
                  &::after {
                    opacity: 1;
                  }
                  &::before {
                    opacity: 1;
                  }
                }
              }
              .cv-name {
                font-family: "STHeiti", sans-serif;
                color: #fff;
                font-size: pxTorem(16px);
                line-height: 1;
                margin-left: pxTorem(5px);
              }
            }
            .role-name--en {
              font-family: "SourceHanSansSubset";
              color: #fff;
              font-weight: 700;
              font-size: pxTorem(40px);
              line-height: 1;
            }
          }
          .role-detail-text {
            color: #999;
            font-family: "STHeiti", sans-serif;
            font-size: pxTorem(14px);
            width: 100%;
            box-sizing: border-box;
            padding-left: pxTorem(8px);
          }

          &.sel-active {
            left: 15% !important;
            z-index: 999;

            .role {
              width: pxTorem(800px);
              height: pxTorem(800px);
            }
          }
          &.no-sel-active {
            .role {
              filter: brightness(0.4);
            }
          }

          &.hover-active {
            transform: scale(1.1);
          }
          &.hover-left {
            transform: translateX(pxTorem(-20px));
          }
          &.hover-right {
            transform: translateX(pxTorem(20px));
          }

          .role {
            position: absolute;
            width: pxTorem(600px);
            height: pxTorem(600px);
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            transition: all 0.3s ease-in-out;
            pointer-events: none;
          }
        }
      }
    }
    .mover-container {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      position: absolute;
      top: 0;
      left: 0;

      .mover-box {
        width: pxTorem(270px);
        height: 60%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        box-sizing: border-box;
        cursor: pointer;
      }
    }
  }
}

/* camp */
.slideTop-enter-active,
.slideTop-leave-active {
  transition: all 0.5s ease-in-out;
}
.slideTop-enter,
.slideTop-leave-to {
  transform: translateY(-100%) translateZ(0);
  opacity: 0;
}
.slideBottom-enter-active,
.slideBottom-leave-active {
  transition: all 0.5s ease-in-out;
}
.slideBottom-enter,
.slideBottom-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
/* camp-logo */
.camplogo-enter-active,
.camplogo-leave-active {
  transition: all 0.3s ease-in-out;
}
.camplogo-enter,
.camplogo-leave-to {
  opacity: 0;
}
/* role-class */
.roleClass-enter-active,
.roleClass-leave-active {
  transition: all 0.2s ease-in-out !important;
  transform-origin: left center !important;
}
.roleClass-enter-active {
  transition-delay: 0.5s !important;
}
.roleClass-enter,
.roleClass-leave-to {
  transform: scaleX(0) !important;
}
/* role-text clip */
.clip-enter-active,
.clip-leave-active {
  transition: clip-path ease-in-out 0.3s;
  transition-delay: 0.7s;
}
.clip-enter,
.clip-leave-to {
  clip-path: polygon(0 100%, 0 100%, 100% 100%, 100% 100%);
}
.clip-enter-to,
.clip-leave {
  clip-path: polygon(0 100%, 0 0, 100% 0, 100% 100%);
}

/* role-detail */
.roleDetail-enter-active,
.roleDetail-leave-active {
  transition: transform 0.3s ease-in-out !important;
  transform-origin: left center !important;
}
.roleDetail-enter-active {
  transition-delay: 0.3s !important;
}
.roleDetail-enter,
.roleDetail-leave-to {
  transform: translateY(-50%) scaleX(0) !important;
}
</style>
