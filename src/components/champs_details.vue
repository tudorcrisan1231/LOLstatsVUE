<template>
  <div class="champs">
      <div class="champs_search">
        <input type="text" class="champs_search_input" placeholder="Search for a champion">
        <button type="submit" class="champs_search_btn"><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path d="M29 27.586l-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29zM4 13a9 9 0 1 1 9 9a9.01 9.01 0 0 1-9-9z" fill="currentColor"/></svg></button>
      </div>

      <div v-for="(i,index) in this.champs_points" :key="i">
        <div class="champs_icon">
          <img class="champs_img" :src="'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/' + this.champs_points[index].championId + '.png'" alt="champ_img">
          <img class="champs_borderImg" :src="'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-postgame/global/default/banner-mastery-small-lvl'+this.champs_points[index].championLevel+'.png'" alt="champ level">
          <img v-if="this.champs_points[index].chestGranted == true" class="champs_chestImg" src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-collections/global/default/images/item-element/hextech-chest.png" alt="chest img">
        </div>

        <div class="champs_data">
          <p v-if="champs.data.length==10" style="font-weight:bold;">{{champs.data[index].name}}</p>
          <div v-else>
            <svg class="loading_spin" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><circle cx="12" cy="2" r="0" fill="currentColor"><animate attributeName="r" values="0;2;0;0" dur="1s" repeatCount="indefinite" begin="0" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"/></circle><circle transform="rotate(45 12 12)" cx="12" cy="2" r="0" fill="currentColor"><animate attributeName="r" values="0;2;0;0" dur="1s" repeatCount="indefinite" begin="0.125s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"/></circle><circle transform="rotate(90 12 12)" cx="12" cy="2" r="0" fill="currentColor"><animate attributeName="r" values="0;2;0;0" dur="1s" repeatCount="indefinite" begin="0.25s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"/></circle><circle transform="rotate(135 12 12)" cx="12" cy="2" r="0" fill="currentColor"><animate attributeName="r" values="0;2;0;0" dur="1s" repeatCount="indefinite" begin="0.375s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"/></circle><circle transform="rotate(180 12 12)" cx="12" cy="2" r="0" fill="currentColor"><animate attributeName="r" values="0;2;0;0" dur="1s" repeatCount="indefinite" begin="0.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"/></circle><circle transform="rotate(225 12 12)" cx="12" cy="2" r="0" fill="currentColor"><animate attributeName="r" values="0;2;0;0" dur="1s" repeatCount="indefinite" begin="0.625s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"/></circle><circle transform="rotate(270 12 12)" cx="12" cy="2" r="0" fill="currentColor"><animate attributeName="r" values="0;2;0;0" dur="1s" repeatCount="indefinite" begin="0.75s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"/></circle><circle transform="rotate(315 12 12)" cx="12" cy="2" r="0" fill="currentColor"><animate attributeName="r" values="0;2;0;0" dur="1s" repeatCount="indefinite" begin="0.875s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"/></circle></svg>
          </div>
          <p>Level: {{this.champs_points[index].championLevel}}</p>

          <div class="champs_data_points">
            <img class="champs_noMasteryIcon" src="https://raw.communitydragon.org/latest/game/assets/ux/mastery/mastery_icon_default.png" alt="mastery icon">
            <p v-if="this.champs_points[index].championPoints<1000000">{{(this.champs_points[index].championPoints/1000).toFixed(1)}}K pts</p>
            <p v-else>{{(this.champs_points[index].championPoints/1000000).toFixed(2)}}mil pts</p>
          </div>
        </div>

        <div class="champs_time">
          <p v-if="Date.now()-this.champs_points[index].lastPlayTime < 3600000">{{Math.floor((Date.now()-this.champs_points[index].lastPlayTime)/1000/60)}} minutes ago*</p>
          <p v-else-if="Date.now()-this.champs_points[index].lastPlayTime < 86400000">{{Math.floor((Date.now()-this.champs_points[index].lastPlayTime)/3600000)}} hours ago*</p>
          <p v-else-if="Date.now()-this.champs_points[index].lastPlayTime > 86400000">{{Math.floor((Date.now()-this.champs_points[index].lastPlayTime)/86400000)}} <span v-if="Math.floor((Date.now()-this.champs_points[index].lastPlayTime)/86400000)<2">day</span>  <span v-else>days</span> ago*</p>
        </div>

      </div>

      <p>* last time played</p>
  </div>
</template>

<script>
import Popper from "vue3-popper";
import { reactive } from "vue";
import axios from "axios";
export default {
  name: "recent_summary",
  components: {
    Popper,
  },
  props: {
    champs_points: Array,
  },
  setup(){
    const champs = reactive({
      data:[],
      time:[],
      
    });

    async function getData(){
      console.log(this.champs_points);

      for(let i = 0; i < this.champs_points.length; i++){
        await axios(
          `http://localhost:3000/champ_data/${this.champs_points[i].championId}`
        ).then((res) => {
          champs.data.push(res.data);
        });
      }

      //console.log(Date.now());
    }
    

    return{
      champs,
      getData,
    }
  },
  mounted(){
    this.getData();
  }
}
</script>

<style lang="scss" scoped>

.champs{
  margin-top: 1rem;
  background-color: #242629;
  border: 1px solid rgba(#72757e, 0.2);
  font-size: 1.4rem;
  //padding: 1rem 0rem 1rem 0rem;

  &_search{
    display: grid;
    grid-template-columns: 1fr max-content;
    padding: 1rem;

    &_input{
      padding: .5rem;
      font-family: inherit;
      border: none;
      outline: none;
    }

    &_btn{
      padding: 1rem 1.5rem 1rem 1.5rem;
      cursor: pointer;
      border: none;
      background-color: var(--color-win);
      color: #fff;
      svg{
        width: 2rem;
        height: 2rem;
      }
    }
  }

  @media screen and (max-width: 1000px){
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;;
    column-gap: 1rem;
  }
  @media screen and (max-width: 500px){
    grid-template-columns: 1fr;
  }


  &>*:not(:first-child){
    padding: .2rem 1rem .2rem 1rem;

    display: grid;
    grid-template-columns: max-content 1fr max-content;
    align-items: center;
    gap: 1rem;
  }

  &_time{
    white-space: nowrap;
  }

  &_icon{
    position: relative;
    width: 5rem;
    height: 10rem;
  }
  &_borderImg{
    width: 5rem;
    height: 9rem;
    border-top-right-radius: 50%;
    border-top-left-radius: 50%;
    position: absolute;
    top: 58%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 0;
  }

  &_chestImg{
    width: 3rem;
    height: 3rem;
    position: absolute;
    top: .3rem;
    right: -1rem;
    z-index: 100 !important;
  }

  &>*:not(:last-child){
    border-bottom: 1px solid rgba(#72757e, 0.2);
  }

  &_img{
    width: 5rem;
    height: 5rem;
    z-index: 90 !important;
    position: absolute;
    top: 38%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 1px solid #fff;
    object-fit: cover;
  }

  &_data{

    &_points{
      display: flex;
      align-items: center;
      justify-content: flex-start;
      img{
        width: 3rem;
        height: 3rem;
      }
    }
  }
}


</style>