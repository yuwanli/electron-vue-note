<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'electron-vue-note',
};
</script>

<style>
body,
html {
  position: relative;
  height: 100%;
}
#app {
  position: relative;
  min-height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
