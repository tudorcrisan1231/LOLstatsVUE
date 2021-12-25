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

                            <div class="live_list_champ">
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
                                                <p class="spell_name" style="color:var(--color-yellow)">{{ data.spellD[index][2] }}</p>
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
                                                <p class="spell_name" style="color:var(--color-yellow)">{{ data.spellF[index][2] }}</p>
                                                {{ data.spellF[index][1] }}
                                            </div> 
                                        <div>salut</div>
                                        </template>
                                    </Popper>
                                </div>
                            </div>


                            <a :href="'/' +this.regionLive + '/' + data.live.participants[index].summonerName" target="_blank" class="live_list_player_name">
                                <p>{{data.live.participants[index].summonerName}}</p>
                            </a>

                            <div v-if="data.ranksFlex && data.ranksSolo" class="live_list_rank_container">
                                <div v-if="'5v5 Ranked Solo'">
                                    <!-- {{data.ranks[index][0].tier}} -->
                                    <div v-if="data.ranksSolo[index]=='Unranked'" class="live_list_rank">
                                        <img src="../assets/unranked.png" alt="unranked" />
                                        <p>Unranked</p>
                                    </div>
                                    <div v-else class="live_list_rank">
                                        <img
                                            :src="require('../assets/' + data.ranksSolo[index].tier + '.png')"
                                            alt=""
                                        />
                                       <p>{{data.ranksSolo[index].tier}}</p>
                                       <p>{{data.ranksSolo[index].rank}}</p>
                                        <p style="color:var(--color-yellow)">{{data.ranksSolo[index].leaguePoints}}LP</p>
                                        <p>(<span style="color:var(--color-win)">{{data.ranksSolo[index].wins}}W</span> / <span style="color:var(--color-lose)">{{data.ranksSolo[index].losses}}L</span>  {{(data.ranksSolo[index].wins/(data.ranksSolo[index].wins+data.ranksSolo[index].losses)*100).toFixed(1)}}%)</p>
                                    </div>

                                </div>

                                <div v-else-if="data.queue=='5v5 Ranked Flex'">
                                    <div v-if="data.ranksFlex[index]=='Unranked'" class="live_list_rank">
                                        <img src="../assets/unranked.png" alt="unranked" />
                                        <p>Unranked</p>
                                    </div>
                                    <div v-else class="live_list_rank">
                                        <img
                                            :src="require('../assets/' + data.ranksFlex[index].tier + '.png')"
                                            alt=""
                                        />
                                        <p>{{data.ranksFlex[index].tier}}</p>
                                       <p>{{data.ranksFlex[index].rank}}</p>
                                        <p style="color:var(--color-yellow)">{{data.ranksFlex[index].leaguePoints}}LP</p>
                                        <p>(<span style="color:var(--color-win)">{{data.ranksFlex[index].wins}}W</span> / <span style="color:var(--color-lose)">{{data.ranksFlex[index].losses}}L</span>  {{(data.ranksFlex[index].wins/(data.ranksFlex[index].wins+data.ranksFlex[index].losses)*100).toFixed(1)}}%)</p>
                                    </div>
                                </div>

                                <div v-else>
                                    <div v-if="data.ranksSolo[index]=='Unranked'" class="live_list_rank">
                                        <img src="../assets/unranked.png" alt="unranked" />
                                        <p>Unranked</p>
                                    </div>
                                    <div v-else class="live_list_rank">
                                       <p>{{data.ranksSolo[index].tier}}</p>
                                       <p>{{data.ranksSolo[index].rank}}</p>
                                        <p style="color:var(--color-yellow)">{{data.ranksSolo[index].leaguePoints}}LP</p>
                                        <p>(<span style="color:var(--color-win)">{{data.ranksSolo[index].wins}}W</span> / <span style="color:var(--color-lose)">{{data.ranksSolo[index].losses}}L</span>  {{(data.ranksSolo[index].wins/(data.ranksSolo[index].wins+data.ranksSolo[index].losses)*100).toFixed(1)}}%)</p>
                                    </div>
                                </div> 
                            </div>

                            <Popper placement="bottom" arrow>
                                    <button class="live_list_runeBtn">Runes</button>

                                    <template #content>
                                        <div class="live_list_rune" style="max-width:550px">
                                            <div style="" v-for="(j,poz) in data.runesPerPlayer[index]" :key="j">
                                                <div class="live_list_rune_box">
                                                    <img
                                                        :src="
                                                            'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/' +
                                                            data.runesPerPlayer[index][poz].icon
                                                        "
                                                        alt="runes img"
                                                        class="match_details_spells_runePrimary"
                                                    />
                                                    <div class="live_list_rune_box_name">
                                                        <p style="font-weight:bold">{{data.runesPerPlayer[index][poz].name}}</p>
                                                        <p v-html="data.runesPerPlayer[index][poz].desc" class="live_list_rune_box_desc"></p>
                                                     </div>
                                                </div>
                                            </div>
                                            <div>
                                                <img :src="data.runeStatsPerPlayer[index][0]" alt="rune_stats">
                                                <img :src="data.runeStatsPerPlayer[index][1]" alt="rune_stats">
                                                <img :src="data.runeStatsPerPlayer[index][2]" alt="rune_stats">
                                            </div>

                                        </div>

 
                                    </template>
                            </Popper>

                            <div>
                                <div v-if="data.live.bannedChampions[index].championId=='-1'" class="live_list_bans">
                                    <img src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/gp_ui_placeholder.png" alt="no ban"/>
                                </div>
                                <div v-else class="live_list_bans">
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

                            <div class="live_list_champ">
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
                                                <p class="spell_name" style="color:var(--color-yellow)">{{ data.spellD[index][2] }}</p>
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
                                                <p class="spell_name" style="color:var(--color-yellow)">{{ data.spellF[index][2] }}</p>
                                                {{ data.spellF[index][1] }}
                                            </div> 
                                        <div>salut</div>
                                        </template>
                                    </Popper>
                                </div>
                            </div>


                            <a :href="'/' +this.regionLive + '/' + data.live.participants[index].summonerName" target="_blank" class="live_list_player_name">
                                <p>{{data.live.participants[index].summonerName}}</p>
                            </a>

                            <div v-if="data.ranksFlex && data.ranksSolo" class="live_list_rank_container">
                                <div v-if="'5v5 Ranked Solo'">
                                    <!-- {{data.ranks[index][0].tier}} -->
                                    <div v-if="data.ranksSolo[index]=='Unranked'" class="live_list_rank">
                                        <img src="../assets/unranked.png" alt="unranked" />
                                        <p>Unranked</p>
                                    </div>
                                    <div v-else class="live_list_rank">
                                        <img
                                            :src="require('../assets/' + data.ranksSolo[index].tier + '.png')"
                                            alt=""
                                        />
                                       <p>{{data.ranksSolo[index].tier}}</p>
                                       <p>{{data.ranksSolo[index].rank}}</p>
                                        <p style="color:var(--color-yellow)">{{data.ranksSolo[index].leaguePoints}}LP</p>
                                        <p>(<span style="color:var(--color-win)">{{data.ranksSolo[index].wins}}W</span> / <span style="color:var(--color-lose)">{{data.ranksSolo[index].losses}}L</span>  {{(data.ranksSolo[index].wins/(data.ranksSolo[index].wins+data.ranksSolo[index].losses)*100).toFixed(1)}}%)</p>
                                    </div>

                                </div>

                                <div v-else-if="data.queue=='5v5 Ranked Flex'">
                                    <div v-if="data.ranksFlex[index]=='Unranked'" class="live_list_rank">
                                        <img src="../assets/unranked.png" alt="unranked" />
                                        <p>Unranked</p>
                                    </div>
                                    <div v-else class="live_list_rank">
                                        <img
                                            :src="require('../assets/' + data.ranksFlex[index].tier + '.png')"
                                            alt=""
                                        />
                                        <p>{{data.ranksFlex[index].tier}}</p>
                                       <p>{{data.ranksFlex[index].rank}}</p>
                                        <p style="color:var(--color-yellow)">{{data.ranksFlex[index].leaguePoints}}LP</p>
                                        <p>(<span style="color:var(--color-win)">{{data.ranksFlex[index].wins}}W</span> / <span style="color:var(--color-lose)">{{data.ranksFlex[index].losses}}L</span>  {{(data.ranksFlex[index].wins/(data.ranksFlex[index].wins+data.ranksFlex[index].losses)*100).toFixed(1)}}%)</p>
                                    </div>
                                </div>

                                <div v-else>
                                    <div v-if="data.ranksSolo[index]=='Unranked'" class="live_list_rank">
                                        <img src="../assets/unranked.png" alt="unranked" />
                                        <p>Unranked</p>
                                    </div>
                                    <div v-else class="live_list_rank">
                                       <p>{{data.ranksSolo[index].tier}}</p>
                                       <p>{{data.ranksSolo[index].rank}}</p>
                                        <p style="color:var(--color-yellow)">{{data.ranksSolo[index].leaguePoints}}LP</p>
                                        <p>(<span style="color:var(--color-win)">{{data.ranksSolo[index].wins}}W</span> / <span style="color:var(--color-lose)">{{data.ranksSolo[index].losses}}L</span>  {{(data.ranksSolo[index].wins/(data.ranksSolo[index].wins+data.ranksSolo[index].losses)*100).toFixed(1)}}%)</p>
                                    </div>
                                </div> 
                            </div>

                            <Popper placement="bottom" arrow>
                                    <button class="live_list_runeBtn">Runes</button>

                                    <template #content>
                                        <div class="live_list_rune" style="max-width:550px">
                                            <div style="" v-for="(j,poz) in data.runesPerPlayer[index]" :key="j">
                                                <div class="live_list_rune_box">
                                                    <img
                                                        :src="
                                                            'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/' +
                                                            data.runesPerPlayer[index][poz].icon
                                                        "
                                                        alt="runes img"
                                                        class="match_details_spells_runePrimary"
                                                    />
                                                    <div class="live_list_rune_box_name">
                                                        <p style="font-weight:bold">{{data.runesPerPlayer[index][poz].name}}</p>
                                                        <p v-html="data.runesPerPlayer[index][poz].desc" class="live_list_rune_box_desc"></p>
                                                     </div>
                                                </div>
                                            </div>
                                            <div>
                                                <img :src="data.runeStatsPerPlayer[index][0]" alt="rune_stats">
                                                <img :src="data.runeStatsPerPlayer[index][1]" alt="rune_stats">
                                                <img :src="data.runeStatsPerPlayer[index][2]" alt="rune_stats">
                                            </div>

                                        </div>

 
                                    </template>
                            </Popper>

                            <div>
                                <div v-if="data.live.bannedChampions[index].championId=='-1'" class="live_list_bans">
                                    <img src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/gp_ui_placeholder.png" alt="no ban"/>
                                </div>
                                <div v-else class="live_list_bans">
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
        runesJsonLive: Object,
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
            runes: [],
            runesPerPlayer:[],
            runeStats: [],
            runeStatsPerPlayer:[],
            runeStatsJson: [
                {id: 5002, link: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodsarmoricon.png'}, //armura
                {id: 5003, link: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodsmagicresicon.png'}, // magic resist
                {id: 5005, link: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodsattackspeedicon.png'}, //atck speed
                {id: 5007, link: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodscdrscalingicon.png'}, //CR
                {id: 5008, link: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodsadaptiveforceicon.png'}, //damage
                {id: 5001, link: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodshealthscalingicon.png'}, //heal
            ]
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



                //runes for live game

                for(let i = 0; i < res.data.participants.length;i++) {
                    for(let j = 0; j< res.data.participants[i].perks.perkIds.length; j++) {
                        for(let k = 0; k< this.runesJsonLive.length; k++) {
                            for(let h = 0; h< this.runesJsonLive[k].slots.length; h++) {
                                for(let g = 0; g < this.runesJsonLive[k].slots[h].runes.length; g++) {
                                    if(res.data.participants[i].perks.perkIds[j] == this.runesJsonLive[k].slots[h].runes[g].id) {
                                        data.runes.push({key:this.runesJsonLive[k].slots[h].runes[g].key, icon:this.runesJsonLive[k].slots[h].runes[g].icon.toLowerCase(), name:this.runesJsonLive[k].slots[h].runes[g].name, desc:this.runesJsonLive[k].slots[h].runes[g].shortDesc});
                                    }
                                }
                            }
                        }
                        
                    }
                    
                }

                for(let i = 0; i < data.runes.length; i+=6) {
                    data.runesPerPlayer.push([data.runes[i],data.runes[i+1],data.runes[i+2],data.runes[i+3],data.runes[i+4],data.runes[i+5]]);
                }
                console.log(data.runesPerPlayer);


                //rune stats (atck speed, dmg, armura)

                for(let i = 0; i < res.data.participants.length; i++) {
                    for(let j = 6; j< res.data.participants[i].perks.perkIds.length; j++) {
                        for(let k = 0; k < data.runeStatsJson.length; k++) {
                            if(data.runeStatsJson[k].id === res.data.participants[i].perks.perkIds[j]) {
                                data.runeStats.push(data.runeStatsJson[k].link);
                                break;
                            }
                        }
                    }
                }

                for(let i = 0; i < data.runeStats.length; i+=3) {
                    data.runeStatsPerPlayer.push([data.runeStats[i],data.runeStats[i+1],data.runeStats[i+2]]);
                }
                console.log(data.runeStatsPerPlayer);

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
                margin-bottom: 2rem;
            }

            &_match {
                display: flex;
            }

            &_player {
                width: 100%;
                display: grid;
                grid-template-columns: max-content 25% 50% 10% min-content;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 1rem;

                @media screen and (max-width: 700px) {
                    grid-template-columns: max-content 1fr max-content min-content;
                    grid-row: 1fr 1fr;
                    margin-bottom: 2rem;
                    row-gap: .5rem;
                }

                img {
                    width: 4rem;
                    height: 4rem;
                    margin-right: .5rem;
                    margin-left: .2rem;
                    border-radius: .5rem;
                }

                &_name {
                    text-decoration: none;
                    color: #ffffff;
                    margin-left: .5rem;
                    width: max-content;
                    text-align: left;
                }
            }

            &_rank {
                display: flex;
                align-items: center;

                &>*:not(:last-child) {
                    margin-right: .5rem;
                }

 

                &_container {
                    @media screen and (max-width: 700px) {
                        grid-column: 1/-1;
                        grid-row: 2/3;
                    }
                }
            }

            &_champ {
                display: flex;
                align-items: center;
            }

            &_bans {
                display: flex;
                align-items: center;
                justify-content: center;
                align-self: center;
            }

            &_spells {
                display: flex;
                flex-direction: column;
                
                img {
                    width: 1.5rem;
                    height: 1.5rem;
                    align-self: flex-end;
                }
            }

            &_runeBtn {
                background-color: var(--color-win);
                border: none;
                outline: none;
                padding: .5rem;
                font-family: inherit;
                border-radius: .2rem;
                cursor: pointer;
                @media screen and (max-width: 700px) {
                    margin-right: 1rem;
                }
            }

            &_rune {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1.2rem;
                
                &_box {
                    display: flex;
                    align-items: flex-start;

                    @media screen and (max-width: 500px) {
                        align-items: center;
                    }

                    &_name {
                        display: flex;
                        align-items: flex-start;
                        flex-direction: column;
                        text-align: left;
                    }

                    &_desc {
                        @media screen and (max-width: 500px) {
                            display: none;
                        }
                    }
                }

                &>*:nth-child(1) {
                    grid-column: 1/2;
                    grid-row: 1/2;
                }
                &>*:nth-child(2) {
                    grid-column: 1/2;
                    grid-row: 2/3;
                }
                &>*:nth-child(3) {
                    grid-column: 1/2;
                    grid-row: 3/4;
                }
                &>*:nth-child(4) {
                    grid-column: 1/2;
                    grid-row: 4/5;
                }
                &>*:nth-child(5) {
                    grid-column: 2/3;
                    grid-row: 1/2;
                }
                &>*:nth-child(6) {
                    grid-column: 2/3;
                    grid-row: 2/3;
                }
                &>*:nth-child(7) {
                    grid-column: 1/2;
                    grid-row: 5/6;
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