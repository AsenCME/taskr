<template>
  <div class="header">
    <div
      class="backBtn"
      @click="back"
    >
      <i class="fas fa-chevron-left"></i>
    </div>
    <div class="title">{{title}}</div>
  </div>
</template>

<script>
export default {
  props: ["title"],
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
/* INFO: Header styles */
.header {
  z-index: 1;
  top: 0px;
  width: 100%;
  background: white;
  box-shadow: 0px -15px 50px 0px rgba(0, 0, 0, 0.75);
  position: fixed;
  text-align: center;
  font-size: 25px;
  padding: 20px 0px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}
.title {
  background: white;
}
.backBtn {
  position: absolute;
  font-weight: 500;
  left: 25px;
}
.backBtn i {
  font-size: 25px;
}
</style>
