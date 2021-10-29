<template>
  <div class="about">
    <h1>This is an about page {{ data.name }} {{ data.region }}</h1>
    <p style="color: #ffffff" v-if="account.dataAccount">
      {{ account.dataAccount }}
    </p>
    <p style="color: #ffffff" v-else>Account not found</p>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { reactive } from "vue";
import axios from "axios";
//import Popper from "vue3-popper";

export default {
  name: "Match",
  setup() {
    const data = reactive({
      //parametrii bagati in Home.vue
      //data
      name: "",
      region: "",
    });

    const account = reactive({
      dataAccount: null,
    });

    function getData() {
      //get data from backend
      axios(`http://localhost:3000/summoner-v4/${data.region}/${data.name}`) // account details
        .then((res) => {
          account.dataAccount = res.data;
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
