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
              <v-card class="px-3 py-3 mb-3">
                <v-text-field
                  name="brand"
                  label="Brand"
                  id="brand"
                  v-model="brand"
                  required
                  clearable
                >
                </v-text-field>
              </v-card>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3 >
              <v-card class="px-3 py-3 mb-3 d-flex justify-center">
                <v-flex xs12 sm4>
                  <v-subheader class="px-0">General Engine Image</v-subheader>
                </v-flex>
                <v-flex xs12 sm8>
                  <v-btn raised dark class="blue darken-4" @click="onPickFile">Upload Image</v-btn>
                  <input 
                  type="file" 
                  style="display: none" 
                  ref="fileInput" 
                  accept="image/*"
                  @change="onFilePicked">
                </v-flex>
              </v-card>
            </v-flex>
          </v-layout>

          <v-layout row v-if="general_engine_image">    
            <v-flex xs12>
                <img :src="general_engine_image" height="200" class="d-block mx-auto">
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-card class="px-3 py-3 mb-3">
                <v-text-field
                  name="engine_code"
                  label="Engine Code"
                  id="engine_code"
                  v-model="engine_code"
                  required
                  clearable
                >
                </v-text-field>
              </v-card>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-card class="px-3 py-3 mb-3">
                <v-text-field
                  name="cubic_capacity"
                  label="Cubic Capacity"
                  id="cubic_capacity"
                  v-model="cubic_capacity"
                  required
                  clearable
                >
                </v-text-field>
              </v-card>
            </v-flex>
          </v-layout>

           <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-card class="px-3 py-3 mb-3">
                <v-text-field
                  name="cylinders"
                  label="Cylinders"
                  id="cylinders"
                  v-model="cylinders"
                  required
                  clearable
                >
                </v-text-field>
              </v-card>
            </v-flex>
          </v-layout>

           <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-card class="px-3 py-3 mb-3">
                <v-text-field
                  name="built_in"
                  label="Built In"
                  id="built_in"
                  v-model="built_in"
                  required
                  clearable
                >
                </v-text-field>
              </v-card>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-card class="px-3 py-3 mb-3">
                <v-text-field
                  name="power_hp"
                  label="Power (hp)"
                  id="power_hp"
                  v-model="power_hp"
                  required
                  clearable
                >
                </v-text-field>
              </v-card>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-card class="px-3 py-3 mb-3">
                <v-text-field
                  name="power_kw"
                  label="Power (kw)"
                  id="power_kw"
                  v-model="power_kw"
                  required
                  clearable
                >
                </v-text-field>
              </v-card>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-card class="px-3 py-3 mb-3">
                <v-text-field
                  name="remark"
                  label="Fuel Type"
                  id="remark"
                  v-model="remark"
                  required
                  clearable
                >
                </v-text-field>
              </v-card>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex xs12 >
              <h1 class="text-md-center mb-4 indigo--text">Perfect Engine Charts</h1>
            </v-flex>
          </v-layout>

           <v-layout row wrap v-for="(chart, index) in charts" :key="index">
            <v-flex xs12 sm6 offset-sm3 class="text-field">
              <v-card class="px-3 py-3 mb-5">
                <v-text-field
                  name="charts"
                  label = "Chart Name"
                  required
                  v-model="chart.name"
                  clearable
                >
                </v-text-field>

                <v-layout row wrap class="mb-2">
                  <v-flex xs12 sm2>
                    <v-subheader class="px-0">Chart</v-subheader>
                  </v-flex>
                  <v-flex xs12 sm8>
                    <v-btn raised :disabled="!chart.name" class="blue darken-4 white--text" @click="onPickChart('chartInput' + index.toString())">
                      <v-icon left>attachment</v-icon>
                      Upload Chart
                    </v-btn>
                    <input 
                    type="file" 
                    style="display: none" 
                    :ref="'chartInput' + index.toString()" 
                    accept="image/*"
                    @change="onChartPicked($event,index)">
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
             <v-flex xs12 class="image-field mb-5" v-if="chart.chart">
            
                <img :src="chart.chart" height="150" class="d-block mx-auto">
            </v-flex>
          </v-layout>

          <v-layout row justify-center>
            <v-flex xs12 sm4 d-flex >
                <v-btn class="green white--text" @click="addNewChart">
                   <v-icon left>show_chart</v-icon>
                    Add new Chart
                </v-btn>

                 <v-btn class="red white--text" v-if="charts.length != 0" @click="removeChart">
                    <v-icon left>delete_outline</v-icon>
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
              <v-btn class="indigo white--text" type="submit" :disabled="!formIsValid">
                <v-icon left>control_point</v-icon>
                Add Engine
              </v-btn>
            </v-flex>
            <v-flex xs12 sm2 d-flex >
                <v-btn class="purple white--text" :to="{name: 'dashboard'}">
                  <v-icon left>cancel</v-icon>
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
      brand: "",
      built_in: "",
      cubic_capacity: "",
      cylinders: "",
      engine_code: "",
      power_hp: "",
      power_kw: "",
      remark: "",
      general_engine_image: "",
      charts: []
    };
  },
  computed: {
    formIsValid() {
      return (
        this.brand !== "" &&
        this.built_in !== "" &&
        this.cubic_capacity !== "" &&
        this.engine_code !== "" &&
        this.power_hp !== "" &&
        this.power_kw !== "" &&
        this.remark !== "" &&
        this.general_engine_image !== ""
      );
    }
  },
  methods: {
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      let fileName = files[0].name;
      if (fileName.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file!");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.general_engine_image = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.general_engine_image = files[0];
    },
    onPickChart(ref) {
      this.$refs[ref][0].click();
    },
    onChartPicked(event, index) {
      const files = event.target.files;
      let fileName = files[0].name;
      let newObj = {};

      if (fileName.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file!");
      }
      const fileReader = new FileReader();

      fileReader.addEventListener("load", () => {
        this.charts[index].chart = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.charts[index].chart = files[0];
    },
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
          general_engine_image: this.general_engine_image,
          charts: this.charts
        })
        .then(docRef => this.$router.push("/"))
        .catch(err => console.log(err));
    },
    addNewChart() {
      this.charts.push({ name: "", chart: "" });
    },
    removeChart() {
      this.charts.splice(-1, 1);
    }
  }
};
</script>
