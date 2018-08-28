<template>
  <v-app>
    <v-navigation-drawer temporary app v-model="sideNav">
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>
    <v-toolbar app dark class="blue darken-4">
      <v-toolbar-side-icon @click.stop="sideNav =! sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
         Vehicle's Engines DB
        </router-link> 
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-icon left>{{ item.icon }}</v-icon>
            {{ item.title }}
        </v-btn>

          <v-btn v-if="isLoggedIn" flat @click="onLogout">
            <v-icon left>exit_to_app</v-icon>
            Logout
          </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <main>
        <router-view></router-view>
    </main>

  </v-app>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      sideNav: false,
      isLoggedIn: false
      // menuItems: [
      //   {
      //     icon: "add_circle_outline",
      //     title: "Add engine",
      //     link: "/new-engine"
      //   },
      //   { icon: "face", title: "Sign Up", link: "/signup" },
      //   { icon: "lock_open", title: "Sign In", link: "/signin" }
      // ]
    };
  },
  computed: {
    menuItems() {
      let menuItems = [
        { icon: "face", title: "Sign Up", link: "/signup" },
        { icon: "lock_open", title: "Sign In", link: "/signin" }
      ];
      if (firebase.auth().currentUser) {
        this.isLoggedIn = true;
        menuItems = [
          {
            icon: "add_circle_outline",
            title: "Add engine",
            link: "/new-engine"
          }
        ];
      }
      return menuItems;
    }
  },
  // created() {
  //   let menuItems;
  //   if (firebase.auth().currentUser) {
  //     this.isLoggedIn = true;
  //   }
  // },
  methods: {
    onLogout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
    }
  }
};
</script>
<style>
main {
  margin-top: 80px;
}
</style>

