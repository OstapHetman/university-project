<template>
     <v-container class="mt-5">
        <v-layout row v-if="errorText">
            <v-flex xs12 sm6 offset-sm3>
                <app-alert @dismissed="onDismissed" :text="errorText"></app-alert>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                  <v-card-text class="pb-0">
                    <h1 class="purple--text mb-0 text-xs-center">Sign In</h1>
                  </v-card-text>
                    <v-card-text class="pt-0">
                        <v-container>
                            <form @submit.prevent="onSignin">
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                        name="email"
                                        label="Mail"
                                        id="email"
                                        v-model="email"
                                        type="email"
                                        required
                                        prepend-icon="email"
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                        name="password"
                                        label="Password"
                                        id="password"
                                        v-model="password"
                                        type="password"
                                        required
                                        prepend-icon="lock"
                                        
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row justify-center>
                                    <v-flex xs12 sm4 d-flex>
                                        <v-btn 
                                        type="Submit"
                                        class="purple white--text"
                                        >
                                        Sign in
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import firebase from "firebase";
export default {
  name: "signin",
  data() {
    return {
      email: "",
      password: "",
      errorText: null
    };
  },
  methods: {
    onSignin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            this.$router.go({ path: this.$router.path });
          },
          err => {
            this.errorText = err.message;
          }
        );
    },
    onDismissed() {
      this.errorText = null;
    }
  }
};
</script>
