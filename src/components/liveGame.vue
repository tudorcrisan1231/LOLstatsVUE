<template>
<div class="live">
    <div v-if="data.live">

        <div class="live_tab">
            <p>{{data.queue}}</p>
            <p>{{data.map}}</p>
            <p>{{data.time}}</p>
        </div>

        <div class="live_list">

            <div class="live_list_blue">
                <div v-for="(i,index) in data.live.participants" :key="i" >
                    <div v-if="index < 5" class="live_list_match">

                        <div class="live_list_player">
                            <img
                                :src="
                                'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/' +
                                data.live.participants[index].championId +
                                '.png'
                                "
                                alt="champ img"
                            />


                            
                            <div class="live_list_spells">
                                <Popper placement="top" arrow hover>
                                    <img
                                    :src="
                                        'http://ddragon.leagueoflegends.com/cdn/' +
                                        this.lol_version +
                                        '/img/spell/' +
                                        data.spellD[index][0] +
                                        '.png'
                                    "
                                    alt="spell img"
                                    />

                                    <template #content>
                                        <div style="max-width: 400px">
                                            <p class="spell_name">{{ data.spellD[index][2] }}</p>
                                            {{ data.spellD[index][1] }}
                                        </div>  
                                    </template>
                                </Popper>

                                <Popper placement="top" arrow hover>
                                    <img
                                    :src="
                                        'http://ddragon.leagueoflegends.com/cdn/' +
                                        this.lol_version +
                                        '/img/spell/' +
                                        data.spellF[index][0] +
                                        '.png'
                                    "
                                    alt="spell img"
                                    />

                                    <template #content>
                                        <div style="max-width: 400px">
                                            <p class="spell_name">{{ data.spellF[index][2] }}</p>
                                            {{ data.spellF[index][1] }}
                                        </div> 
                                    <div>salut</div>
                                    </template>
                                </Popper>
                            </div>

                            <a :href="'/' +this.regionLive + '/' + data.live.participants[index].summonerName" target="_blank" class="live_list_player_name">
                                <p>{{data.live.participants[index].summonerName}}</p>
                            </a>

                            <div v-if="data.ranksFlex && data.ranksSolo">
                                <div class="live_list_rank" v-if="'5v5 Ranked Solo'">
                                    <!-- {{data.ranks[index][0].tier}} -->
                                    <div v-if="data.ranksSolo[index]=='Unranked'">
                                        <img src="../assets/unranked.png" alt="unranked" />
                                        <p>Unranked</p>
                                    </div>
                                    <div v-else>
                                        <img
                                            :src="require('../assets/' + data.ranksSolo[index].tier + '.png')"
                                            alt=""
                                        />
                                        {{data.ranksSolo[index].tier}}
                                        {{data.ranksSolo[index].rank}}
                                        {{data.ranksSolo[index].leaguePoints}}LP
                                        ({{data.ranksSolo[index].wins}}W / {{data.ranksSolo[index].losses}}L  {{(data.ranksSolo[index].wins/(data.ranksSolo[index].wins+data.ranksSolo[index].losses)*100).toFixed(1)}}%)
                                    </div>

                                </div>

                                <div class="live_list_rank" v-else-if="data.queue=='5v5 Ranked Flex'">
                                    <div v-if="data.ranksFlex[index]=='Unranked'">
                                        <img src="../assets/unranked.png" alt="unranked" />
                                        <p>Unranked</p>
                                    </div>
                                    <div v-else>
                                        {{data.ranksFlex[index].tier}}
                                        {{data.ranksFlex[index].rank}}
                                        {{data.ranksFlex[index].leaguePoints}}LP
                                        ({{data.ranksFlex[index].wins}}W / {{data.ranksFlex[index].losses}}L  {{(data.ranksFlex[index].wins/(data.ranksFlex[index].wins+data.ranksFlex[index].losses)*100).toFixed(1)}}%)
                                    </div>
                                </div>

                                <div class="live_list_rank" v-else>
                                    <div v-if="data.ranksSolo[index]=='Unranked'">
                                        <img src="../assets/unranked.png" alt="unranked" />
                                        <p>Unranked</p>
                                    </div>
                                    <div v-else>
                                        {{data.ranksSolo[index].tier}}
                                        {{data.ranksSolo[index].rank}}
                                        {{data.ranksSolo[index].leaguePoints}}LP
                                        ({{data.ranksSolo[index].wins}}W / {{data.ranksSolo[index].losses}}L  {{(data.ranksSolo[index].wins/(data.ranksSolo[index].wins+data.ranksSolo[index].losses)*100).toFixed(1)}}%)
                                    </div>
                                </div> 
                            </div>

                            <div class="live_list_bans">
                                <div v-if="data.live.bannedChampions[index].championId=='-1'">
                                    <img src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/gp_ui_placeholder.png" alt="no ban"/>
                                </div>
                                <div v-else>
                                    <img
                                        :src="
                                        'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/' +
                                        data.live.bannedChampions[index].championId +
                                        '.png'
                                        "
                                        alt="champ img"
                                        style="filter:grayscale(1)"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="live_list_red">
                <div v-for="(i,index) in data.live.participants" :key="i">
                    <div v-if="index >= 5" class="live_list_match">

                        <div class="live_list_player">
                            <img
                                :src="
                                'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/' +
                                data.live.participants[index].championId +
                                '.png'
                                "
                                alt="champ img"
                            />


                            
                            <div class="live_list_spells">
                                <Popper placement="top" arrow hover>
                                    <img
                                    :src="
                                        'http://ddragon.leagueoflegends.com/cdn/' +
                                        this.lol_version +
                                        '/img/spell/' +
                                        data.spellD[index][0] +
                                        '.png'
                                    "
                                    alt="spell img"
                                    />

                                    <template #content>
                                        <div style="max-width: 400px">
                                            <p class="spell_name">{{ data.spellD[index][2] }}</p>
                                            {{ data.spellD[index][1] }}
                                        </div> 
                                    </template>
                                </Popper>

                                <Popper placement="top" arrow hover>
                                    <img
                                    :src="
                                        'http://ddragon.leagueoflegends.com/cdn/' +
                                        this.lol_version +
                                        '/img/spell/' +
                                        data.spellF[index][0] +
                                        '.png'
                                    "
                                    alt="spell img"
                                    />

                                    <template #content>
                                        <div style="max-width: 400px">
                                            <p class="spell_name">{{ data.spellF[index][2] }}</p>
                                            {{ data.spellF[index][1] }}
                                        </div> 
                                    </template>
                                </Popper>
                            </div>

                            <a :href="'/' +this.regionLive + '/' + data.live.participants[index].summonerName" target="_blank" class="live_list_player_name">
                                <p>{{data.live.participants[index].summonerName}}</p>
                            </a>


                            <div v-if="data.ranksFlex && data.ranksSolo">
                                <div class="live_list_rank" v-if="'5v5 Ranked Solo'">
                                    <!-- {{data.ranks[index][0].tier}} -->
                                    <div v-if="data.ranksSolo[index]=='Unranked'">
                                        <img src="../assets/unranked.png" alt="unranked" />
                                        <p>Unranked</p>
                                    </div>
                                    <div v-else>
                                        <img
                                            :src="require('../assets/' + data.ranksSolo[index].tier + '.png')"
                                            alt=""
                                        />
                                        {{data.ranksSolo[index].tier}}
                                        {{data.ranksSolo[index].rank}}
                                        {{data.ranksSolo[index].leaguePoints}}LP
                                        ({{data.ranksSolo[index].wins}}W / {{data.ranksSolo[index].losses}}L  {{(data.ranksSolo[index].wins/(data.ranksSolo[index].wins+data.ranksSolo[index].losses)*100).toFixed(1)}}%)
                                    </div>

                                </div>

                                <div class="live_list_rank" v-else-if="data.queue=='5v5 Ranked Flex'">
                                    <div v-if="data.ranksFlex[index]=='Unranked'">
                                        <img src="../assets/unranked.png" alt="unranked" />
                                        <p>Unranked</p>
                                    </div>
                                    <div v-else>
                                        {{data.ranksFlex[index].tier}}
                                        {{data.ranksFlex[index].rank}}
                                        {{data.ranksFlex[index].leaguePoints}}LP
                                        ({{data.ranksFlex[index].wins}}W / {{data.ranksFlex[index].losses}}L  {{(data.ranksFlex[index].wins/(data.ranksFlex[index].wins+data.ranksFlex[index].losses)*100).toFixed(1)}}%)
                                    </div>
                                </div>

                                <div class="live_list_rank" v-else>
                                    <div v-if="data.ranksSolo[index]=='Unranked'">
                                        <img src="../assets/unranked.png" alt="unranked" />
                                        <p>Unranked</p>
                                    </div>
                                    <div v-else>
                                        {{data.ranksSolo[index].tier}}
                                        {{data.ranksSolo[index].rank}}
                                        {{data.ranksSolo[index].leaguePoints}}LP
                                        ({{data.ranksSolo[index].wins}}W / {{data.ranksSolo[index].losses}}L  {{(data.ranksSolo[index].wins/(data.ranksSolo[index].wins+data.ranksSolo[index].losses)*100).toFixed(1)}}%)
                                    </div>
                                </div> 
                            </div>


                            <div class="live_list_bans">
                                <div v-if="data.live.bannedChampions[index].championId=='-1'">
                                    <img src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/gp_ui_placeholder.png" alt="no ban"/>
                                </div>
                                <div v-else>
                                    <img
                                        :src="
                                        'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/' +
                                        data.live.bannedChampions[index].championId +
                                        '.png'
                                        "
                                        alt="champ img"
                                        style="filter:grayscale(1)"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>

    </div>
    <div v-else>
        <p class="live_notfound">'<span>{{this.accountIdLive.name}}</span>' is not in an active game.</p>
    </div>
