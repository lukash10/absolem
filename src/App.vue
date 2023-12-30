<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import './scss/app.scss'

export default {
  computed: {
    layout() {
      return `layout-${this.$route.meta.layout || 'default'}`
    }
  }
}
</script>

<style>

* {
  margin: 0px;
  padding: 0px;
}

body {
  font-family: Calibri, Sans-Serif;
  height: 100%;
}

#app{
  overflow: hidden;
}

.nav-pills .nav-link.active, .nav-pills .show > .nav-link {
  background-color: #b01116 !important;
}

</style>
