<template>
  <component :is="layout">
    <router-view />
  </component>
</template>


<script>


export default {
  data() {
    return {
      compatConfig: { MODE: 3 },
    };
  },
  computed: {
    layout() {
      return `layout-${this.$route.meta.layout || 'default'}`
    }
  }
};
</script>

<style>

.background-absolem{
  background: rgb(77,76,87);
  background: linear-gradient(90deg, rgba(77,76,87,1) 0%, rgba(46,28,92,1) 44%, rgba(95,38,130,1) 100%);
}

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
