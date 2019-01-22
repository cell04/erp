<template>
  <nav class="navbar-wrapper">
    <i @click="clickSidebar()" class="fas fa-bars navbar-wrapper__menu"></i>
    <router-link class="navbar-wrapper__logo" :to="{ name: 'overview' }">
      <img
        src="../../assets/tradesoft_logo.png"
        style="width:115px; height:60px; margin-top:-5px; margin-bottom: -10px; margin-left:25px;"
        alt="Tradesoft Business"
      >
    </router-link>
    <div class="navbar-wrapper__nav">
        <div class="navbar-wrapper__nav__item" v-if="corporation">
           {{ corporation.name }}
        </div>
        <div class="navbar-wrapper__nav__item--cursor">
            <span class="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true">
            <i class="fas fa-user"></i>
            {{ user.name }}
            <span class="caret"></span>
            </span>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link class="dropdown-item" :to="{ name: 'corporations.select' }">Switch Group</router-link>
                <router-link class="dropdown-item" :to="{ name: 'corporations.index' }">Settings</router-link>
                <a class="dropdown-item" href="#" v-on:click.stop.prevent="logout">Logout</a>
            </div>
        </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      corporation: "",
      user: ""
    };
  },

  mounted() {
    /*Broadcast.$on('System Initialized', (event) => {
                this.user = this.$store.state.user;
            });*/

    try {
      throw "";
      this.user = JSON.parse(localStorage.getItem("user"));
      if (!this.user) {
        throw "user data not found";
      }
      if (this.user.hasOwnProperty("corp_id")) {
        localStorage.setItem("selectedCorporation", 0);
      } else {
        console.warn("corp_id not found");
      }
    } catch (e) {
      console.error(e);
      axios.get("/api/auth/user").then(res => {
        this.user = res.data.user;
        localStorage.setItem("user", JSON.stringify(res.data.user));
      });
    }

    if (
      JSON.parse(localStorage.getItem("selectedCorporation")) instanceof
        Object ==
      false
    ) {
      this.$router.push({ name: "corporations.select" });
    } else {
      this.$store.state.selectedCorporation = JSON.parse(
        localStorage.getItem("selectedCorporation")
      );
      this.corporation = JSON.parse(
        localStorage.getItem("selectedCorporation")
      );
      axios.defaults.headers.common["CORPORATION-ID"] = JSON.parse(
        localStorage.getItem("selectedCorporation")
      ).id;
    }

    Broadcast.$on("ChangeCorporation", event => {
      this.corporation = event.corporation;
    });
  },
  methods: {
    logout() {
      axios
        .post("/logout")
        .then(res => {
          localStorage.clear();
          location.reload();
        })
        .catch(function(error) {
          localStorage.clear();
          location.reload();
        });
    },
    clickSidebar() {
      this.$store.commit("toggleSidebar");
    }
  }
};
</script>

<style scoped>
.navbar-wrapper {
  height: 70px;
  width: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(49, 156, 159, 1) 99%
  );
  display: grid;
  grid-template-columns: 80px 100px 40px auto 20px;
  grid-template-rows: 1fr;
  grid-template-areas: "button logo spacer content spacerRight";
}
.navbar-wrapper__menu {
  grid-area: button;
  font-size: 24px;
  text-align: center;
  vertical-align: middle;
  line-height: 60px;
  padding-left: 20px;
}
.navbar-wrapper__logo {
  grid-area: logo;
  padding-top: 10px;
}
.navbar-wrapper__nav {
  grid-area: content;
  display: grid;
  grid-auto-flow: column;
  justify-content: end;
  grid-template-rows: 40px;
  grid-template-columns: auto;
}
.navbar-wrapper__nav__item {
    padding: 10px;
    color: white;
}

.navbar-wrapper__nav__item--cursor {
    padding: 10px;
    color: white;
    cursor: pointer;
}

/* Bootstrap CSS Overrides */
.nav-link {
  color: white;
  outline: none;
  text-decoration: none;
  padding: 0;
}
</style>
