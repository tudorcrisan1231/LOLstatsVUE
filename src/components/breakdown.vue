<template>
  <div>
      <p>breakdown</p>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
    name: "breakdown",  
    props: {
      matchData: Object,
    },
    setup() {
      const stats = reactive({
        mvp:null,
        highestCS:null,
        highestDMG:null,
        bestGold:null,
        bestVS: null,
        highestKDA: null,
        first_blood: null,
      });
      
      function getStats() {
        console.log(this.matchData);
      }

      return {
        getStats,
        stats,
      }
    },
    mounted() {
      this.getStats();
    }
}
</script>

<style>

</style>