<template>
  <div v-if="data.mainPlayerPOZ && data.timeline && data.timelineMainAbilitati && data.timelineMainItems" class="timeline">
      <h4 class="timeline_title">Items build order:</h4>
 
      <div class="timeline_items">

        <div v-for="(i, index) in data.groupItems" :key="i" class="timeline_items_group">
          <p class="timeline_items_group_time">{{data.groupItems[index][0][2]}} min</p>

          <div class="timeline_items_sub">
            <div v-for="(j, poz) in data.groupItems[index]" :key="j">

              <Popper placement="top" arrow hover v-if="data.groupItems[index][poz][0]>=7000 && data.groupItems[index][poz][0]<=7025">
                <div>
                  <img
                      src="https://raw.communitydragon.org/latest/game/assets/items/itemmodifiers/bordertreatmentornn.png"
                      alt="placeholder ornn item"
                      class="timeline_items_box_img"
                  />
                </div>
                <template #content>
                    <div style="max-width: 400px">
                        <p>Ornn item upgrade</p>
                    </div>
                </template>
              </Popper>

              <Popper placement="top" arrow hover v-else>
                <div>
                  <img
                    :src="
                    'http://ddragon.leagueoflegends.com/cdn/' +
                    this.lol_version +
                    '/img/item/' +
                    data.groupItems[index][poz][0] +
                    '.png'
                    "
                    alt="item"
                    class="timeline_items_box_img"
                    :class="data.groupItems[index][poz][1]=='ITEM_SOLD' ? 'sold_img' : ''"
                  />
                </div>
                <template #content>
                    <div style="max-width: 400px">
                      <div style="text-align: left">
                        <p class="spell_name">
                            {{
                            this.itemsJson.data[
                                data.groupItems[index][poz][0] //se ia din json ul cu iteme, itemul cu id ul respectiv
                            ].name
                            }}
                            <span v-if="data.groupItems[index][poz][1]=='ITEM_SOLD'" style="color:red;">SOLD</span>
                        </p>
                        <p
                            style="max-width: 400px"
                            v-html="
                            this.itemsJson.data[
                                data.groupItems[index][poz][0]
                            ].description"
                        ></p>
                        <p class="spell_name">
                            Cost:
                            {{
                            this.itemsJson.data[
                                data.groupItems[index][poz][0]
                            ].gold.total
                            }}
                        </p>
                      </div>
                    </div>
                </template>
              </Popper>

            </div>
          </div>

          <!-- <svg class="timeline_items_group_svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path d="M715.8 493.5L335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37z" fill="currentColor"/></svg> -->
        </div>
      </div>


      <h4 class="timeline_title">Skills build order:</h4>
      <div class="timeline_skills_container" style="overflow-x:auto;">
        <table class="timeline_skills">
          <tr>
            <td class="skill_p">
              Q
            </td>
            <td v-for="(i,index) in data.timelineMainAbilitati" :key="i" :class="data.timelineQWER[index]=='Q' ? 'table_abilitate' : ''">
              <Popper placement="top" hover  v-if="data.timelineQWER[index]=='Q'">
                <span>{{index+1}}</span>
                <template #content>
                    <div style="max-width: 400px">
                        <p>{{data.timeAbilitati[index]}}</p>
                    </div>
                </template>
              </Popper>
              <span v-else></span>
            </td>
          </tr>
          <tr>
            <td class="skill_p">W</td>
            <td v-for="(i,index) in data.timelineMainAbilitati" :key="i" :class="data.timelineQWER[index]=='W' ? 'table_abilitate' : ''">
              <Popper placement="top" hover  v-if="data.timelineQWER[index]=='W'">
                <span>{{index+1}}</span>
                <template #content>
                    <div style="max-width: 400px">
                        <p>{{data.timeAbilitati[index]}}</p>
                    </div>
                </template>
              </Popper>

              <span v-else></span>
            </td>
          </tr>
          <tr>
            <td class="skill_p">E</td>
            <td v-for="(i,index) in data.timelineMainAbilitati" :key="i" :class="data.timelineQWER[index]=='E' ? 'table_abilitate' : ''">
              <Popper placement="top" hover  v-if="data.timelineQWER[index]=='E'">
                <span>{{index+1}}</span>
                <template #content>
                    <div style="max-width: 400px">
                        <p>{{data.timeAbilitati[index]}}</p>
                    </div>
                </template>
              </Popper>
              <span v-else></span>
            </td>
          </tr>
          <tr>
            <td class="skill_p">R</td>
            <td v-for="(i,index) in data.timelineMainAbilitati" :key="i" :class="data.timelineQWER[index]=='R' ? 'table_abilitate' : ''">
              <Popper placement="top" hover  v-if="data.timelineQWER[index]=='R'">
                <span>{{index+1}}</span>
                <template #content>
                    <div style="max-width: 400px">
                        <p>{{data.timeAbilitati[index]}}</p>
                    </div>
                </template>
              </Popper>
              <span v-else></span>
            </td>
          </tr>
        </table>

        <div class="skill" style="display:flex; justify-content: center;">
          <div v-for="(j,poz) in data.skills" :key="j" class="skill_box">
            <div>
              <Popper placement="top" hover>
                  <img class="skill_img" :src="'https://ddragon.leagueoflegends.com/cdn/'+ this.lol_version +'/img/spell/'+ this.champsInfo[data.mainPlayerPOZ-1].spells[poz].id +'.png'" alt="skill_lol_q">
                  <template #content>
                      <div style="max-width: 400px" class="skill_tooltip">
                          <p class="spell_name">{{this.champsInfo[data.mainPlayerPOZ-1].spells[poz].name}}</p>

                          <p class="skill_cc">Cooldown:
                            <span v-for="(i,index) in this.champsInfo[data.mainPlayerPOZ-1].spells[poz].cooldown" :key="i">
                              <span> {{this.champsInfo[data.mainPlayerPOZ-1].spells[poz].cooldown[index]}} </span> <span>/ </span>
                            </span>
                          </p>

                          <p class="skill_cc">Cost:
                            <span v-for="(i,index) in this.champsInfo[data.mainPlayerPOZ-1].spells[poz].cost" :key="i">
                              <span> {{this.champsInfo[data.mainPlayerPOZ-1].spells[poz].cost[index]}} </span> <span>/ </span>
                            </span>
                          </p>
                          
                          <p class="skill_cc">Range:
                            <span v-for="(i,index) in this.champsInfo[data.mainPlayerPOZ-1].spells[poz].range" :key="i">
                              <span> {{this.champsInfo[data.mainPlayerPOZ-1].spells[poz].range[index]}} </span> <span>/ </span>
                            </span>
                          </p>

                          <br>

                          <p v-html="this.champsInfo[data.mainPlayerPOZ-1].spells[poz].description"></p>
                      </div>
                  </template>
                </Popper>
              <p class="skill_abilitate">{{data.skills[poz]}}</p>
            </div>

          </div>

        </div>
      </div>

      <graphs :timeline="data.timeline"></graphs>
  </div>
  <div v-else>
    <svg class="loading_spin" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><circle cx="12" cy="2" r="0" fill="currentColor"><animate attributeName="r" values="0;2;0;0" dur="1s" repeatCount="indefinite" begin="0" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"/></circle><circle transform="rotate(45 12 12)" cx="12" cy="2" r="0" fill="currentColor"><animate attributeName="r" values="0;2;0;0" dur="1s" repeatCount="indefinite" begin="0.125s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"/></circle><circle transform="rotate(90 12 12)" cx="12" cy="2" r="0" fill="currentColor"><animate attributeName="r" values="0;2;0;0" dur="1s" repeatCount="indefinite" begin="0.25s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"/></circle><circle transform="rotate(135 12 12)" cx="12" cy="2" r="0" fill="currentColor"><animate attributeName="r" values="0;2;0;0" dur="1s" repeatCount="indefinite" begin="0.375s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"/></circle><circle transform="rotate(180 12 12)" cx="12" cy="2" r="0" fill="currentColor"><animate attributeName="r" values="0;2;0;0" dur="1s" repeatCount="indefinite" begin="0.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"/></circle><circle transform="rotate(225 12 12)" cx="12" cy="2" r="0" fill="currentColor"><animate attributeName="r" values="0;2;0;0" dur="1s" repeatCount="indefinite" begin="0.625s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"/></circle><circle transform="rotate(270 12 12)" cx="12" cy="2" r="0" fill="currentColor"><animate attributeName="r" values="0;2;0;0" dur="1s" repeatCount="indefinite" begin="0.75s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"/></circle><circle transform="rotate(315 12 12)" cx="12" cy="2" r="0" fill="currentColor"><animate attributeName="r" values="0;2;0;0" dur="1s" repeatCount="indefinite" begin="0.875s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"/></circle></svg>
  </div>
