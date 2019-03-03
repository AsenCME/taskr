<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>


<style>
* {
  box-sizing: border-box;
}
#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}

html,
body,
#app {
  padding: 0px;
  margin: 0px;
  height: 100vh;
  overflow-x: hidden;
}

.iziToast-wrapper {
  width: 80% !important;
  margin-left: 10%;
  margin-bottom: 20px;
}
.iziToast {
  border-radius: 10px !important;
  overflow: hidden !important;
}
</style>
