<template>
  <div class="recent" v-if="this.allMatches">
    <div>{{this.allMatches[4].info.participants[0].championName}}</div>
    <p>salut</p>
  </div>

</template>

<script>
import Popper from "vue3-popper";
import { reactive } from "vue";
export default {
  name: "recent_summary",
  components: {
    Popper,
  },
  props: {
    allMatches: Object, //toate meciurile pt a le face analiza
    puuid: String,
  },
  setup(){
    const matches = reactive({
      data: null,
    });
    function getData(){
       console.log(this.allMatches[0].info.gameMode);
    }

    return{
      matches,
      getData,
    }
  },
  mounted(){
    this.getData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.recent {
  height: 20rem;
  padding: .5rem;
}
</style>
