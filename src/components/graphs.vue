<template>
  <div class="chart_container">
      <p>Teams Gold graphics</p>
     <!-- <line-chart :data="Object.entries(data.test)" /> -->
     <!-- <line-chart :data="[['Team red: 05:43 (gold)', 44.334], ['Team blue: 06:31 (gold)', 23.314], ['Team blue: 07:31 (gold)', 13.314]]" :legend="false"></line-chart> -->
    <div v-if="data.ready!=0" class="chart">
        <line-chart :data="data.test" :legend="false" :curve="false" thousands="," color="#fff"></line-chart>
    </div>
    <div v-else>
        <svg class="loading_spin" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><circle cx="12" cy="2" r="0" fill="currentColor"><animate attributeName="r" values="0;2;0;0" dur="1s" repeatCount="indefinite" begin="0" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"/></circle><circle transform="rotate(45 12 12)" cx="12" cy="2" r="0" fill="currentColor"><animate attributeName="r" values="0;2;0;0" dur="1s" repeatCount="indefinite" begin="0.125s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"/></circle><circle transform="rotate(90 12 12)" cx="12" cy="2" r="0" fill="currentColor"><animate attributeName="r" values="0;2;0;0" dur="1s" repeatCount="indefinite" begin="0.25s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"/></circle><circle transform="rotate(135 12 12)" cx="12" cy="2" r="0" fill="currentColor"><animate attributeName="r" values="0;2;0;0" dur="1s" repeatCount="indefinite" begin="0.375s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"/></circle><circle transform="rotate(180 12 12)" cx="12" cy="2" r="0" fill="currentColor"><animate attributeName="r" values="0;2;0;0" dur="1s" repeatCount="indefinite" begin="0.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"/></circle><circle transform="rotate(225 12 12)" cx="12" cy="2" r="0" fill="currentColor"><animate attributeName="r" values="0;2;0;0" dur="1s" repeatCount="indefinite" begin="0.625s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"/></circle><circle transform="rotate(270 12 12)" cx="12" cy="2" r="0" fill="currentColor"><animate attributeName="r" values="0;2;0;0" dur="1s" repeatCount="indefinite" begin="0.75s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"/></circle><circle transform="rotate(315 12 12)" cx="12" cy="2" r="0" fill="currentColor"><animate attributeName="r" values="0;2;0;0" dur="1s" repeatCount="indefinite" begin="0.875s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"/></circle></svg>
    </div>

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
            //test:null,
            test:[
                {name: 'Blue Team (gold)', data: { }},
                {name: 'Red Team (gold)', data: { }}
            ],
            blue_gold:0,
            red_gold:0,
            ready:0,
        });

        function getData(){
            //var blue_gold=0, red_gold=0;
            
            if(this.timeline.info.frames.length<30){
                for(let i = 0; i < this.timeline.info.frames.length; i++){
                    data.blue_gold = 0;
                    data.red_gold = 0;
                    for(let j = 1; j <= 10; j++){  //<=10, numarul de jucatori din meci
                        if(j<=5){
                            data.blue_gold+=this.timeline.info.frames[i].participantFrames[j].totalGold;
                        } else if(j>5){
                            data.red_gold+=this.timeline.info.frames[i].participantFrames[j].totalGold;
                        }
                    }
                    // console.log('salut');
                    var time = this.timeline.info.frames[i].timestamp;
                    data.test[0].data[`${(this.timeline.info.frames[i].timestamp/1000/60).toFixed(0)}:00`] = data.blue_gold;
                    data.test[1].data[`${(this.timeline.info.frames[i].timestamp/1000/60).toFixed(0)}:00`] = data.red_gold;
                    // console.log(this.timeline.info.frames[i].timestamp, data.blue_gold, data.red_gold);

                    if(i==this.timeline.info.frames.length-1){
                        data.ready++;
                    }
                }
            } else if(this.timeline.info.frames.length>=30 && this.timeline.info.frames.length<40) {
                for(let i = 0; i < this.timeline.info.frames.length; i+=2){
                    data.blue_gold = 0;
                    data.red_gold = 0;
                    for(let j = 1; j <= 10; j++){  //<=10, numarul de jucatori din meci
                        if(j<=5){
                            data.blue_gold+=this.timeline.info.frames[i].participantFrames[j].totalGold;
                        } else if(j>5){
                            data.red_gold+=this.timeline.info.frames[i].participantFrames[j].totalGold;
                        }
                    }
                    // console.log('salut');
                    var time = this.timeline.info.frames[i].timestamp;
                    data.test[0].data[`${(this.timeline.info.frames[i].timestamp/1000/60).toFixed(0)}:00`] = data.blue_gold;
                    data.test[1].data[`${(this.timeline.info.frames[i].timestamp/1000/60).toFixed(0)}:00`] = data.red_gold;
                    // console.log(this.timeline.info.frames[i].timestamp, data.blue_gold, data.red_gold);

                    if(i>15){
                        data.ready++;
                    }
                }
            } else if(this.timeline.info.frames.length>=40){
                for(let i = 0; i < this.timeline.info.frames.length; i+=3){
                    data.blue_gold = 0;
                    data.red_gold = 0;
                    for(let j = 1; j <= 10; j++){  //<=10, numarul de jucatori din meci
                        if(j<=5){
                            data.blue_gold+=this.timeline.info.frames[i].participantFrames[j].totalGold;
                        } else if(j>5){
                            data.red_gold+=this.timeline.info.frames[i].participantFrames[j].totalGold;
                        }
                    }
                    // console.log('salut');
                    var time = this.timeline.info.frames[i].timestamp;
                    data.test[0].data[`${(this.timeline.info.frames[i].timestamp/1000/60).toFixed(0)}:00`] = data.blue_gold;
                    data.test[1].data[`${(this.timeline.info.frames[i].timestamp/1000/60).toFixed(0)}:00`] = data.red_gold;
                    // console.log(this.timeline.info.frames[i].timestamp, data.blue_gold, data.red_gold);

                    if(i>=13){
                        data.ready++;
                    }
                }               
            }


            console.log(data.test);
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
.chart{
    width: 100%;
    &_container{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-left: auto;
        margin-right: auto;
    }

    @media screen and (max-width: 1000px){
        width: 800px;
    }
    @media screen and (max-width: 900px){
        width: 700px;
    }
    @media screen and (max-width: 800px){
        width: 600px;
    }
    @media screen and (max-width: 700px){
        width: 500px;
    }
    @media screen and (max-width: 600px){
        width: 500px;
    }
    @media screen and (max-width: 550px){
        width: 400px;
    }
    @media screen and (max-width: 450px){
        width: 300px;
    }
    @media screen and (max-width: 350px){
        width: 250px;
    }
}

</style>