<template>
  <div class="about" v-if="account.dataAccount !== null">
    <div class="about_left">
      <div v-if="data.region">
        <base-stats
          :data="account.dataAccount"
          :region="data.region"
          class="about_left_profile"
        ></base-stats>
      </div>

      <button
        @click="account.openLiveGame = !account.openLiveGame"
        class="about_left_liveBtn"
      >
        Live Game!
      </button>
      <ranks
        class="about_left_rank"
        :rank_solo="account.dataRank_solo"
        :rank_flex="account.dataRank_flex"
      ></ranks>

      <div v-if="account.champs_points.length == 10" class="about_left_champs">
        <!--pun 10, pt ca presupun ca toate lumea are cel putin 10 campioni cu care au jucat macar odata-->
        <champsPoints
          :champs_points="account.champs_points"
          :region="data.region"
          :summonerID="account.dataAccount.id"
        ></champsPoints>
      </div>
      <div
        class="about_left_champs"
        v-else
        style="display: flex; align-items: center; justify-content: center"
      >
        <svg
          class="loading_spin"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="2" r="0" fill="currentColor">
            <animate
              attributeName="r"
              values="0;2;0;0"
              dur="1s"
              repeatCount="indefinite"
              begin="0"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              calcMode="spline"
            />
          </circle>
          <circle
            transform="rotate(45 12 12)"
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
          >
            <animate
              attributeName="r"
              values="0;2;0;0"
              dur="1s"
              repeatCount="indefinite"
              begin="0.125s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              calcMode="spline"
            />
          </circle>
          <circle
            transform="rotate(90 12 12)"
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
          >
            <animate
              attributeName="r"
              values="0;2;0;0"
              dur="1s"
              repeatCount="indefinite"
              begin="0.25s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              calcMode="spline"
            />
          </circle>
          <circle
            transform="rotate(135 12 12)"
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
          >
            <animate
              attributeName="r"
              values="0;2;0;0"
              dur="1s"
              repeatCount="indefinite"
              begin="0.375s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              calcMode="spline"
            />
          </circle>
          <circle
            transform="rotate(180 12 12)"
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
          >
            <animate
              attributeName="r"
              values="0;2;0;0"
              dur="1s"
              repeatCount="indefinite"
              begin="0.5s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              calcMode="spline"
            />
          </circle>
          <circle
            transform="rotate(225 12 12)"
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
          >
            <animate
              attributeName="r"
              values="0;2;0;0"
              dur="1s"
              repeatCount="indefinite"
              begin="0.625s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              calcMode="spline"
            />
          </circle>
          <circle
            transform="rotate(270 12 12)"
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
          >
            <animate
              attributeName="r"
              values="0;2;0;0"
              dur="1s"
              repeatCount="indefinite"
              begin="0.75s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              calcMode="spline"
            />
          </circle>
          <circle
            transform="rotate(315 12 12)"
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
          >
            <animate
              attributeName="r"
              values="0;2;0;0"
              dur="1s"
              repeatCount="indefinite"
              begin="0.875s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              calcMode="spline"
            />
          </circle>
        </svg>
      </div>
    </div>

    <div class="about_right">
      <div
        class="about_right_live"
        v-if="data.region && account.dataAccount && account.openLiveGame"
      >
        <liveGame
          :regionLive="data.region"
          :accountIdLive="account.dataAccount"
          :spellsJsonLive="account.spells"
          :queueJsonLive="account.queue"
          :runesJsonLive="account.runes"
        ></liveGame>
      </div>

      <div
        class="about_right_summary"
        v-if="
          account.matchData.length == this.nr_meciuri && account.dataAccount
        "
      >
        <recent_summary
          :allMatches="account.matchData"
          :puuid="account.dataAccount.puuid"
        ></recent_summary>
      </div>
      <div
        v-else
        style="display: flex; align-items: center; justify-content: center"
      >
        <svg
          class="loading_spin"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="2" r="0" fill="currentColor">
            <animate
              attributeName="r"
              values="0;2;0;0"
              dur="1s"
              repeatCount="indefinite"
              begin="0"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              calcMode="spline"
            />
          </circle>
          <circle
            transform="rotate(45 12 12)"
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
          >
            <animate
              attributeName="r"
              values="0;2;0;0"
              dur="1s"
              repeatCount="indefinite"
              begin="0.125s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              calcMode="spline"
            />
          </circle>
          <circle
            transform="rotate(90 12 12)"
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
          >
            <animate
              attributeName="r"
              values="0;2;0;0"
              dur="1s"
              repeatCount="indefinite"
              begin="0.25s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              calcMode="spline"
            />
          </circle>
          <circle
            transform="rotate(135 12 12)"
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
          >
            <animate
              attributeName="r"
              values="0;2;0;0"
              dur="1s"
              repeatCount="indefinite"
              begin="0.375s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              calcMode="spline"
            />
          </circle>
          <circle
            transform="rotate(180 12 12)"
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
          >
            <animate
              attributeName="r"
              values="0;2;0;0"
              dur="1s"
              repeatCount="indefinite"
              begin="0.5s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              calcMode="spline"
            />
          </circle>
          <circle
            transform="rotate(225 12 12)"
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
          >
            <animate
              attributeName="r"
              values="0;2;0;0"
              dur="1s"
              repeatCount="indefinite"
              begin="0.625s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              calcMode="spline"
            />
          </circle>
          <circle
            transform="rotate(270 12 12)"
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
          >
            <animate
              attributeName="r"
              values="0;2;0;0"
              dur="1s"
              repeatCount="indefinite"
              begin="0.75s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              calcMode="spline"
            />
          </circle>
          <circle
            transform="rotate(315 12 12)"
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
          >
            <animate
              attributeName="r"
              values="0;2;0;0"
              dur="1s"
              repeatCount="indefinite"
              begin="0.875s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              calcMode="spline"
            />
          </circle>
        </svg>
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
  <div v-else class="profile_notFound">
    <div>
      <p class="profile_notFound_title">
        <span style="color: var(--color-win)">'{{ data.name }}'</span> is not
        registered at
        <span style="color: var(--color-win)">'{{ data.region }}'</span>. Please
        check spelling or region.
      </p>
      <div
        v-for="(i, index) in data.notFound"
        :key="i"
        class="profile_notFound_player"
      >
        <p class="profile_notFound_player_region">
          {{ data.notFound[index][1] }}:
        </p>

        <div v-if="data.notFound[index][0] == 'no'">
          <p>-</p>
        </div>
        <div v-else>
          <a
            :href="
              '/' + data.notFound[index][1] + '/' + data.notFound[index][0].name
            "
            class="profile_notFound_player_item"
            target="_blank"
          >
            <img
              :src="
                'http://ddragon.leagueoflegends.com/cdn/12.3.1/img/profileicon/' +
                data.notFound[index][0].profileIconId +
                '.png'
              "
              alt=""
            />
            <p>{{ data.notFound[index][0].name }}</p>
            <p>-</p>
            <p>Level: {{ data.notFound[index][0].summonerLevel }}</p>
          </a>
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
import champsPoints from "../components/champs_details.vue";