</div>
  <!-- <div>{{data.live}}</div> -->
</template>

<script>
import { reactive } from "vue";
import axios from "axios";
import Popper from "vue3-popper";
export default {
    name:'liveGame',
    components: {
        Popper,
    },
    props: {
        regionLive: String,
        accountIdLive: Object,
        spellsJsonLive: Object,
        queueJsonLive: Object,
    },
    setup() {
        const data = reactive({
            live:null,
            spellD: [],
            spellF: [],
            map: null,
            queue:null,
            time:null,
            ranks:[],
            ranksSolo:[],
            ranksFlex:[],
        });

        async function getLiveData() {
            await axios(
                `http://localhost:3000/spectator-v4/${this.regionLive}/${this.accountIdLive.id}`
            ) // match history
            .then((res) => {
                data.live = res.data;
                console.log(res.data);

                //datele despre spell urile fiecarui campion din live game, se stocheaza pt fiecare intr un vector, iar pe fiecare poz din vecotor se pun:  pe poz 0 id ul, 1 descrierea, 2 numele 
                const spells = Object.entries(this.spellsJsonLive.data); //pt spellD
                for(let j = 0; j < res.data.participants.length; j++) {
                    for (let i = 0; i < spells.length; i++) {
                        if (spells[i][1].key == res.data.participants[j].spell1Id) {
                            data.spellD.push([spells[i][1].id,spells[i][1].description,spells[i][1].name]);
                        }
                    }
                }

                for(let j = 0; j < res.data.participants.length; j++) { //pt spellF
                    for (let i = 0; i < spells.length; i++) {
                        if (spells[i][1].key == res.data.participants[j].spell2Id) {
                            data.spellF.push([spells[i][1].id,spells[i][1].description,spells[i][1].name]);
                        }
                    }
                }

                //console.log(data.spellD, data.spellF);


                //datele despre meci (mapa si queue type)
                
                for (let i = 0; i < this.queueJsonLive.length; i++) {
                    //gasirea queului
                    if (this.queueJsonLive[i].queueId == res.data.gameQueueConfigId) {
                        data.map = this.queueJsonLive[i].map;

                        let queue = this.queueJsonLive[i].description.split(" ");  // imi taie ultimul cuvant din denumire (pt ca in json e dat ex: '5v5 Draft Pick games') si imi taie 'games'
                        queue.pop();
                        data.queue = queue.join(" ");
                    }
                }


                //time
                let ms = new Date() - res.data.gameStartTime;
                let min = Math.floor((ms/1000/60) << 0);
                let sec = Math.floor((ms/1000) % 60);

                setInterval(function() {
                    if(sec<59) {
                        if(min<10 && sec<10) {
                            data.time = `0${min}:0${sec++}`
                        } else if(min<10) {
                            data.time = `0${min}:${sec++}`
                        } else if(sec<10) {
                            data.time = `${min}:0${sec++}`
                        } else {
                            data.time = `${min}:${sec++}`
                        }
                    } else {
                        if(min<10) {
                            data.time = `0${min++}:${sec}`
                            sec = 0;
                        } else {
                            data.time = `${min++}:${sec}`
                            sec=0;
                        }
                    }
                }, 1000);


                //ranks details
                async function getRanks(region) {
                    for(let i = 0; i < res.data.participants.length; i++) {
                        await axios(
                            `http://localhost:3000/league-v4/${region}/${res.data.participants[i].summonerId}`
                        ) // ranks details  si le bag in data.ranks
                            .then((resRank) => {
                            //console.log(resRank.data);
                            if(resRank.data) {
                                data.ranks.push(resRank.data);
                            } else {
                                data.ranks.push('Unranked');
                            }
                        });
                    }

                    for(let i = 0; i<data.ranks.length; i++) { //iau rank ul de la soloduo fiecaruia 
                        for(let j = 0; j<data.ranks[i].length; j++) {
                            if(data.ranks[i][j].queueType == 'RANKED_SOLO_5x5') {
                                data.ranksSolo.push(data.ranks[i][j]);
                                break;
                            }
                        }
                        if(data.ranksSolo[i]==null) {
                            data.ranksSolo.push('Unranked');
                        }
                    }
 
                    for(let i = 0; i<data.ranks.length; i++) { //iau rank ul de la flex fiecaruia 
                        for(let j = 0; j<data.ranks[i].length; j++) {
                            if(data.ranks[i][j].queueType == 'RANKED_FLEX_SR') {
                                data.ranksFlex.push(data.ranks[i][j]);
                                break;
                            }
                        }
                        if(data.ranksFlex[i]==null) {
                            data.ranksFlex.push('Unranked');
                        }
                    }
                     console.log(data.ranksSolo, data.ranksFlex);
                    // console.log(data.ranks);
                }
                getRanks(this.regionLive);

            });


        }

        
        return{
            data,
            getLiveData,
        }
    },
    mounted() {
        this.getLiveData();
    }
}
</script>

<style lang="scss" scoped>
    .live {

        &_tab {
            display: flex;
            padding: .5rem;
            border-bottom: 1px solid rgba(#72757e, 0.2);
            &>* {
                margin-right: 1rem;
            }
        }


        &_list {
            display: flex;
            flex-direction: column;
            padding: .5rem;

            &>*:not(:last-child) {
                margin-bottom: 1rem;
            }

            &_match {
                display: flex;
            }

            &_player {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;

                img {
                    width: 4rem;
                    height: 4rem;
                    margin-right: .5rem;
                    margin-left: .2rem;
                }

                &_name {
                    text-decoration: none;
                    color: #ffffff;
                }
            }

            &_spells {
                display: grid;
                grid-template-columns: 1fr 1fr;
                align-items: center;
                img {
                    width: 1.5rem;
                    height: 1.5rem;
                }
            }

            &_blue {
                border-left: 3px solid var(--color-win);
            }

            &_red {
                border-left: 3px solid var(--color-lose);
            }
        }

        &_notfound {
            padding: .5rem;

            span {
                color: var(--color-win);
            }
        }
    }

</style>