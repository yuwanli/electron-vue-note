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
* {
  margin: 0;
  padding: 0;
}
body,
html {
  position: relative;
  height: 100%;
  font-family: Arial, Helvetica, sans-serif;
}
#app {
  position: relative;
  min-height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