</template>

<script>
import Popper from "vue3-popper";
import { reactive } from "vue";
import axios from "axios";
import graphs from "./graphs.vue";
export default {
    name: "builds", 
    components: {
        Popper,
        graphs: graphs,
    }, 
    props: {
      gameID: String,
      continent: String,
      summonersPuuid: String,
      itemsJson: Object,
      champsInfo: Array,
    },
    setup() {
      const data = reactive({
        timeline:null,
        mainPlayerPOZ: null,

        timelineMainAbilitati: [],
        timelineQWER: [],
        timeAbilitati: [],

        timelineMainItems: [],
        timeItems:[],
        groupItems:[],  //grup de iteme dupa perioada cumpararii

        skills:['Q','W','E','R'],
      });

      async function getData() {
        axios(`http://localhost:3000/timeline/${this.continent}/${this.gameID}`).then(
          (res) => {
            data.timeline = res.data;
            console.log(res.data);

            //get participantId
            for(let i = 0; i < res.data.info.participants.length; i++) {
              if(this.summonersPuuid == res.data.info.participants[i].puuid){
                data.mainPlayerPOZ = res.data.info.participants[i].participantId;
              }
            }

            //console.log(this.champsInfo);

            for(let i = 0; i < res.data.info.frames.length; i++) {
              for(let j = 0; j < res.data.info.frames[i].events.length; j++) {
                if(res.data.info.frames[i].events[j].participantId == data.mainPlayerPOZ && res.data.info.frames[i].events[j].levelUpType=="NORMAL") {
                  data.timelineMainAbilitati.push(res.data.info.frames[i].events[j]);
                  data.timeAbilitati.push(`${Math.floor(res.data.info.frames[i].events[j].timestamp / 60000)}:${(((res.data.info.frames[i].events[j].timestamp % 60000) / 1000).toFixed(0) < 10 ? '0' + ((res.data.info.frames[i].events[j].timestamp % 60000) / 1000).toFixed(0) : '' + ((res.data.info.frames[i].events[j].timestamp % 60000) / 1000).toFixed(0))}`);
                  
                  if(res.data.info.frames[i].events[j].skillSlot == 1){
                    data.timelineQWER.push('Q');
                  } else if(res.data.info.frames[i].events[j].skillSlot == 2) {
                    data.timelineQWER.push('W');
                  }
                   else if(res.data.info.frames[i].events[j].skillSlot == 3) {
                    data.timelineQWER.push('E');
                  }
                   else if(res.data.info.frames[i].events[j].skillSlot == 4) {
                    data.timelineQWER.push('R');
                  }
                }

                if(res.data.info.frames[i].events[j].participantId == data.mainPlayerPOZ && (res.data.info.frames[i].events[j].type == "ITEM_PURCHASED" || res.data.info.frames[i].events[j].type == "ITEM_SOLD")) {
                  data.timelineMainItems.push(res.data.info.frames[i].events[j]);
                  data.timeItems.push(`${Math.floor(res.data.info.frames[i].events[j].timestamp / 60000)}:${(((res.data.info.frames[i].events[j].timestamp % 60000) / 1000).toFixed(0) < 10 ? '0' + ((res.data.info.frames[i].events[j].timestamp % 60000) / 1000).toFixed(0) : '' + ((res.data.info.frames[i].events[j].timestamp % 60000) / 1000).toFixed(0))}`);
                }
              }
            }

            //console.log(data.timelineMainAbilitati);
             console.log(data.timelineMainItems);
             console.log(data.timeItems);

            let groupItemsAUX=[];         

            for(let i = 0; i <= parseInt(data.timelineMainItems[data.timelineMainItems.length-1].timestamp / 60000); i++) {
              let ok = 0;
              for(let j = 0; j < data.timelineMainItems.length; j++) {
                if(parseInt(data.timelineMainItems[j].timestamp / 60000) == i) {
                  groupItemsAUX.push([data.timelineMainItems[j].itemId, data.timelineMainItems[j].type, parseInt(data.timelineMainItems[j].timestamp / 60000)])

                  ok++;
                }
              }

              if(ok>0){
                console.log('pauza');
                data.groupItems.push(groupItemsAUX);

                groupItemsAUX=[];
              }
            }



            //console.log(parseInt(data.timelineMainItems[data.timelineMainItems.length-1].timestamp / 60000));
           
            console.log(data.groupItems);
          }
        );
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
.spell_name{
  color: var(--color-yellow);
}
.table_abilitate{
  background-color: rgba(0,0,0, 0.2);
}
.sold_img{
  filter: grayscale(1);
}

.skill {
  padding: 2rem 2rem 0 2rem;
  display: flex;
  align-items: center;
  &_box{
    display: flex;
    align-items: center;
    &>*{
      margin-right: 1rem;
    }
  }

  &>*{
    margin-right: 1rem;
  }
  &_cc>:last-child>:last-child{
    display: none;
  }
  &_cc{
    color: lightgray;
  }
  &_img{
    width: 3.5rem;
    height: 3.5rem;
    object-fit: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
  }
  &_p{
    background-color: rgba(0,0,0, 0.5);
  }
  &_tooltip{
    text-align: left;
  }
  &_abilitate{
    margin-top: -18px;
  }
}

.timeline{
  margin-top: 2rem;
  width: 100%;

  &_title{
    margin-bottom: 1rem;
    margin-top: 2rem;
    text-align: left;
    padding: 0 2rem 0 2rem;
  }

  &_skills {
    border-spacing: 1px;
    //border-collapse: collapse;
    padding: 0 2rem 0 2rem;
    width: 100%;

    @media screen and (max-width: 550px) {
      padding: 0;
      border-spacing: 0px;
      border-collapse: collapse;
    }

    &_container {
      overflow: hidden !important;
      padding: .5rem 0 .5rem 0;
    }


    td {
      text-align: center;
      //padding: 8px;
      border: 1px solid #ddd;
      width: 3.5rem;
      height: 3rem;
      font-size: 1.4rem;

    }
    tr{
      transition: all .2s;

      &:hover {
        background-color: rgba(0,0,0, 0.3);
      }
    }
  }

  &_items {

    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: flex-start;
    text-align: left;
    padding: 0 2rem 0 2rem;

    @media screen and (max-width: 650px){
      grid-template-columns: 1fr;
      max-height: 35rem;
      overflow-y: auto;
    }

    &>*{
      width: 95%;
      border-bottom: 1px solid rgba(0,0,0, 0.1);

      @media screen and (max-width: 650px){
        grid-template-columns: 1fr;
        width: 100%;
      }
    }

    &_group{
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      &_time {
        grid-row: 2/3;
        grid-column: 1/2;
        align-self: center;
        margin-right: 2rem;
      }
      &_svg{
        grid-column: 2/3;
        margin-left: 1rem;
        margin-right: 1rem;
      }
      img{
        margin-right: .5rem;
      }
    }

    &_sub {
      display: flex;
      align-items: center;
    }

    
    
    &_box {
      display: flex;
      align-items: center;
      margin-right: 1rem;

      svg {
        margin-top: -8px;
        margin-left: .3rem;
      }

      &_img{
        width: 3rem;
        height: 3rem;
        border-radius: 4px;
        margin-top: 1rem;
      }

      &_time{
        font-size: 1.2rem;
        margin-top:-8px;
      }
    }
    &>:last-child svg{
      display: none;
    }
  }
}
.spell_name {
    color: var(--color-yellow);
}

</style>