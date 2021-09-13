<template>
  <footer>
    <div class="container">
      <p class="link-box">
        <router-link class="link-box-a" target="_blank" to="/terms_of_service">利用規約</router-link>
        <router-link class="link-box-a" target="_blank" to="/privacy_policy">プライバシーポリシー</router-link>
        <!-- <router-link class="link-box-a" target="_blank" to="">資金決済法に基づく表示</router-link>
                <router-link class="link-box-a" target="_blank" to="">特定商取引法に基づく表示</router-link> -->
      </p>
      <img src="../assets/images/components/footer/hypergryph_yostar.svg" class="logo" alt="logo">
      <p class="copyright-info">
        <span>©2017 Hypergryph Co., Ltd</span>
        <span> ©2018 Yostar, Inc.</span>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterBar',

  components: {

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

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
footer {
  width: 100%;
  height: auto !important;
  box-sizing: border-box;
  padding: pxTorem(33px) 0 pxTorem(78px);
  background: #000;
  border-top: 1px solid #535353;

  .container {
    width: pxTorem(640px);
    margin: 0 auto;

    .link-box {
      text-align: center;
      margin-bottom: pxTorem(22px);

      .link-box-a {
        color: #fff;
        font-family: "SourceHanSansSubset";
        font-size: pxTorem(14px);

        &:not(:last-child) {
          &::after {
            content: "|";
            color: #fff;
            margin: 0 pxTorem(13px);
          }
        }

        &:hover {
          color: #fe2;
        }
      }
    }
    .logo {
      display: block;
      width: 100%;
    }
    .copyright-info {
      width: 100%;
      box-sizing: border-box;
      padding: 0 pxTorem(35px);
      font-family: "SourceHanSansSubset";
      font-size: pxTorem(14px);
      color: #fff;
      text-align: center;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
