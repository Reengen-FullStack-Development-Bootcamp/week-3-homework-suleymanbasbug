<template>
  <div>
    <v-card class="mx-auto" tile>
      <v-list-item v-for="log in logs" :key="log.date" two-line>
        <v-list-item-content v-if="log.type === 1">
          <v-list-item-title>{{
            `to:${log.to} from :${log.from}`
          }}</v-list-item-title>
          <v-list-item-subtitle>{{
            `Date : ${log.date}`
          }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-content v-else>
          <v-list-item-title class="red--text">{{
            log.message
          }}</v-list-item-title>
          <v-list-item-subtitle class="red--text">{{
            `Date : ${log.date}`
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    logs: [],
  }),
  created() {
    axios
      .get(
        "https://reengen-f993d-default-rtdb.europe-west1.firebasedatabase.app/logs.json"
      )
      .then(({ data }) => {
        this.logs = Object.values(data);
      });
  },
};
</script>

<style></style>
