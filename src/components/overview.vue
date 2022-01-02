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

                <Popper placement="bottom" arrow>
                    <button class="team_player_runeBtn">Runes</button>

                    <template #content>
                        <div class="team_player_runes" style="max-width:550px">
                            <div class="team_player_runes_items">
                                <div style="" v-for="(j,poz) in runes.allPerksPrimary[index]" :key="j">
                                    <div class="team_player_rune_box">
                                        <img
                                            :src="
                                                'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/' +
                                                runes.allPerksPrimary[index][poz][1]
                                            "
                                            alt="runes img"
                                            class="match_details_spells_runePrimary"
                                        />
                                        <div class="team_player_rune_box_name">
                                            <p style="font-weight:bold">{{runes.allPerksPrimary[index][poz][0]}}</p>
                                            <p v-html="runes.allPerksPrimary[index][poz][2]" class="team_player_rune_box_desc"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="team_player_runes_items">
                                <div style="" v-for="(j,poz) in runes.allPerksSec[index]" :key="j">
                                    <div class="team_player_rune_box">
                                        <img
                                            :src="
                                                'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/' +
                                                runes.allPerksSec[index][poz][1]
                                            "
                                            alt="runes img"
                                            class="match_details_spells_runePrimary"
                                        />
                                        <div class="team_player_rune_box_name">
                                            <p style="font-weight:bold">{{runes.allPerksSec[index][poz][0]}}</p>
                                            <p v-html="runes.allPerksSec[index][poz][2]" class="team_player_rune_box_desc"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="team_player_statsRunes">
                                <div v-for="(k,poz1) in runes.runeStatsJson" :key="k">
                                    <div v-if="this.matchData.info.participants[index].perks.statPerks.offense == runes.runeStatsJson[poz1].id">
                                        <img :src="runes.runeStatsJson[poz1].link" alt="stats runes">
                                    </div>

                                </div>
                                <div v-for="(k,poz1) in runes.runeStatsJson" :key="k">
                                    <div v-if="this.matchData.info.participants[index].perks.statPerks.flex == runes.runeStatsJson[poz1].id">
                                        <img :src="runes.runeStatsJson[poz1].link" alt="stats runes">
                                    </div>
                                </div>
                                <div v-for="(k,poz1) in runes.runeStatsJson" :key="k">
                                    <div v-if="this.matchData.info.participants[index].perks.statPerks.defense == runes.runeStatsJson[poz1].id">
                                        <img :src="runes.runeStatsJson[poz1].link" alt="stats runes">
                                    </div>
                                </div>
                            </div>

                        </div>
                    </template>
                </Popper>

                <div class="team_player_spells" v-if="spells.spellD[index] && spells.spellF[index]">
                    <Popper placement="top" arrow hover>
                        <img
                        :src="
                            'http://ddragon.leagueoflegends.com/cdn/' +
                            this.lol_version +
                            '/img/spell/' +
                            spells.spellD[index][0] +
                            '.png'
                        "
                        alt="spell img"
                        />

                        <template #content>
                        <div style="max-width: 400px">
                            <p class="spell_name">{{ spells.spellD[index][2] }}</p>
                            {{ spells.spellD[index][1] }}
                        </div>
                        </template>
                    </Popper>

                    <Popper placement="top" arrow hover>
                        <img
                        :src="
                            'http://ddragon.leagueoflegends.com/cdn/' +
                            this.lol_version +
                            '/img/spell/' +
                            spells.spellF[index][0] +
                            '.png'
                        "
                        alt="spell img"
                        />

                        <template #content>
                        <div style="max-width: 400px">
                            <p class="spell_name">{{ spells.spellF[index][2] }}</p>
                            {{ spells.spellF[index][1] }}
                        </div>
                        </template>
                    </Popper>
                </div>

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

                <div class="team_player_items">
                    <div v-for="j in ['item0','item1','item2','item3','item4','item5','item6',]" :key="j">
                        <div v-if="this.matchData.info.participants[index][j] == 0">
                            <Popper placement="top" arrow hover>
                            <img
                                src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/gp_ui_placeholder.png"
                                alt="placeholder"
                            />

                            <template #content>
                                <p style="max-width: 400px">No item</p>
                            </template>
                            </Popper>
                        </div>
                        <div v-else>
                            <Popper placement="top" arrow hover>
                            <img
                                :src="
                                'http://ddragon.leagueoflegends.com/cdn/' +
                                this.lol_version +
                                '/img/item/' +
                                this.matchData.info.participants[index][j] +
                                '.png'
                                "
                                alt="item"
                            />
                            <template #content>
                                <div style="text-align: left">
                                <p class="spell_name">
                                    {{
                                    this.itemsData.data[
                                        this.matchData.info.participants[index][j] //se ia din json ul cu iteme, itemul cu id ul respectiv
                                    ].name
                                    }}
                                </p>
                                <p
                                    style="max-width: 400px"
                                    v-html="
                                    this.itemsData.data[
                                        this.matchData.info.participants[index][j]
                                    ].description
                                    "
                                ></p>
                                <p class="spell_name">
                                    Cost:
                                    {{
                                    this.itemsData.data[
                                        this.matchData.info.participants[index][j]
                                    ].gold.total
                                    }}
                                </p>
                                </div>
                            </template>
                            </Popper>
                        </div>
                    </div>
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

                
                <Popper placement="bottom" arrow>
                    <button class="team_player_runeBtn">Runes</button>

                    <template #content>
                        <div class="team_player_runes" style="max-width:550px">
                            <div class="team_player_runes_items">
                                <div style="" v-for="(j,poz) in runes.allPerksPrimary[index]" :key="j">
                                    <div class="team_player_rune_box">
                                        <img
                                            :src="
                                                'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/' +
                                                runes.allPerksPrimary[index][poz][1]
                                            "
                                            alt="runes img"
                                            class="match_details_spells_runePrimary"
                                        />
                                        <div class="team_player_rune_box_name">
                                            <p style="font-weight:bold">{{runes.allPerksPrimary[index][poz][0]}}</p>
                                            <p v-html="runes.allPerksPrimary[index][poz][2]" class="team_player_rune_box_desc"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="team_player_runes_items">
                                <div style="" v-for="(j,poz) in runes.allPerksSec[index]" :key="j">
                                    <div class="team_player_rune_box">
                                        <img
                                            :src="
                                                'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/' +
                                                runes.allPerksSec[index][poz][1]
                                            "
                                            alt="runes img"
                                            class="match_details_spells_runePrimary"
                                        />
                                        <div class="team_player_rune_box_name">
                                            <p style="font-weight:bold">{{runes.allPerksSec[index][poz][0]}}</p>
                                            <p v-html="runes.allPerksSec[index][poz][2]" class="team_player_rune_box_desc"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="team_player_statsRunes">
                                <div v-for="(k,poz1) in runes.runeStatsJson" :key="k">
                                    <div v-if="this.matchData.info.participants[index].perks.statPerks.offense == runes.runeStatsJson[poz1].id">
                                        <img :src="runes.runeStatsJson[poz1].link" alt="stats runes">
                                    </div>

                                </div>
                                <div v-for="(k,poz1) in runes.runeStatsJson" :key="k">
                                    <div v-if="this.matchData.info.participants[index].perks.statPerks.flex == runes.runeStatsJson[poz1].id">
                                        <img :src="runes.runeStatsJson[poz1].link" alt="stats runes">
                                    </div>
                                </div>
                                <div v-for="(k,poz1) in runes.runeStatsJson" :key="k">
                                    <div v-if="this.matchData.info.participants[index].perks.statPerks.defense == runes.runeStatsJson[poz1].id">
                                        <img :src="runes.runeStatsJson[poz1].link" alt="stats runes">
                                    </div>
                                </div>
                            </div>

                        </div>
                    </template>
                </Popper>

                <div class="team_player_spells"  v-if="spells.spellD[index] && spells.spellF[index]">
                    <Popper placement="top" arrow hover>
                        <img
                        :src="
                            'http://ddragon.leagueoflegends.com/cdn/' +
                            this.lol_version +
                            '/img/spell/' +
                            spells.spellD[index][0] +
                            '.png'
                        "
                        alt="spell img"
                        />

                        <template #content>
                        <div style="max-width: 400px">
                            <p class="spell_name">{{ spells.spellD[index][2] }}</p>
                            {{ spells.spellD[index][1] }}
                        </div>
                        </template>
                    </Popper>

                    <Popper placement="top" arrow hover>
                        <img
                        :src="
                            'http://ddragon.leagueoflegends.com/cdn/' +
                            this.lol_version +
                            '/img/spell/' +
                            spells.spellF[index][0] +
                            '.png'
                        "
                        alt="spell img"
                        />

                        <template #content>
                        <div style="max-width: 400px">
                            <p class="spell_name">{{ spells.spellF[index][2] }}</p>
                            {{ spells.spellF[index][1] }}
                        </div>
                        </template>
                    </Popper>
                </div>

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

                <div class="team_player_items">
                    <div v-for="j in ['item0','item1','item2','item3','item4','item5','item6',]" :key="j">
                        <div v-if="this.matchData.info.participants[index][j] == 0">
                            <Popper placement="top" arrow hover>
                            <img
                                src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/gp_ui_placeholder.png"
                                alt="placeholder"
                            />

                            <template #content>
                                <p style="max-width: 400px">No item</p>
                            </template>
                            </Popper>
                        </div>
                        <div v-else>
                            <Popper placement="top" arrow hover>
                            <img
                                :src="
                                'http://ddragon.leagueoflegends.com/cdn/' +
                                this.lol_version +
                                '/img/item/' +
                                this.matchData.info.participants[index][j] +
                                '.png'
                                "
                                alt="item"
                            />
                            <template #content>
                                <div style="text-align: left">
                                <p class="spell_name">
                                    {{
                                    this.itemsData.data[
                                        this.matchData.info.participants[index][j] //se ia din json ul cu iteme, itemul cu id ul respectiv
                                    ].name
                                    }}
                                </p>
                                <p
                                    style="max-width: 400px"
                                    v-html="
                                    this.itemsData.data[
                                        this.matchData.info.participants[index][j]
                                    ].description
                                    "
                                ></p>
                                <p class="spell_name">
                                    Cost:
                                    {{
                                    this.itemsData.data[
                                        this.matchData.info.participants[index][j]
                                    ].gold.total
                                    }}
                                </p>
                                </div>
                            </template>
                            </Popper>
                        </div>
                    </div>
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
        itemsData: Object,
        spellsData: Object,
        runesData: Object,
    },
    setup() {
        const teamBlue = reactive({
            kills:0,
        });
        const teamRed = reactive({
            kills:0,
        });
        const spells = reactive({
            spellD:[],  //structura : [['flash','descriere_flash','nume_flash'],['ignite','descriere_ignite','nume_ignite']]
            spellF:[],
        });
        const runes = reactive({
            runeStatsJson: [
                {id: 5002, link: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodsarmoricon.png'}, //armura
                {id: 5003, link: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodsmagicresicon.png'}, // magic resist
                {id: 5005, link: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodsattackspeedicon.png'}, //atck speed
                {id: 5007, link: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodscdrscalingicon.png'}, //CR
                {id: 5008, link: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodsadaptiveforceicon.png'}, //damage
                {id: 5001, link: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodshealthscalingicon.png'}, //heal
            ],
            perksPrimary:[], // structura ex: [[['electrocute','icon','descriere'],['taste od blood','icon','descriere']]]
            perksSec:[], 
            allPerksPrimary: [],
            allPerksSec: [],
        });

        function getStatsPerTeam() {
            for(let i = 0; i < this.matchData.info.participants.length; i++) {
                if(i<5) {
                    teamBlue.kills += this.matchData.info.participants[i].kills;
                } else {
                    teamRed.kills += this.matchData.info.participants[i].kills;
                }
            }

            // console.log(this.spellsData, this.runesData);
        }

        function getSpells() {
            const spellsJson = Object.entries(this.spellsData.data);

            for(let i = 0; i < this.matchData.info.participants.length; i++) {
                for (let j = 0; j < spellsJson.length; j++) { 
                    if(spellsJson[j][1].key == this.matchData.info.participants[i].summoner1Id) {
                        spells.spellD.push([spellsJson[j][1].id, spellsJson[j][1].description, spellsJson[j][1].name]);
                    }
                }
            }

            for(let i = 0; i < this.matchData.info.participants.length; i++) {
                for (let j = 0; j < spellsJson.length; j++) { 
                    if(spellsJson[j][1].key == this.matchData.info.participants[i].summoner2Id) {
                        spells.spellF.push([spellsJson[j][1].id, spellsJson[j][1].description, spellsJson[j][1].name]);
                    }
                }
            }

            // console.log(spells.spellD);
            // console.log(spells.spellF);
        }

        function getRunes() {
            // console.log(this.runesData);

            for(let i = 0; i < this.matchData.info.participants.length; i++) {
                for(let j = 0; j < this.matchData.info.participants[i].perks.styles[0].selections.length; j++) {
                    for(let g = 0; g < this.runesData.length; g++) {
                        for(let h = 0; h < this.runesData[g].slots.length; h++) {
                            for(let k = 0; k < this.runesData[g].slots[h].runes.length; k++) {
                                if(this.runesData[g].slots[h].runes[k].id == this.matchData.info.participants[i].perks.styles[0].selections[j].perk) {
                                    runes.perksPrimary.push([this.runesData[g].slots[h].runes[k].name,(this.runesData[g].slots[h].runes[k].icon).toLowerCase(),this.runesData[g].slots[h].runes[k].shortDesc]);
                                }
                            }
                        }
                    }
                }

                for(let j = 0; j < this.matchData.info.participants[i].perks.styles[1].selections.length; j++) {
                    for(let g = 0; g < this.runesData.length; g++) {
                        for(let h = 0; h < this.runesData[g].slots.length; h++) {
                            for(let k = 0; k < this.runesData[g].slots[h].runes.length; k++) {
                                if(this.runesData[g].slots[h].runes[k].id == this.matchData.info.participants[i].perks.styles[1].selections[j].perk) {
                                    runes.perksSec.push([this.runesData[g].slots[h].runes[k].name,(this.runesData[g].slots[h].runes[k].icon).toLowerCase(),this.runesData[g].slots[h].runes[k].shortDesc]);
                                }
                            }
                        }
                    }
                }
            }
            
            for(let i = 0; i < runes.perksPrimary.length; i+=4) {
                runes.allPerksPrimary.push([runes.perksPrimary[i],runes.perksPrimary[i+1],runes.perksPrimary[i+2],runes.perksPrimary[i+3]])
            }

            for(let i = 0; i < runes.perksSec.length; i+=2) {
                runes.allPerksSec.push([runes.perksSec[i],runes.perksSec[i+1]]);
            }

            // console.log(runes.allPerksPrimary);
            // console.log(runes.allPerksSec[6][1][0]);
        }

        return {
            teamRed,
            teamBlue,
            spells,
            runes,
            getStatsPerTeam,
            getSpells,
            getRunes,
        }
    },
    mounted() {
        this.getStatsPerTeam();
        this.getSpells();
        this.getRunes();
    }
}
</script>

<style lang="scss" scoped>
.spell_name {
    color: var(--color-yellow);
}
.team {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    width: 100%;


    img {
        width: 3rem;
        height: 3rem;
        display: flex;
        border-radius: .4rem;
        object-fit: cover;
    }

    &_blue,&_red {
        display: flex;
        flex-direction: column;
    }

    &_player {
        display: grid;
        grid-template-columns: min-content min-content min-content 1fr max-content max-content max-content min-content;
        align-items: center;
        justify-items: flex-start;
        text-align: left;
        gap: 2rem;
        margin-bottom: 1rem;
        width: 100%;

        // &>div {
        //     display: flex !important;
        // }

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


        &_items {
            display: flex;
            &>*:not(:last-child) {
                margin-right: .3rem;
            }
        }

        &_spells {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            img {
                width: 1.7rem;
                height: 1.7rem;
            }
        }

        &_runes {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;

            &_items {
                &>* {
                    margin-bottom: 1rem;
                }
            }
        }

        &_rune_box {
            display: flex;
            align-items: flex-start;
            img {
                margin-right: .5rem;
            }
        }
        &_statsRunes {
            display: flex;
        }

        &_runeBtn {
            background-color: transparent;
            border: 1px solid black;
            font-family: inherit;
            padding: .4rem;
            cursor: pointer;
        }
    }
}


</style>