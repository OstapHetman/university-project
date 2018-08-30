<template>
    <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
          <h1 class="indigo--text text-md-center">Edit Engine</h1>
        </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 @submit.prevent="updateBrand">
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
              <v-divider class="mt-5 mb-4"></v-divider>
              <h1 class="text-md-center mb-4 indigo--text">Perfect Engine Charts</h1>
            </v-flex>
          </v-layout>

          <v-layout row wrap v-for="chart in charts" :key="chart.name">
            <v-flex xs12 sm6 offset-sm3 >
              <v-text-field
                name="charts"
                :label = "chart.name"
                id="charts"
                v-model="chart.chart"
                required
              >
              </v-text-field>
            </v-flex>
             <v-flex xs12 offset-sm3>
                <img :src="chart.chart" height="150">
            </v-flex>
          </v-layout>

          <v-layout row justify-center class="mt-5">
            <v-flex xs12 sm2 d-flex>
              <v-btn class="indigo white--text" type="submit">Update</v-btn>
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
  name: "edit-engine",
  data() {
    return {
      engine_id: null,
      brand: null,
      built_in: null,
      cubic_capacity: null,
      cylinders: null,
      engine_code: null,
      power_hp: null,
      power_kw: null,
      remark: null,
      general_engine_image: null,
      charts: []
    };
  },
  beforeRouteEnter(to, from, next) {
    db
      .collection("brands")
      .where("engine_code", "==", to.params.engine_code)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            (vm.brand = doc.data().brand),
              (vm.built_in = doc.data().built_in),
              (vm.cubic_capacity = doc.data().cubic_capacity),
              (vm.cylinders = doc.data().cylinders),
              (vm.engine_code = doc.data().engine_code),
              (vm.power_hp = doc.data().power_hp),
              (vm.power_kw = doc.data().power_kw),
              (vm.remark = doc.data().remark),
              (vm.general_engine_image = doc.data().general_engine_image),
              (vm.charts = doc.data().charts);
          });
        });
      });
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      db
        .collection("brands")
        .where("engine_code", "==", this.$route.params.engine_code)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            (this.brand = doc.data().brand),
              (this.built_in = doc.data().built_in),
              (this.cubic_capacity = doc.data().cubic_capacity),
              (this.cylinders = doc.data().cylinders),
              (this.engine_code = doc.data().engine_code),
              (this.power_hp = doc.data().power_hp),
              (this.power_kw = doc.data().power_kw),
              (this.remark = doc.data().remark),
              (this.general_engine_image = doc.data().general_engine_image),
              (this.charts = doc.data().charts);
          });
        });
    },
    updateBrand() {
      db
        .collection("brands")
        .where("engine_code", "==", this.$route.params.engine_code)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref
              .update({
                engine_id: this.engine_id,
                brand: this.brand,
                built_in: this.built_in,
                cubic_capacity: this.cubic_capacity,
                cylinders: this.cylinders,
                engine_code: this.engine_code,
                power_hp: this.power_hp,
                power_kw: this.power_kw,
                remark: this.remark,
                general_engine_image: this.general_engine_image,
                charts: this.charts
              })
              .then(() => {
                this.$router.push({
                  name: "view-engine",
                  params: { engine_code: this.engine_code }
                });
              });
          });
        });
    }
  }
};
</script>
