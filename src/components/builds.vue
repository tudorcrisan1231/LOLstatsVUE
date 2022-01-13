<template>
  <div v-if="data.mainPlayerPOZ && data.timeline && data.timelineMainAbilitati && data.timelineMainItems" class="timeline">
      <h4 class="timeline_title">Items build order:</h4>
      <div class="timeline_items">
        <div v-for="(i,index) in data.timelineMainItems" :key="i" class="timeline_items_box">

          <div v-if="data.timelineMainItems[index].itemId>=7000 && data.timelineMainItems[index].itemId<=7025">
            <Popper placement="top" arrow hover>
                <div>
                  <img
                      src="https://raw.communitydragon.org/latest/game/assets/items/itemmodifiers/bordertreatmentornn.png"
                      alt="placeholder ornn item"
                      class="timeline_items_box_img"
                  />
                  <p class="timeline_items_box_time">{{data.timeItems[index]}}</p>
                </div>
                <template #content>
                    <div style="max-width: 400px">
                        <p>Ornn item upgrade</p>
                    </div>
                </template>
            </Popper>
          </div>

          <div v-else>
            <Popper placement="top" arrow hover>
                <div style="text-align:center;">
                  <img
                      :src="
                      'http://ddragon.leagueoflegends.com/cdn/' +
                      this.lol_version +
                      '/img/item/' +
                      data.timelineMainItems[index].itemId +
                      '.png'
                      "
                      alt="item"
                      class="timeline_items_box_img"
                      :class="data.timelineMainItems[index].type=='ITEM_SOLD' ? 'sold_img' : ''"
                  />
                  <p class="timeline_items_box_time">{{data.timeItems[index]}}</p>
                </div>
                <template #content>
                    <div style="max-width: 400px">
                      <div style="text-align: left">
                        <p class="spell_name">
                            {{
                            this.itemsJson.data[
                                data.timelineMainItems[index].itemId //se ia din json ul cu iteme, itemul cu id ul respectiv
                            ].name
                            }}
                            <span v-if="data.timelineMainItems[index].type=='ITEM_SOLD'" style="color:red;">SOLD</span>
                        </p>
                        <p
                            style="max-width: 400px"
                            v-html="
                            this.itemsJson.data[
                                data.timelineMainItems[index].itemId
                            ].description"
                        ></p>
                        <p class="spell_name">
                            Cost:
                            {{
                            this.itemsJson.data[
                                data.timelineMainItems[index].itemId
                            ].gold.total
                            }}
                        </p>
                      </div>
                    </div>
                </template>
            </Popper>
            
          </div>

          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path d="M715.8 493.5L335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37z" fill="currentColor"/></svg>

        </div>
      </div>

      <h4 class="timeline_title">Skills build order:</h4>
      <div class="timeline_skills_container" style="overflow-x:auto;">
        <table class="timeline_skills">
          <tr>
            <td style="background-color:gray">Q</td>
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
            <td style="background-color:gray">W</td>
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
            <td style="background-color:gray">E</td>
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
            <td style="background-color:gray">R</td>
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
      </div>
  </div>
</template>

<script>
import Popper from "vue3-popper";
import { reactive } from "vue";
import axios from "axios";
export default {
    name: "builds", 
    components: {
        Popper,
    }, 
    props: {
      gameID: String,
      continent: String,
      summonersPuuid: String,
      itemsJson: Object,
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

            console.log(data.timelineMainAbilitati);
            // console.log(data.timelineMainItems);
            // console.log(data.timeItems);
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
.table_abilitate{
  background-color: rgba(0,0,0, 0.2);
}
.sold_img{
  filter: grayscale(1);
}

.timeline{
  margin-top: 2rem;
  padding: 0 2rem 0 2rem;
  width: 100%;

  &_title{
    margin-bottom: 1rem;
    margin-top: 2rem;
    text-align: left;
  }

  &_skills {
    border-collapse: collapse;
    border-spacing: 0;

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
  }

  &_items {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    //justify-content: center;
    
    
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