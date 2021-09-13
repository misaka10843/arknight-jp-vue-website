<template>
  <div class="effect-area">
    <canvas ref="cvs" width="400" height="400"></canvas>
  </div>
</template>

<script>
export default {
  name: 'effect',

  components: {

  },
  data: () => ({
    ctx: null,
    img: null,
    cvsw: 0,
    cvsh: 0,
    imgCnt: 25,
    imgMaArr: [],
    aryImg: [],
    imgBaseSizeW: 10,
    imgBaseSizeH: 12,
    aspectMax: 1.5,
    aspectMin: 0.5,
    speedMax: 0.5,
    speedMin: 0.25,
    angleAdd: 1.5,
    idx: 0,
    cos: 0,
    sin: 0,
    rad: Math.PI / 180
  }),
  created () {

  },
  mounted () {
    const canvas = this.$refs['cvs']
    this.ctx = canvas.getContext('2d')
    this.cvsw = canvas.width
    this.cvsh = canvas.height

    this.img = new Image()
    this.img.src = require('../assets/images/cut/triangle.png')
    this.img.onload = this.flow_start
  },
  watch: {

  },
  computed: {

  },
  methods: {
    flow_start () {
      this.setImagas()
      setInterval(() => {
        this.flow()
      }, 10)
    },
    setImagas () {
      var aspect = 0
      for (var i = 0; i < this.imgCnt; i++) {
        // ランダムで生成
        aspect = Math.random() * (this.aspectMax - this.aspectMin) + this.aspectMin

        this.aryImg.push({
          'posx': Math.random() * this.cvsw,
          'posy': Math.random() * this.cvsh,
          'sizew': this.imgBaseSizeW * aspect,
          'sizeh': this.imgBaseSizeH * aspect,
          'speedy': Math.random() * (this.speedMax - this.speedMin) + this.speedMin,
          'angle': Math.random() * 360
        })
      }
    },
    flow () {
      this.ctx.clearRect(0, 0, this.cvsw, this.cvsh)

      for (this.idx = 0; this.idx < this.imgCnt; this.idx++) {
        this.aryImg[this.idx].posy += this.aryImg[this.idx].speedy * ((this.cvsh - this.aryImg[this.idx].posy) / 100 + 0.5)
        this.aryImg[this.idx].angle += Math.random() * this.angleAdd
        this.cos = Math.cos(this.aryImg[this.idx].angle * this.rad)
        this.sin = Math.sin(this.aryImg[this.idx].angle * this.rad)

        this.ctx.setTransform(this.cos, this.sin, this.sin, this.cos, this.aryImg[this.idx].posx, this.aryImg[this.idx].posy)
        this.ctx.drawImage(this.img, 0, 0, this.aryImg[this.idx].sizew, this.aryImg[this.idx].sizeh)

        this.ctx.setTransform(1, 0, 0, 1, 0, 0)

        if (this.aryImg[this.idx].posy >= this.cvsh) {
          this.aryImg[this.idx].posy = -this.aryImg[this.idx].sizeh
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
