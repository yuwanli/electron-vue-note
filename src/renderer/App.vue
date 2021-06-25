<template>
  <div class="container" id="app">
    <div class="container-menu">
      <div class="menu-item" @click="menuClick('/main')">
        便签
      </div>
      <div class="menu-item" @click="menuClick('/calendar')">
        日历
      </div>
      <div class="menu-item" @click="menuClick('/info')">
        信息
      </div>
      <div class="menu-item" @click="menuClick('/album')">
        相册
      </div>
    </div>
    <div class="container-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'electron-vue-note',
  methods: {
    menuClick(name) {
      this.$router.push({
        path: name
      })
    }
  }
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
.container{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.container-menu{
  flex: 0 0 100px;
  background-color: rgba(0,0,0,0.5);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.menu-item{
  width: 80px;
  height: 80px;
  background-color: #fff;
  border-radius: 5px;
  text-align: center;
  line-height: 80px;
  margin: 20px 0;
  cursor: pointer;
}
.container-content {
  flex: 1;
  height: 100%;
  position: relative;
}
</style>
