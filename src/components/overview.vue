<template>
  <div class="team">
      <p>{{teamBlue.kills}} {{teamRed.kills}}</p>
      <div class="team_blue">
        <div v-for="(i,index) in this.matchData.info.participants" :key="i">
            <div class="team_player" v-if="index < 5">

                <Popper placement="top" arrow hover>
                    <div class="team_player_level">
                        <img :src="'http://ddragon.leagueoflegends.com/cdn/'+this.lol_version+'/img/champion/'+this.matchData.info.participants[index].championName+'.png'" alt="champion_icon">
                        <p>{{this.matchData.info.participants[index].champLevel}}</p>
                    </div>
                    <template #content>
                        <div style="max-width: 400px">
                            <p>{{this.matchData.info.participants[index].championName}}</p>
                        </div>
                    </template>
                </Popper>

                <p>{{this.matchData.info.participants[index].summonerName}}</p>

                <div class="team_player_score">
                    <p>{{((this.matchData.info.participants[index].kills + this.matchData.info.participants[index].assists)/this.matchData.info.participants[index].deaths).toFixed(1)}} KDA</p>
                    <div class="team_player_score_kp">
                        <p>{{this.matchData.info.participants[index].kills}}/{{this.matchData.info.participants[index].deaths}}/{{this.matchData.info.participants[index].assists}}</p>
                        <p>({{(((this.matchData.info.participants[index].kills + this.matchData.info.participants[index].assists)/teamBlue.kills)*100).toFixed(0)}}% KP)</p>
                    </div>
                </div>

                <div class="team_player_cs">
                    <p>{{this.matchData.info.participants[index].totalMinionsKilled + this.matchData.info.participants[index].neutralMinionsKilled}} CS</p>
                    <p>{{((this.matchData.info.participants[index].totalMinionsKilled + this.matchData.info.participants[index].neutralMinionsKilled) / (this.matchData.info.gameDuration / 60)).toFixed(1)}}/min</p>
                </div>

                <div class="team_player_dmg">
                    <p>{{((this.matchData.info.participants[index].totalDamageDealtToChampions)/1000).toFixed(3)}} DMG</p>
                </div>
            </div>
        </div>
      </div>

      <div class="team_red">
        <div v-for="(i,index) in this.matchData.info.participants" :key="i">
            <div class="team_player" v-if="index >= 5">
                <Popper placement="top" arrow hover>
                    <div class="team_player_level">
                        <img :src="'http://ddragon.leagueoflegends.com/cdn/'+this.lol_version+'/img/champion/'+this.matchData.info.participants[index].championName+'.png'" alt="champion_icon">
                        <p>{{this.matchData.info.participants[index].champLevel}}</p>
                    </div>
                    <template #content>
                        <div style="max-width: 400px">
                            <p>{{this.matchData.info.participants[index].championName}}</p>
                        </div>
                    </template>
                </Popper>
                <p>{{this.matchData.info.participants[index].summonerName}}</p>

                <div class="team_player_score">
                    <p>{{((this.matchData.info.participants[index].kills + this.matchData.info.participants[index].assists)/this.matchData.info.participants[index].deaths).toFixed(1)}} KDA</p>
                    <div class="team_player_score_kp">
                        <p>{{this.matchData.info.participants[index].kills}}/{{this.matchData.info.participants[index].deaths}}/{{this.matchData.info.participants[index].assists}}</p>
                        <p>({{(((this.matchData.info.participants[index].kills + this.matchData.info.participants[index].assists)/teamRed.kills)*100).toFixed(0)}}% KP)</p>
                    </div>
                </div>

                <div class="team_player_cs">
                    <p>{{this.matchData.info.participants[index].totalMinionsKilled + this.matchData.info.participants[index].neutralMinionsKilled}} CS</p>
                    <p>{{((this.matchData.info.participants[index].totalMinionsKilled + this.matchData.info.participants[index].neutralMinionsKilled) / (this.matchData.info.gameDuration / 60)).toFixed(1)}}/min</p>
                </div>

                <div class="team_player_dmg">
                    <p>{{((this.matchData.info.participants[index].totalDamageDealtToChampions)/1000).toFixed(3)}} DMG</p>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import Popper from "vue3-popper";
import { reactive } from "vue";
export default {
    name: "overview",  
    components: {
        Popper,
    },
    props: {
        matchData: Object,
    },
    setup() {
        const teamBlue = reactive({
            kills:0,
        });
        const teamRed = reactive({
            kills:0,
        });

        function getStatsPerTeam() {
            for(let i = 0; i < this.matchData.info.participants.length; i++) {
                if(i<5) {
                    teamBlue.kills += this.matchData.info.participants[i].kills;
                } else {
                    teamRed.kills += this.matchData.info.participants[i].kills;
                }
            }
        }

        return {
            teamRed,
            teamBlue,
            getStatsPerTeam,
        }
    },
    mounted() {
        this.getStatsPerTeam();
    }
}
</script>

<style lang="scss" scoped>
.team {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;

    img {
        width: 3rem;
        height: 3rem;
        display: flex;
    }

    &_blue,&_red {
        display: flex;
        flex-direction: column;
    }

    &_player {
        display: grid;
        grid-template-columns: min-content 1fr 1fr 1fr 1fr;
        align-items: center;
        justify-items: flex-start;
        text-align: left;
        gap: .5rem;
        margin-bottom: 1rem;


        &>div {
            display: flex !important;
        }

        &_level {
            position: relative;

            p {
                position: absolute;
                bottom: -.7rem;
                right: -.5rem;
                background-color: gray;
                border-radius: 50%;
                width: 1.5rem;
                height: 1.7rem;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 5;
            }
        }

        &_score {
            display: flex;
            flex-direction: column;
            align-items: center;

            &_kp {
                display: flex;
                align-items: center;

                &>*:not(:last-child) {
                    margin-right: .7rem;
                }
            }


        }
        &_cs {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
}


</style>