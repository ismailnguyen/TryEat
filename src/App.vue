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
</style>
