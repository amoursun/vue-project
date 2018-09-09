<template>
  <div id="app" @touchmove.prevent>
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
  import MHeader from 'common/components/m-header/m-header'
  import Player from 'common/components/player/player'
  import Tab from 'common/components/tab/tab'

  export default {
    components: {
      'm-header': MHeader,
      'tab': Tab,
      'player': Player
    }
  }
</script>

<style lang="less">
  @import "~basis/style/index.less";
</style>