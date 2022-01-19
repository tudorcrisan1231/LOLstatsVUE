<template>
  <div class="recent" v-if="this.allMatches">
    <div class="recent_title">
      <h4>RECENT SUMMARY</h4> 
      <p>(last {{this.nr_meciuri}} games):</p> 
    </div>


    <div class="recent_summary">

    </div>


    <div class="recent_title">
      <h4>PERFORMANCE OVERVIEW:</h4> 
    </div>
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
      mainPlayerPoz:[], //array with all postion of main player in all matches
    });
    function getData(){
      //get main player poz array
      for(let i = 0; i<this.allMatches.length; i++){
        for(let j = 0; j < this.allMatches[i].metadata.participants.length; j++){
          if(this.puuid == this.allMatches[i].metadata.participants[j]){
            matches.mainPlayerPoz.push(j);
          }
        }
      }
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

  &_title{
    display: flex;

    h4{
      margin-right: .5rem;
    }
  }
}
</style>
