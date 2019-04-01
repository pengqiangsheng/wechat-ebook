<template>
  <div id="app">
    <keep-alive exclude="Ebook">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}

document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  fontSize = fontSize > 50 ? 50 : fontSize
  html.style.fontSize = fontSize + 'px'
})
</script>

 <style lang="scss">
@import "assets/styles/global";
#app {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
