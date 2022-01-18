<template>
  <div class="about">
    <div class="about_left">
      <base-stats
        :data="account.dataAccount"
        class="about_left_profile"
      ></base-stats>

      <button @click="account.openLiveGame = !account.openLiveGame" class="about_left_liveBtn">Live Game!</button>
      <ranks
        class="about_left_rank"
        :rank_solo="account.dataRank_solo"
        :rank_flex="account.dataRank_flex"
      ></ranks>
    </div>

    <div class="about_right">

      <div class="about_right_live" v-if="data.region && account.dataAccount && account.openLiveGame">
        <liveGame :regionLive="data.region" :accountIdLive="account.dataAccount" :spellsJsonLive="account.spells" :queueJsonLive="account.queue" :runesJsonLive="account.runes"></liveGame>
      </div>

      <div class="about_right_summary" v-if="account.matchData.length!=0 && account.dataAccount">
        <recent_summary :allMatches="account.matchData" :puuid="account.dataAccount.puuid"></recent_summary>
      </div>
      <div class="about_right_matchesList">
        <div v-for="(i, index) in account.matchData" :key="i">
          <div v-if="account.matchData[index].info.gameType != 'CUSTOM_GAME'">
            <matchData
              :match="account.matchData[index]"
              :summonersPuuid="account.dataAccount.puuid"
              :region="data.region"
              :continent="data.continent"
              :queueJson="account.queue"
              :spellsJson="account.spells"
              :runesJson="account.runes"
              :itemsJson="account.items"
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
import liveGame from "../components/liveGame.vue";

export default {
  name: "Match",
  components: {
    baseStats: baseStats,
    ranks: ranks,
    recent_summary: recent_summary,
    matchData: matchData,
    liveGame: liveGame,
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
      items: null, //items json
      openLiveGame:false,
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
        `http://ddragon.leagueoflegends.com/cdn/${this.lol_version}/data/en_US/summoner.json`
      ).then((res) => {
        account.spells = res.data;
        console.log(res.data);
      });

      axios(
        `http://ddragon.leagueoflegends.com/cdn/${this.lol_version}/data/en_US/runesReforged.json`
      ).then((res) => {
        account.runes = res.data;
        console.log(res.data);
      });

      axios(
        `http://ddragon.leagueoflegends.com/cdn/${this.lol_version}/data/en_US/item.json`
      ).then((res) => {
        account.items = res.data;
        console.log(res.data);
      });

      //get data from backend
      await axios(
        `http://localhost:3000/summoner-v4/${data.region}/${encodeURI(
          data.name
        )}` //ii pun encodeURI pt ca daca numele are caractere speciale il transforma in caractere care pot fi citite de pc
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
    this.data.name = encodeURI(route.params.name); //get name from route, ii pun encodeURI pt ca daca numele are caractere speciale il transforma in caractere care pot fi citite de pc
    this.data.region = route.params.region; //get region from route

    this.getData();

    this.getRegion();
  },
};
</script>

<style scoped lang="scss">
.about {
  margin-left: 15%;
  margin-right: 15%;
  margin-top: 5rem;

  display: grid;
  grid-template-columns: 35% 65%;
  gap: 3rem;

  @media screen and (min-width: 2000px) {
    margin-left: 20%;
    margin-right: 20%;
  }

  @media screen and (max-width: 1500px) {
    margin-left: 5%;
    margin-right: 5%;
  }
  @media screen and (max-width: 1350px) {
    margin-left: 2%;
    margin-right: 4%;
  }
  @media screen and (max-width: 1000px) {
    margin-left: 2%;
    margin-right: 2%;
  }

  @media screen and (max-width: 1200px) {
    grid-template-columns: 30% 70%;
  }

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
    margin-top: 2rem;
  }

  &_right {
    &_summary,&_live {
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

  &_left {
    display: flex;
    flex-direction: column;

    &_liveBtn {
      padding: 1rem;
      margin-top: 1rem;
      background-color: var(--color-win);
      border: 1px solid rgba(#72757e, 0.2);
      font-family: inherit;
      font-weight: bold;
      color: #fffffe;
      cursor: pointer;

      @media screen and (max-width: 500px) {
        font-weight: normal;
      }
    }

    @media screen and (max-width: 1000px) {
      display: grid;
      grid-template-columns: max-content 1fr;
      grid-template-rows: max-content max-content;
      gap: 1rem;
      align-items: stretch;

      &_liveBtn {
        grid-column: 1/-1;
        grid-row: 2/-1;
      }

      & > * {
        height: 100%;
        margin: 0;
      }
    }

    @media screen and (max-width: 500px) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
