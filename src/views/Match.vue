<template>
  <div class="about">
    <div class="about_left">
      <base-stats :data="account.dataAccount"></base-stats>
      <ranks
        :rank_solo="account.dataRank_solo"
        :rank_flex="account.dataRank_flex"
      ></ranks>
    </div>

    <div class="about_right">
      <div class="about_right_summary">
        <recent_summary></recent_summary>
      </div>
      <div class="about_right_matchesList">
        <div v-for="(i, index) in account.matchData" :key="i">
          <div v-if="account.matchData[index].info.gameType != 'CUSTOM_GAME'">
            <matchData
              :match="account.matchData[index]"
              :summonersPuuid="account.dataAccount.puuid"
              :region="data.region"
              :queueJson="account.queue"
              :spellsJson="account.spells"
              :runesJson="account.runes"
            ></matchData>
          </div>
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
      dataRank_solo: null,
      dataRank_flex: null,
      matchHistory: [],
      matchData: [],
      queue: null, //queue json
      spells: null, // spells json
      runes: null, // runes json
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

      axios(
        "http://ddragon.leagueoflegends.com/cdn/11.23.1/data/en_US/summoner.json"
      ).then((res) => {
        account.spells = res.data;
        console.log(res.data);
      });

      axios(
        "http://ddragon.leagueoflegends.com/cdn/11.23.1/data/en_US/runesReforged.json"
      ).then((res) => {
        account.runes = res.data;
        console.log(res.data);
      });

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
          console.log(res.data);

          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].queueType === "RANKED_SOLO_5x5") {
              account.dataRank_solo = res.data[i];
            }
          }
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].queueType === "RANKED_FLEX_SR") {
              account.dataRank_flex = res.data[i];
            }
          }
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
  margin-left: 10%;
  margin-right: 10%;
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
