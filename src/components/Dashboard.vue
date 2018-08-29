<template>
    <v-container>
      <v-layout row wrap align-start fill-height>
        <v-flex xs2>
          <v-subheader>Select Brand</v-subheader>
        </v-flex>
        <v-flex xs3>
          <v-select
            v-model="selectedBrand"
            value="selectedBrand"
            :items="selectBrands"
            label="Select Brand"
            @input="selectChangeBrand()"
            solo
          ></v-select>
        </v-flex>

        <v-flex xs2 offset-xs2 class="select-year">
          <v-subheader>Select Year</v-subheader>
        </v-flex>
        <v-flex xs3 class="select-year">
          <v-select
            v-model="selectedYear"
            value="selectedYear"
            :items="selectYears"
            label="Select Year"
            @input="selectChangeYear()"
            solo
          ></v-select>
        </v-flex>

      </v-layout> 
      <v-layout row wrap justify-space-between class="mt-4">
        <v-flex xs12 sm10 md5 v-for="brand in brands" :key="brand.id"  class="mb-4 brand"  :class="[brand.brand.toLowerCase(), brand.built_in.toString()]" >
          <v-card class="white">
            <v-container fluid>
              <v-layout row>
                <v-flex xs5 sm4 md5>
                  <v-card-media
                      :src="brand.general_engine_image"
                      height="150px"
                    ></v-card-media>
                </v-flex>
                
                <v-flex xs7 sm8 md9>
                  <v-card-title primary-title>
                    <div>
                      <h2 class="indigo--text mb-0">Brand: "{{ brand.brand }}"</h2>
                      <div class="indigo--text">
                        <p class="mb-0">Engine Code: {{ brand.engine_code}}</p>
                        <p class="mb-0">Built In: {{ brand.built_in}}</p> 
                        <p class="mb-0">Fuel Type: {{ brand.remark}}</p> 
                        </div>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn class="indigo white--text" flat :to="'/view-engine/' + brand.engine_code">
                      <v-icon left light>arrow_forward</v-icon>
                          View More
                      </v-btn>
                  </v-card-actions>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "dashboard",
  data() {
    return {
      brands: [],
      selectBrands: [],
      selectYears: [],
      selectedBrand: "",
      selectedYear: ""
    };
  },
  created() {
    db
      .collection("brands")
      .orderBy("brand")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            brand: doc.data().brand,
            built_in: doc.data().built_in,
            cubic_capacity: doc.data().cubic_capacity,
            cylinders: doc.data().cylinders,
            engine_code: doc.data().engine_code,
            power_hp: doc.data().power_hp,
            power_kw: doc.data().power_kw,
            remark: doc.data().remark,
            general_engine_image: doc.data().general_engine_image
          };
          this.brands.push(data);
          this.selectBrands.push("All", ...[data.brand]);
          this.selectYears.push("All", ...[data.built_in]);
          return this.selectYears.sort((a, b) => {
            return a - b;
          });
        });
      });
  },
  methods: {
    selectChangeBrand: function() {
      let cards = document.querySelectorAll(".brand");
      const yearSelects = document.querySelectorAll(".select-year");

      cards.forEach(card => {
        if (!card.classList.contains(`${this.selectedBrand.toLowerCase()}`)) {
          card.style.display = "none";
          card.classList.remove("selected");
        } else {
          card.style.display = "block";
          card.classList.add("selected");
          yearSelects.forEach(el => {
            el.style.display = "block";
          });
        }
        if (this.selectedBrand.toLowerCase() == "all") {
          card.style.display = "block";
          card.classList.remove("selected");
          yearSelects.forEach(el => {
            el.style.display = "none";
          });
          return this.selectedBrand;
        }
      });
    },
    selectChangeYear: function() {
      let cards = document.querySelectorAll(".brand");
      const yearSelects = document.querySelectorAll(".select-year");
      cards.forEach(card => {
        if (!card.classList.contains(`${Number(this.selectedYear)}`)) {
          card.style.display = "none";
        } else if (card.classList.contains("selected")) {
          card.style.display = "block";
        }
        if (this.selectedYear == "All" & card.classList.contains("selected")) {
          card.style.display = "block";
          card.classList.remove("selected");
        }
      });
    }
  }
};
</script>

<style>
.select-year {
  display: none;
}
</style>


