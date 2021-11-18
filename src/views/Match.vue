<template>
  <div class="about">
    <div class="about_left">
      <base-stats :data="account.dataAccount"></base-stats>
      <ranks :ranks="account.dataRank"></ranks>
    </div>

    <div class="about_right">
      <div class="about_right_summary">
        <recent_summary></recent_summary>
      </div>
      <div class="about_right_matchesList">
        <div v-for="(i, index) in account.matchData" :key="i">
          <matchData
            :match="account.matchData[index]"
            :summonersPuuid="account.dataAccount.puuid"
            :queueJson="account.queue"
          ></matchData>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { reactive } from "vue";
import axios from "axios";
//import Popper from "vue3-popper";

import baseStats from "../components/baseStats.vue";
import ranks from "../components/ranks.vue";
import recent_summary from "../components/recent_summary.vue";
import matchData from "../components/match_history.vue";

export default {
  name: "Match",
  components: {
    baseStats: baseStats,
    ranks: ranks,
    recent_summary: recent_summary,
    matchData: matchData,
  },
  setup() {
    const data = reactive({
      //parametrii bagati in Home.vue
      //data
      name: "",
      region: "",
      continent: "",
    });

    const account = reactive({
      dataAccount: null,
      dataRank: null,
      matchHistory: [],
      matchData: [],
      queue: null, //queue json
    });

    function getRegion() {
      if (
        data.region == "eun1" ||
        data.region == "tr" ||
        data.region == "euw1" ||
        data.region == "ru"
      ) {
        data.continent = "europe";
      } else if (
        data.region == "na1" ||
        data.region == "br1" ||
        data.region == "la1" ||
        data.region == "la2" ||
        data.region == "oc1"
      ) {
        data.continent = "americas";
      } else {
        data.continent = "asia";
      }
    }

    async function getData() {
      axios("https://static.developer.riotgames.com/docs/lol/queues.json").then(
        (res) => {
          account.queue = res.data;
          console.log(res.data);
        }
      );

      //get data from backend
      await axios(
        `http://localhost:3000/summoner-v4/${data.region}/${data.name}`
      ) // account details
        .then((res) => {
          account.dataAccount = res.data;
          console.log(res.data);
        });

      await axios(
        `http://localhost:3000/league-v4/${data.region}/${account.dataAccount.id}`
      ) // rank details
        .then((res) => {
          account.dataRank = res.data;
          console.log(res.data);
        });

      await axios(
        `http://localhost:3000/match-history-v5/${data.continent}/${account.dataAccount.puuid}`
      ) // match history
        .then((res) => {
          account.matchHistory = res.data;
          console.log(res.data);
        });

      for (let i = 0; i < account.matchHistory.length; i++) {
        await axios(
          `http://localhost:3000/match-data-v5/${data.continent}/${account.matchHistory[i]}`
        ) // match data
          .then((res) => {
            account.matchData.push(res.data);
            console.log(res.data);
          });
      }
      console.log(account.matchData);
    }

    return {
      data,
      getData,
      account,
      getRegion,
    };
  },
  mounted() {
    const route = useRoute();
    this.data.name = route.params.name; //get name from route
    this.data.region = route.params.region; //get region from route

    this.getData();

    this.getRegion();
  },
};
</script>

<style scoped lang="scss">
.about {
  margin-left: 20%;
  margin-right: 20%;
  height: 100vh;
  margin-top: 5rem;

  display: grid;
  grid-template-columns: 35% 65%;
  gap: 3rem;

  &_right {
    &_summary {
      color: #fffffe;
      background-color: #242629;
      border: 1px solid rgba(#72757e, 0.2);
      font-size: 1.4rem;
      margin-bottom: 2rem;
    }
    &_matchesList {
      color: #fffffe;
      background-color: #242629;
      border: 1px solid rgba(#72757e, 0.2);
      font-size: 1.4rem;
      margin-bottom: 1rem;
    }
  }
}
</style>
