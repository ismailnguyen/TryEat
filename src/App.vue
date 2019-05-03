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
    background: #292e4f;
    color: #ffffff;
  }

  .primary-color {
    color: #acbfd9;
  }

  .secondary-color {
    color: #eb4b8a;
  }

  .ui.menu.item {
    background: #acbfd9ab;
    color: #ffffff;
  }

  .ui.menu .active.item:hover {
    background: #acbfd9;
  }

  .ui.menu .active.item, .ui.menu .active.item:hover {
    color: #eb4b8a;
  }

  .ui.container {
    padding-top: 100px;
    padding-left: 25px;
    padding-right: 25px;
  }

  .ui.form .field>label,
  .ui.toggle.checkbox .box,
  .ui.toggle.checkbox label {
    color: #ffffff;
  }
</style>
