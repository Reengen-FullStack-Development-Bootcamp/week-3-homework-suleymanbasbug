<template>
  <div>
    <v-card color="red lighten-2" dark mt-10>
      <v-card-title class="text-h5 red lighten-3">
        Search for Public APIs
      </v-card-title>
      <v-card-text>
        Explore hundreds of free API's ready for consumption! For more
        information visit
        <a
          class="grey--text text--lighten-3"
          href="https://github.com/toddmotto/public-apis"
          target="_blank"
          >the GitHub repository</a
        >.
      </v-card-text>
      <v-card-text>
        <v-autocomplete
          v-model="model"
          :items="items"
          :loading="isLoading"
          :search-input.sync="search"
          color="white"
          hide-no-data
          hide-selected
          item-text="Description"
          item-value="API"
          label="Public APIs"
          placeholder="Start typing to Search"
          prepend-icon="mdi-database-search"
          return-object
        ></v-autocomplete>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>

        <router-link
          :to="{ path: `/symbol/${this.model}` }"
          tag="button"
          color="grey darken-3"
          ><v-btn :disabled="!model" color="grey darken-3"
            >GO</v-btn
          ></router-link
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    entries: [],
    isLoading: false,
    model: null,
    search: null,
  }),

  computed: {
    items() {
      return this.entries.map((entry) => {
        const symbol = entry["1. symbol"];
        return symbol;
      });
    },
    options() {
      return {
        method: "GET",
        url: "https://alpha-vantage.p.rapidapi.com/query",
        params: {
          keywords: this.search,
          function: "SYMBOL_SEARCH",
          datatype: "json",
        },
        headers: {
          "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
          "x-rapidapi-key":
            "72764a050dmsh008b01ed2464772p15d80ejsn7fb6b85c67ad",
        },
      };
    },
  },
  watch: {
    search() {
      if (this.search && this.search.length > 2) {
        this.isLoading = true;
        axios
          .request(this.options)
          .then((response) => {
            const { bestMatches } = response.data;
            this.entries = bestMatches;
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => (this.isLoading = false));
      }
    },
  },
};
</script>

<style></style>
