<template>
  <v-app id="inspire">
    <search-bar></search-bar>

    <v-app-bar app >
      <v-row>
        <v-col>
          <span>My Gold</span>
        </v-col>

        <v-col>
          <span>Buy</span>
          <v-btn to="/buy" color="blue">Buy tab</v-btn>
        </v-col>
        <v-col>
          <span>Sell</span>
          <v-btn to="/sell" color="blue">Sell tab</v-btn>
        </v-col>

        <v-col>
          <span>History</span>
          <v-btn to="/history" color="blue">History tab</v-btn>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
  import SearchBar from "@/components/SearchBar";
  export default {
    components: {SearchBar},
    created() {
      this.$vuetify.theme.dark = true
    },
  }
</script>
