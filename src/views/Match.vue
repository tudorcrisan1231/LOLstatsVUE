<template>
  <div class="about">
    <div class="about_left">
      <base-stats :data="account.dataAccount"></base-stats>
      <ranks :ranks="account.dataRank"></ranks>
    </div>

    <div class="about_right"></div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { reactive } from "vue";
import axios from "axios";
//import Popper from "vue3-popper";

import baseStats from "../components/baseStats.vue";
import ranks from "../components/ranks.vue";

export default {
  name: "Match",
  components: {
    baseStats: baseStats,
    ranks: ranks,
  },
  setup() {
    const data = reactive({
      //parametrii bagati in Home.vue
      //data
      name: "",
      region: "",
    });

    const account = reactive({
      dataAccount: null,
      dataRank: null,
    });

    async function getData() {
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
    }

    return {
      data,
      getData,
      account,
    };
  },
  mounted() {
    const route = useRoute();
    this.data.name = route.params.name; //get name from route
    this.data.region = route.params.region; //get region from route

    this.getData();
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
}
</style>
