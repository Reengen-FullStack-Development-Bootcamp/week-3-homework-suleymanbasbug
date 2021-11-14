<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn text>
        <router-link to="/"
          ><v-btn text><span class="mr-2">Home</span></v-btn></router-link
        >
      </v-btn>
      <v-btn text>
        <router-link to="/logs"
          ><v-btn text><span class="mr-2">Logs</span></v-btn></router-link
        >
      </v-btn>
      <v-spacer></v-spacer>

      <v-btn text>
        <span class="mr-2" @click="changeUser">Change User</span>
      </v-btn>
      <span>{{ user.type }}</span>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
// const fs = require("fs");
import { mapGetters } from "vuex";
export default {
  name: "App",

  data: () => ({
    //
  }),
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    changeUser() {
      this.$store.commit("setUserType");
    },
  },
};
</script>
