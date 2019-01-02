<template>
  <div class="app">
    <div class="wrapper">
      <navbar></navbar>
      <div class="wrapper__container">
        <sidebar v-bind:class="[this.$store.state.showSidebar? 'show' : 'hide']"></sidebar>
        <div class="wrapper__container__content">
          <transition name="fade" mode="out-in">
            <router-view class="view"></router-view>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  beforeCreate() {
    Broadcast.$on("ChangeCorporation", event => {
      axios.defaults.headers.common["CORPORATION-ID"] = event.corporation.id;
    });

    Broadcast.$on("NewCorporationCreated", event => {
      axios.get("/api/corporations/retrieve-all-corporations").then(res => {
        localStorage.setItem(
          "corporations",
          JSON.stringify(res.data.corporations)
        );
      });
    });
  }
};
</script>

<style>
.wrapper {
  display: grid;
  height: 100vh;
  width: 100vw;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
}
.wrapper__container {
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr;
}
.wrapper__container__content {
  z-index: 2;
  background-color: #f5f8fa;
}

.headerTop {
  width: 84%;
  height: 24px;
  background-color: #f5f8fa;
  clip-path: polygon(2% 2%, 100% 0%, 100% 100%, 0% 100%);
  margin-left: 16%;
  margin-top: -1.8%;
}

.content-title {
  margin-top: -28.2px;
  border-bottom: 28px solid #f5f8fa;
  border-left: 25px solid transparent;
  height: 0;
  width: 100%;
}

.module-title {
  font-weight: 900;
  background-color: transparent;
  padding-top: 5px;
  padding-left: 8px;
  font-weight: bold;
  font-size: 14px;
}

/* .title-border {
  width: 103%;
  margin-top: 0px;
  margin-left: -3%;
  border: 0;
  border-top: 2px solid #abb0b0;
} */
</style>
