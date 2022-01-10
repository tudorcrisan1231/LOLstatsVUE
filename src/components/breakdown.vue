<template>
  <div class="breakdown">
    
      <div v-if="stats.mvp" class="breakdown_box">
        <div class="breakdown_box_bgImg">
          <img class="breakdown_box_bgImg_img" :src="'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/uncentered/' + stats.mvp[1] + '/' + stats.mvp[1] + '000.jpg'" alt="lol_img">

          <div class="breakdown_box_overlay">
      
          </div>

          <div class="breakdown_box_text">
            <h2 style="color: var(--color-yellow); margin-bottom: 0;">MVP</h2>
            <h2>{{stats.mvp[0]}} score</h2>
            <div class="breakdown_box_text_name">
              <img :src="'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/'+ stats.mvp[1] + '.png'" alt="lol_img">
              <p>{{stats.mvp[2]}}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="stats.highestDMG" class="breakdown_box">
        <div class="breakdown_box_bgImg">
          <img class="breakdown_box_bgImg_img" :src="'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/uncentered/' + stats.highestDMG[1] + '/' + stats.highestDMG[1] + '000.jpg'" alt="lol_img">

          <div class="breakdown_box_overlay">
      
          </div>

          <div class="breakdown_box_text">
            <p>Highest DMG</p>
            <h2>{{stats.highestDMG[0]/1000}}</h2>
            <div class="breakdown_box_text_name">
              <img :src="'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/'+ stats.highestDMG[1] + '.png'" alt="lol_img">
              <p>{{stats.highestDMG[2]}}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="stats.highestCS" class="breakdown_box">
        <div class="breakdown_box_bgImg">
          <img class="breakdown_box_bgImg_img" :src="'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/uncentered/' + stats.highestCS[1] + '/' + stats.highestCS[1] + '000.jpg'" alt="lol_img">

          <div class="breakdown_box_overlay">
      
          </div>

          <div class="breakdown_box_text">
            <p>Highest CS</p>
            <h2>{{stats.highestCS[0]}}</h2>
            <div class="breakdown_box_text_name">
              <img :src="'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/'+ stats.highestCS[1] + '.png'" alt="lol_img">
              <p>{{stats.highestCS[2]}}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="stats.bestGold" class="breakdown_box">
        <div class="breakdown_box_bgImg">
          <img class="breakdown_box_bgImg_img" :src="'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/uncentered/' + stats.bestGold[1] + '/' + stats.bestGold[1] + '000.jpg'" alt="lol_img">

          <div class="breakdown_box_overlay">
      
          </div>

          <div class="breakdown_box_text">
            <p>Best Gold</p>
            <h2>{{stats.bestGold[0]/1000}}</h2>
            <div class="breakdown_box_text_name">
              <img :src="'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/'+ stats.bestGold[1] + '.png'" alt="lol_img">
              <p>{{stats.bestGold[2]}}</p>
            </div>
          </div>
        </div>
      </div>


      <div v-if="stats.bestVS" class="breakdown_box">
        <div class="breakdown_box_bgImg">
          <img class="breakdown_box_bgImg_img" :src="'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/uncentered/' + stats.bestVS[1] + '/' + stats.bestVS[1] + '000.jpg'" alt="lol_img">

          <div class="breakdown_box_overlay">
      
          </div>

          <div class="breakdown_box_text">
            <p>Best Vision Score</p>
            <h2>{{stats.bestVS[0]}}</h2>
            <div class="breakdown_box_text_name">
              <img :src="'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/'+ stats.bestVS[1] + '.png'" alt="lol_img">
              <p>{{stats.bestVS[2]}}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="stats.highestKDA" class="breakdown_box">
        <div class="breakdown_box_bgImg">
          <img class="breakdown_box_bgImg_img" :src="'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/uncentered/' + stats.highestKDA[1] + '/' + stats.highestKDA[1] + '000.jpg'" alt="lol_img">

          <div class="breakdown_box_overlay">
      
          </div>

          <div class="breakdown_box_text">
            <p>Highest KDA</p>
            <h2>{{stats.highestKDA[0]}}</h2>
            <div class="breakdown_box_text_name">
              <img :src="'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/'+ stats.highestKDA[1] + '.png'" alt="lol_img">
              <p>{{stats.highestKDA[2]}}</p>
            </div>
          </div>
        </div>
      </div>

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
      //   && stats.first_blood 
      function getStats() {
        let dmg = -1, cs = -1, gold = -1, vs = -1, kda = -1, mvp = -1;
        for(let i = 0; i < this.matchData.info.participants.length; i++) {
          if(this.matchData.info.participants[i].totalDamageDealtToChampions > dmg) {
            dmg = this.matchData.info.participants[i].totalDamageDealtToChampions;
            stats.highestDMG = [this.matchData.info.participants[i].totalDamageDealtToChampions, this.matchData.info.participants[i].championId, this.matchData.info.participants[i].summonerName];
          }

          if(this.matchData.info.participants[i].totalMinionsKilled + this.matchData.info.participants[i].neutralMinionsKilled > cs) {
            cs = this.matchData.info.participants[i].totalMinionsKilled + this.matchData.info.participants[i].neutralMinionsKilled;
            stats.highestCS = [(this.matchData.info.participants[i].totalMinionsKilled + this.matchData.info.participants[i].neutralMinionsKilled), this.matchData.info.participants[i].championId, this.matchData.info.participants[i].summonerName];
          }

          if(this.matchData.info.participants[i].goldEarned > gold) {
            gold = this.matchData.info.participants[i].goldEarned;
            stats.bestGold = [gold, this.matchData.info.participants[i].championId, this.matchData.info.participants[i].summonerName];
          }

          if(this.matchData.info.participants[i].visionScore > vs) {
            vs = this.matchData.info.participants[i].visionScore;
            stats.bestVS = [vs, this.matchData.info.participants[i].championId, this.matchData.info.participants[i].summonerName];
          }

          if((this.matchData.info.participants[i].kills + this.matchData.info.participants[i].assists)/this.matchData.info.participants[i].deaths > kda) {
            kda = (this.matchData.info.participants[i].kills + this.matchData.info.participants[i].assists)/this.matchData.info.participants[i].deaths;
            stats.highestKDA = [((this.matchData.info.participants[i].kills + this.matchData.info.participants[i].assists)/this.matchData.info.participants[i].deaths).toFixed(1), this.matchData.info.participants[i].championId, this.matchData.info.participants[i].summonerName];
          }


          //mvp formula: 1p per kill, 0.75 per assist, 0.5 per death
          if(this.matchData.info.participants[i].kills * 1 + this.matchData.info.participants[i].assists * 0.75 + this.matchData.info.participants[i].deaths* 0.5 > mvp) {
            mvp = this.matchData.info.participants[i].kills * 1 + this.matchData.info.participants[i].assists * 0.75 + this.matchData.info.participants[i].deaths;
            stats.mvp = [(this.matchData.info.participants[i].kills * 1 + this.matchData.info.participants[i].assists * 0.75 + this.matchData.info.participants[i].deaths* 0.5).toFixed(1), this.matchData.info.participants[i].championId, this.matchData.info.participants[i].summonerName];
          }

        }
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

<style lang="scss" scoped>
.breakdown{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
  padding: 1rem;

  @media screen and (max-width:1400px) {
    gap: 1rem;
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 450px) {
    grid-template-columns: 1fr;
  }

  &_box {
    &_bgImg {
      position: relative;

      &_img {
        width: 100%;
        height: 17rem;
        border-radius: 5px;
        object-fit: cover;
      }
    }

    &_overlay {
      position: absolute;
      top: 0;
      left: 0;
      background-image: linear-gradient(
        to left,
        rgba(0,0,0,0.2),
        rgba(0,0,0,0.7)
      );
      // opacity: 0.4;
      width: 100%;
      height: 96.5%;
      border-radius: 5px;
      border: 1px solid rgba(0,0,0,0.5);
    }

    &_text {
      position: absolute;
      top: 50%;
      left: 0%;
      transform: translate(10%, -60%);
      text-align: left;

      &>* {
        margin-bottom: .5rem;
      }

      &_name {
        display: flex;
        align-items: center;

        img {
          border-radius: 50%;
          width: 3rem;
          height: 3rem;
          margin-right: .5rem;
        }
      }
    }
  }
}



</style>