<template>
  <div class="home">
    <!--<HelloWorld msg="Welcome to Your Vue.js App" />-->

    <select v-model="region">
      <option v-for="i in regions" :key="i" :value="i.value">
        {{ i.name }}
      </option>
    </select>

    <input
      type="text"
      placeholder="game tag"
      v-model="name"
      @keyup.enter="getData()"
    />

    <button @click="getData()">Search</button>

    <div class="free_to_play">
      <div v-for="i in int.dataFreeChamps.freeChampionIds" :key="i">
        <img
          :src="
            'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/' +
            i +
            '.png'
          "
          alt=""
          width="100"
          height="100"
        />
      </div>
    </div>

    <div class="news">
      <div v-for="i in news" :key="i">
        <a class="news_article news_1" :href="i.link" target="_blank">
          <img
            :src="i.img"
            alt="patch_notes"
            class="news_img"
            width="200"
            height="200"
          />
          <div class="news_article_details">
            <h3 class="news_article_game asd1">{{ i.name }}</h3>
            <p class="news_article_description">{{ i.description }}</p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";

import { ref, reactive } from "vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    // HelloWorld,
  },
  setup() {
    const name = ref(""); //summoners name
    const region = ref(""); // selected region
    const int = reactive({
      //data
      dataFreeChamps: "",
      dataAccount: null,
    });

    const regions = ref([
      { name: "EUNE", value: "eun1" },
      { name: "EUW", value: "euw1" },
      { name: "NA", value: "na1" },
      { name: "BR", value: "br1" },
      { name: "LAN", value: "la1" },
      { name: "LAS", value: "la2" },
      { name: "OCE", value: "oc1" },
      { name: "KR", value: "kr" },
      { name: "RU", value: "ru" },
      { name: "TR", value: "tr1" },
      { name: "JP", value: "jp1" },
    ]);

    const news = ref([
      {
        link: "https://www.leagueoflegends.com/en-us/news/game-updates/patch-11-21-notes/",
        name: "LEAGUE OF LEGENDS",
        description: "Patch 10.21 notes",
        img: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltb16f7bf3691493f5/5e32376ae147ae4537d93a32/LOL_PROMOART_5.jpg",
      },
      {
        link: "https://lolesports.com/",
        name: "LEAGUE OF LEGENDS",
        description: "Watch WORLDS 2021 for drops",
        img: "https://images.contentstack.io/v3/assets/bltad9188aa9a70543a/blt69c9ddbcdc18229b/616fe86bb05858694858be72/ArticleHeader_Lolincinemas.png?width=1600&height=900",
      },
      {
        link: "https://www.leagueoflegends.com/en-us/news/game-updates/teamfight-tactics-patch-11-21-notes/",
        name: "TEAMFIGHT TACTICS",
        description: "TFT patch 10.21 notes",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhOX7B0dohDs9FpWGcJaI6qlR9lH40ydP7-A&usqp=CAU",
      },
      {
        link: "https://www.leagueoflegends.com/en-us/news/game-updates/preseason-2022-pbe-preview/",
        name: "LEAGUE OF LEGENDS",
        description: "PRESEASON 2022: PBE PREVIEW",
        img: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt2a24c87c7ab9e0bf/616a827d35be917f1d1fc0a7/101921_Preseason2022_Banner.jpg",
      },
      {
        link: "https://wol.gg/",
        name: "LEAGUE OF LEGENDS",
        description: "See how much time you wasted in lol",
        img: "https://www.esports.net/wp-content/uploads/2020/02/wol-gg-wasted-on-lol-homepage.jpg",
      },
      {
        link: "https://www.leagueoflegends.com/en-us/news/game-updates/disabling-all-chat/",
        name: "LEAGUE OF LEGENDS",
        description: "DISABLING /ALL CHAT",
        img: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt0a67287cb5aba60b/6160b7a7aeba391136e44814/Behavioral_Systems_September_Banner_(1).jpg",
      },
      {
        link: "https://www.leagueoflegends.com/en-us/news/game-updates/ranked-rewards-2021/",
        name: "LEAGUE OF LEGENDS",
        description: "RANKED REWARDS 2021",
        img: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltae3bfdef2414090b/615b3aa5e289fa55888ed8f3/Victorious_Blitzcrank_1920.jpg",
      },
    ]);

    function getData() {
      //get data from backend
      axios(`http://localhost:3000/summoner-v4/${region.value}/${name.value}`) // account details
        .then((res) => {
          int.dataAccount = res.data;
          console.log(res.data);
        });
    }

    function getFreeToPlay() {
      axios(`http://localhost:3000/champion-v3`) // free champs rotation
        .then((res) => {
          int.dataFreeChamps = res.data;
          console.log(res.data);
        });
    }

    return {
      int,
      getData,
      getFreeToPlay,
      name,
      region,
      regions,
      news,
    };
  },
  mounted() {
    this.getFreeToPlay();
  },
};
</script>

<style lang="scss">
@import "../styles/search_page.scss"; // search_page styles
</style>
