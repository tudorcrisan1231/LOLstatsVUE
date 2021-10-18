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
    {{ int.dataAccount }}
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
      dataFreeChamps: null,
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

    function getData() {
      //get data from backend
      console.log("salut");

      axios(`http://localhost:3000/champion-v3`) // free champs rotation
        .then((res) => {
          int.dataFreeChamps = res.data;
          console.log(res.data);
        });
      //console.log(region.value)

      axios(`http://localhost:3000/summoner-v4/${region.value}/${name.value}`) // account details
        .then((res) => {
          int.dataAccount = res.data;
          console.log(res.data);
        });
    }

    return {
      int,
      getData,
      name,
      region,
      regions,
    };
  },
};
</script>
