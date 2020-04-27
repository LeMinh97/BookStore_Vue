<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light" v-if="account.user">
      <router-link class="navbar-brand" to="/"><h3>Books</h3></router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
              <router-link to="/" class="nav-link">Home</router-link>
          </li>
        </ul>
        <div class="form-inline my-2 my-lg-0">
          <label class="mr-sm-2">{{account.user.username}}</label>
          <button class="btn btn-outline-success my-2 my-sm-0" v-on:click="logout()">Logout</button>
        </div>
      </div>
    </nav>

    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "app",
  data(){
    return{
    }
  },
  computed: {
    ...mapState({
      alert: state => state.alert,
      account: state => state.account,
    })
  },
  methods: {
    ...mapActions({
      clearAlert: "alert/clear",
      logout:"account/logout"
    })
  },
  watch: {
    $route(to, from) {
      // clear alert on location change
      this.clearAlert();
    }
  }
};
</script>
<style>
.container{
    margin-top: 30px;
    margin-bottom: 30px;
}
</style>