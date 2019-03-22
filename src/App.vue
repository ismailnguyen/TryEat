<template>
  <div id="app">
    <router-view></router-view>
    <Navigation v-if="currentUser" />
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Navigation from './components/Navigation'

  export default {
    components: { Navigation },
    computed: {
      ...mapState(['currentUser'])
    }
  }
</script>

<style>
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  
  body {
    /* background: #292e4f; */
    color: #acbfd9;
  }

  .primary-color {
    color: #acbfd9;
  }

  .secondary-color {
    color: #eb4b8a;
  }

  .ui.header {
    text-align: center;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 999;
    background: #acbfd9ab;
  }

  .ui.menu.item {
    background: #acbfd9ab;
  }

  .ui.menu .active.item:hover {
    background: #acbfd9;
  }

  .ui.menu .active.item, .ui.menu .active.item:hover {
    color: #eb4b8a;
  }

  .ui.header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
  }

  .container {
    padding-top: 60px;
    padding-left: 25px;
    padding-right: 25px;
  }
</style>