export default {
  name: "Match",
  components: {
    baseStats: baseStats,
    ranks: ranks,
    recent_summary: recent_summary,
    matchData: matchData,
    liveGame: liveGame,
    champsPoints: champsPoints,
  },
  setup() {
    const data = reactive({
      //parametrii bagati in Home.vue
      //data
      name: "",
      region: "",
      continent: "",
      notFound: [], //vector cu datele despre cont daca nu a fost gasit pe o regiune(ex daca caut Sm03KeR pe euw1, nu o sa l gaseasca, asa ca o sa caute pe toate celelalte regiuni, daca il gaseste pe una baga datele)
      regions: [
        "eun1",
        "tr",
        "euw1",
        "ru",
        "na1",
        "br1",
        "la1",
        "la2",
        "oc1",
        "jp1",
        "kr",
      ],
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
      openLiveGame: false,
      champs_points: [],
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
          //account.dataAccount = res.data;
          if (res.data.hasOwnProperty("status")) {
            account.dataAccount = null;
          } else {
            account.dataAccount = res.data;
          }
          console.log(res.data);
        });

      if (account.dataAccount != null) {
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

        await axios(
          `http://localhost:3000/champs_points/${data.region}/${account.dataAccount.id}`
        ) // champs points
          .then((res) => {
            for (let i = 0; i < 10; i++) {
              if (res.data[i]) {
                account.champs_points.push(res.data[i]);
              }
            }
            //console.log(res.data);
          });
      }
    }

    async function getDataNotFound() {
      if (account.dataAccount == null) {
        console.log("not found");

        for (let i = 0; i < data.regions.length; i++) {
          //console.log(data.regions[i]);
          axios(
            `http://localhost:3000/summoner-v4/${data.regions[i]}/${encodeURI(
              data.name
            )}`
          ).then((res) => {
            if (res.data.hasOwnProperty("status")) {
              data.notFound.push(["no", data.regions[i]]);
              //console.log('nu are');
            } else {
              data.notFound.push([res.data, data.regions[i]]);
              //console.log('are');
            }
          });
        }
        console.log(data.notFound);
      }
    }

    return {
      data,
      getData,
      account,
      getRegion,
      getDataNotFound,
    };
  },
  mounted() {
    const route = useRoute();
    this.data.name = encodeURI(route.params.name); //get name from route, ii pun encodeURI pt ca daca numele are caractere speciale il transforma in caractere care pot fi citite de pc
    this.data.region = route.params.region; //get region from route

    this.getData();

    this.getRegion();

    // this.getDataNotFound();
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
    &_summary,
    &_live {
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

    &_champs {
      @media screen and (max-width: 1000px) {
        grid-column: 1/-1;
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
