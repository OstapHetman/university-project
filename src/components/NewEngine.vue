<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
          <h1 class="indigo--text text-md-center">Add a New Engine</h1>
        </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 @submit.prevent="saveBrand">
        <form class="mt-3">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="brand"
                label="Brand"
                id="brand"
                v-model="brand"
                required
              >
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="general_engine_image"
                label="General Engine Image"
                id="general_engine_image"
                v-model="general_engine_image"
                required
              >
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row v-if="general_engine_image">    
            <v-flex xs12 sm6 offset-sm3>
                <img :src="general_engine_image" height="150">
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="engine_code"
                label="Engine Code"
                id="engine_code"
                v-model="engine_code"
                required
              >
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="cubic_capacity"
                label="Cubic Capacity"
                id="cubic_capacity"
                v-model="cubic_capacity"
                required
              >
              </v-text-field>
            </v-flex>
          </v-layout>

           <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="cylinders"
                label="Cylinders"
                id="cylinders"
                v-model="cylinders"
                required
              >
              </v-text-field>
            </v-flex>
          </v-layout>

           <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="built_in"
                label="Built In"
                id="built_in"
                v-model="built_in"
                required
              >
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="power_hp"
                label="Power (hp)"
                id="power_hp"
                v-model="power_hp"
                required
              >
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="power_kw"
                label="Power (kw)"
                id="power_kw"
                v-model="power_kw"
                required
              >
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="remark"
                label="Fuel Type"
                id="remark"
                v-model="remark"
                required
              >
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex xs12 >
              <h1 class="text-md-center mb-4 indigo--text">Perfect Engine Charts</h1>
            </v-flex>
          </v-layout>

           <v-layout row wrap v-if="addNewChartClicked" v-for="click in clicks" :key="click">
            <v-flex xs12 sm6 offset-sm3 class="text-field">
              <v-text-field
                name="charts"
                label = "Charts"
                
                v-model="charts"
                required
              >
              </v-text-field>
              <p> {{click}}</p>
            </v-flex>
             <v-flex xs12 offset-sm3 class="image-field">
                <img :src="charts" height="150">
            </v-flex>
          </v-layout>

          <v-layout row justify-center>
            <v-flex xs12 sm4 d-flex >
                <v-btn class="green white--text" @click="addNewChart">
                    Add new Chart
                </v-btn>

                 <v-btn class="red white--text" v-if="clicks > 0" @click="removeChart">
                    Remove Chart
                </v-btn>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12>
              <v-divider class="mb-4 mt-5"></v-divider>
            </v-flex>
          </v-layout>

          <v-layout row justify-center>
            <v-flex xs12 sm2 d-flex>
              <v-btn class="indigo white--text" type="submit">Add Engine</v-btn>
            </v-flex>
            <v-flex xs12 sm2 d-flex >
                <v-btn class="purple white--text" :to="{name: 'dashboard'}">
                    Cancel
                </v-btn>
            </v-flex>
          </v-layout>

        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import db from "./firebaseInit";

export default {
  name: "new-engine",
  data() {
    return {
      brand: null,
      built_in: null,
      cubic_capacity: null,
      cylinders: null,
      engine_code: null,
      power_hp: null,
      power_kw: null,
      remark: null,
      general_engine_image: null,
      chart_name: null,
      chart_image: null,
      charts: [],
      addNewChartClicked: false,
      clicks: null
    };
  },
  methods: {
    saveBrand() {
      db
        .collection("brands")
        .add({
          brand: this.brand,
          built_in: this.built_in,
          cubic_capacity: this.cubic_capacity,
          cylinders: this.cylinders,
          engine_code: this.engine_code,
          power_hp: this.power_hp,
          power_kw: this.power_kw,
          remark: this.remark,
          general_engine_image: this.general_engine_image
        })
        .then(docRef => this.$router.push("/"));
    },
    addNewChart() {
      this.addNewChartClicked = true;
      this.clicks += 1;
    },
    removeChart() {
      this.clicks--;
    }
  }
};
</script>
