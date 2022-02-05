<template>
  <div>
      <p>grafice</p>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
    name: "graphs",
    props: {
        timeline: Object,
    },
    setup(){
        const data = reactive({
            test:null,
        });

        function getData(){
            console.log(this.timeline);
        }

        return{
            data,
            getData,
        }
    },
    mounted(){
        this.getData();
    }
}
</script>

<style lang="scss" scoped>


</style>