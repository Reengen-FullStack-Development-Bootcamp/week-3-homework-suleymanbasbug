import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      type: "Admin",
    },
    chartData: {},
    loading: false,
  },
  mutations: {
    setChartData: (state, daily) => {
      state.chartData = daily;
    },
    setLoading: (state, loading) => {
      state.loading = loading;
    },
    setUserType: (state) => {
      if (state.user.type === "Admin") {
        state.user.type = "User";
      } else {
        state.user.type = "Admin";
      }
    },
  },
  actions: {
    async getDaily({ commit }, symbol) {
      let options = {
        method: "GET",
        url: "https://alpha-vantage.p.rapidapi.com/query",
        params: {
          function: "TIME_SERIES_DAILY",
          symbol: symbol,
          outputsize: "compact",
          datatype: "json",
        },
        headers: {
          "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
          "x-rapidapi-key":
            "72764a050dmsh008b01ed2464772p15d80ejsn7fb6b85c67ad",
        },
      };
      commit("setLoading", true);
      await axios
        .request(options)
        .then(({ data }) => {
          this.loading = true;
          let daily = [];
          Object.keys(data["Time Series (Daily)"]).forEach((key) => {
            daily.push({
              x: new Date(key),
              y: [
                data["Time Series (Daily)"][key]["1. open"],
                data["Time Series (Daily)"][key]["2. high"],
                data["Time Series (Daily)"][key]["3. low"],
                data["Time Series (Daily)"][key]["4. close"],
              ],
            });
          });
          commit("setChartData", daily);
          commit("setLoading", false);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async getWeekly({ commit }, symbol) {
      let options = {
        method: "GET",
        url: "https://alpha-vantage.p.rapidapi.com/query",
        params: {
          function: "TIME_SERIES_WEEKLY",
          symbol: symbol,
          datatype: "json",
        },
        headers: {
          "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
          "x-rapidapi-key":
            "72764a050dmsh008b01ed2464772p15d80ejsn7fb6b85c67ad",
        },
      };
      commit("setLoading", true);
      await axios
        .request(options)
        .then(({ data }) => {
          this.loading = true;
          let daily = [];
          Object.keys(data["Weekly Time Series"]).forEach((key) => {
            daily.push({
              x: new Date(key),
              y: [
                data["Weekly Time Series"][key]["1. open"],
                data["Weekly Time Series"][key]["2. high"],
                data["Weekly Time Series"][key]["3. low"],
                data["Weekly Time Series"][key]["4. close"],
              ],
            });
          });
          commit("setChartData", daily);
          commit("setLoading", false);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async getMonthly({ commit }, symbol) {
      let options = {
        method: "GET",
        url: "https://alpha-vantage.p.rapidapi.com/query",
        params: {
          symbol: symbol,
          function: "TIME_SERIES_MONTHLY",
          datatype: "json",
        },
        headers: {
          "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
          "x-rapidapi-key":
            "72764a050dmsh008b01ed2464772p15d80ejsn7fb6b85c67ad",
        },
      };
      commit("setLoading", true);
      await axios
        .request(options)
        .then(({ data }) => {
          this.loading = true;
          let daily = [];
          Object.keys(data["Monthly Time Series"]).forEach((key) => {
            daily.push({
              x: new Date(key),
              y: [
                data["Monthly Time Series"][key]["1. open"],
                data["Monthly Time Series"][key]["2. high"],
                data["Monthly Time Series"][key]["3. low"],
                data["Monthly Time Series"][key]["4. close"],
              ],
            });
          });
          commit("setChartData", daily);
          commit("setLoading", false);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  modules: {},
  getters: {
    user(state) {
      return state.user;
    },
    chartData(state) {
      return state.chartData;
    },
  },
});
