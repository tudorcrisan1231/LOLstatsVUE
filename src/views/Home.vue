<template>
  <div class="home">
    <!--<HelloWorld msg="Welcome to Your Vue.js App" />-->
    <!--<div>
      <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_iyocvb9g.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay class="lottie-player"></lottie-player>
    </div>-->
    <img src="../assets/illaoi.png" alt="" class="primary_img" />

    <form class="search">
      <select v-model="region" class="search_region" required>
        <option v-for="i in regions" :key="i" :value="i.value">
          {{ i.name }}
        </option>
      </select>

      <input
        type="text"
        placeholder="Summoner Name..."
        v-model="name"
        class="search_input"
        required
      />
      <router-link
        v-if="name && region"
        :to="'/' + region + '/' + name"
        class="search_btn_container"
      >
        <button class="search_btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 12 12"
          >
            <g fill="none">
              <path
                d="M5 1a4 4 0 1 0 2.453 7.16l2.693 2.694a.5.5 0 0 0 .707-.708L8.16 7.453A4 4 0 0 0 5 1zM2 5a3 3 0 1 1 6 0a3 3 0 0 1-6 0z"
                fill="currentColor"
              />
            </g>
          </svg>
        </button>
      </router-link>
      <!--cand sunt completate campurile cu regiune si nume, atunci se poate executa doar rounter-link ul (da submit la form), pana atunci se afiseaza simplu butonul, fara functie-->

      <button class="search_btn" v-else>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 12 12"
        >
          <g fill="none">
            <path
              d="M5 1a4 4 0 1 0 2.453 7.16l2.693 2.694a.5.5 0 0 0 .707-.708L8.16 7.453A4 4 0 0 0 5 1zM2 5a3 3 0 1 1 6 0a3 3 0 0 1-6 0z"
              fill="currentColor"
            />
          </g>
        </svg>
      </button>
    </form>

    <div class="free_to_play_container">
      <h4 class="free_to_play_title">Free to play champions:</h4>
      <div class="free_to_play">
        <div v-for="i in int.dataFreeChamps.freeChampionIds" :key="i">
          <Popper placement="top" arrow openDelay="200">
            <img
              :src="
                'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/' +
                i +
                '.png'
              "
              alt=""
              class="free_to_play_img"
              @click="getChampsName(i)"
            />
            <template #content>
              <div>{{ int.freeChampsName }}</div>
            </template>
          </Popper>
        </div>
      </div>
    </div>

    <div class="news_container">
      <h4 class="news_title">League of Legends news and useful links:</h4>
      <div class="news">
        <div v-for="i in news" :key="i">
          <a class="news_article" :href="i.link" target="_blank">
            <img :src="i.img" alt="patch_notes" class="news_img" />
            <div class="news_article_details">
              <h3 class="news_article_game">{{ i.name }}</h3>
              <p class="news_article_description">{{ i.description }}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";

import { ref, reactive } from "vue";
import axios from "axios";
import Popper from "vue3-popper";

export default {
  name: "Home",
  components: {
    // HelloWorld,
    Popper,
  },
  setup() {
    const name = ref(""); //summoners name
    const region = ref(""); // selected region
    const int = reactive({
      //data
      dataFreeChamps: "",
      freeChampsName: null,
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

    function getFreeToPlay() {
      axios(`http://localhost:3000/champion-v3`) // free champs rotation
        .then((res) => {
          int.dataFreeChamps = res.data;
          //console.log(res.data);
        });
    }

    function getChampsName(key) {
      axios(
        `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champions/${key}.json`
      ).then((res1) => {
        int.freeChampsName = res1.data.name;
      });
    }

    return {
      int,
      getFreeToPlay,
      name,
      region,
      regions,
      news,
      getChampsName,
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
