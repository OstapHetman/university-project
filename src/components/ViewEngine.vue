<template>
  <v-container>
    <v-layout row wrap justify-space-between align-center fill-height>
      <v-flex xs12 >
        <h1 class="text-md-center mb-4 indigo--text">{{ brand }}</h1>
      </v-flex>
      <v-flex xs12 md5>
        <img :src="general_engine_image" width class="image">
      </v-flex>
      <v-flex xs12 md5>
        <v-card>
          <v-toolbar dark color="purple lighten-1">
            <v-toolbar-title>General Information</v-toolbar-title>
          </v-toolbar>
           <v-list two-line subheader>
             <v-list-tile avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Engine Code:</v-list-tile-title>
                  <v-list-tile-sub-title>{{ engine_code }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-divider></v-divider>
          
              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Cylinders:</v-list-tile-title>
                  <v-list-tile-sub-title>{{ cylinders }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-divider></v-divider>

              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Cubic Capacity:</v-list-tile-title>
                  <v-list-tile-sub-title>{{ cubic_capacity }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-divider></v-divider>

              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Power (hp):</v-list-tile-title>
                  <v-list-tile-sub-title>{{ power_hp }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-divider></v-divider>

              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Power (kw):</v-list-tile-title>
                  <v-list-tile-sub-title>{{ power_kw }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-divider></v-divider>

              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Fuel Type:</v-list-tile-title>
                  <v-list-tile-sub-title>{{ remark }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-divider></v-divider>

              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Built In:</v-list-tile-title>
                  <v-list-tile-sub-title>{{ built_in }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
           </v-list>  
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 >
        <v-divider class="mt-5 mb-4"></v-divider>
        <h1 class="text-md-center mb-4 indigo--text">Perfect Engine Charts</h1>
      </v-flex>
    </v-layout>
    
    <v-layout row wrap justify-center align-center fill-height>
      <v-flex xs8 v-for="chart in charts" :key="chart.name" class="mb-5">
        <h1 class="text-md-center mb-2">{{ chart.name }}</h1>
        <img :src="chart.chart" class="image">
      </v-flex>
    </v-layout>

    <v-layout row wrap justify-end class="mt-4">
      <v-flex xs12 sm2 d-flex column>
        <v-btn color="error" @click="deleteEngine">
          <v-icon left>delete_outline</v-icon>
          Delete
        </v-btn>
      </v-flex>
      <v-flex xs12 sm2 d-flex>
        <v-btn class="purple white--text" :to="{name: 'edit-engine', params: {engine_id: engine_code}}" >
          <v-icon left>
            edit
          </v-icon>
            Edit
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>  
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "view-engine",
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
      charts: null
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
    deleteEngine() {
      if (confirm("Are you sure ?")) {
        db
          .collection("brands")
          .where("engine_code", "==", this.$route.params.engine_code)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.delete();
              this.$router.push("/");
            });
          });
      }
    }
  }
};
</script>

<style>
.image {
  width: 100%;
  height: auto;
}
.v-list--two-line .v-list__tile {
  height: 50px !important;
}
</style>


