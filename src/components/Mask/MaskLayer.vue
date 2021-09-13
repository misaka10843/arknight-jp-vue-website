<template>
  <transition name="mask-layer">
    <div class="mask-wrap" v-show="maskActive" @wheel="mouseEvent">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'MaskLayer',
  props: ['maskActive', 'scrollWrap'],
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
    mouseEvent (even) {
      const path = even.path || (even.composedPath && even.composedPath())

      if (path.indexOf(document.querySelector(this.scrollWrap)) == -1) {
        even.preventDefault()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mask-wrap {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
}

.mask-layer-enter-active,
.mask-layer-leave-active {
  transition: all 0.3s ease-in-out;
}
.mask-layer-enter,
.mask-layer-leave-to {
  opacity: 0;
}
</style>
