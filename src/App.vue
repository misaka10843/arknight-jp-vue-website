<template>
  <div id="app" ondragstart="return false">
    <router-view />
    <!-- mask -->
    <video-mask></video-mask>
    <gallery-mask></gallery-mask>
  </div>
</template>

<script>
import VideoMask from './components/Mask/VideoMask'
import GalleryMask from './components/Mask/GalleryMask'

export default {
  name: 'app',
  components: {
    VideoMask,
    GalleryMask
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
