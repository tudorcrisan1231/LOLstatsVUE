<template>
  <div>
      <div class="navbar">
        <button class="navbar_btn" @click="toggle.overview = true; toggle.builds = false; toggle.advanced = false; toggle.breakdown = false;">Overview</button>
        <button class="navbar_btn" @click="toggle.overview = false; toggle.builds = true; toggle.advanced = false; toggle.breakdown = false;">Timeline</button>
        <button class="navbar_btn" @click="toggle.overview = false; toggle.builds = false; toggle.advanced = true; toggle.breakdown = false;">Advanced</button>
        <button class="navbar_btn" @click="toggle.overview = false; toggle.builds = false; toggle.advanced = false; toggle.breakdown = true;">Breakdown</button>
      </div>

      <div v-if="toggle.overview && this.champsData">
        <overview :matchData="this.matchInfo" :itemsData="this.itemsInfo" :spellsData="this.spellsInfo" :runesData="this.runesInfo" :regionData="this.regionInfo" :champsInfo="this.champsData"></overview>
      </div>

      <div v-if="toggle.builds && this.champsData">
        <builds :gameID="this.matchInfo.metadata.matchId" :continent="this.continentInfo" :summonersPuuid="this.puuid" :itemsJson="this.itemsInfo" :champsInfo="this.champsData"></builds>
      </div>

      <div v-if="toggle.advanced && this.champsData">
        <advanced :matchData="this.matchInfo" :champsInfo="this.champsData"></advanced>
      </div>

      <div v-if="toggle.breakdown">
        <breakdown :matchData="this.matchInfo"></breakdown>
      </div>


      <!-- <p style="width:200px;">{{this.matchInfo}}</p>  -->
  </div>
</template>

<script>
import { reactive } from "vue";

import overview from "../components/overview.vue";
import builds from "../components/builds.vue";
import advanced from "../components/advanced.vue";
import breakdown from "../components/breakdown.vue";


export default {
  name: "match_history_advancedDetails_nav",
  components: {
    overview: overview,
    builds: builds,
    advanced: advanced,
    breakdown: breakdown,
  },
  props: {
    matchInfo: Object, //match details
    itemsInfo: Object, //json with all items
    spellsInfo: Object, //json cu speels data
    runesInfo: Object, //json cu runes data
    regionInfo: String, //region
    continentInfo: String, //continent
    puuid: String, //puuid ul player ul principal (cel cautat)
    champsData: Array, //array cu datele despre fircare campion din joc
  },
  setup() {
    const toggle = reactive({
      overview: true,
      builds: false,
      advanced: false,
      breakdown: false,
    });


    return {
      toggle,
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4,1fr);
  align-items: center;
  gap: .5rem;
  justify-content: space-between;
  margin-top: 1rem;

  &_btn {
    width: 100%;
    background-color: transparent;
    border: 1px solid lightgrey;
    outline: none;
    color: #fff;
    font-size: 1.3rem;
    font-family: inherit;
    cursor: pointer;
    transition: all .2s;
    @media screen and (max-width: 500px) {
      font-size: 1.1rem !important;
    }



    &:hover {
      transform: translateY(-2px);
    }
    &:active {
      transform: translateY(2px);
    }
  }
}

</style>