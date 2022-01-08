<template>
  <div class="team">
        <div class="team_overview team_blue_overview">
            <div v-if="this.matchData.info.teams[0].win" class="team_overview_result">
                <p class="win">Win</p>
                <p>(Blue Team)</p>
            </div>
            <div v-else class="team_overview_result">
                <p class="lose">Defeat</p>
                <p>(Blue Team)</p>
            </div>

            <div class="team_overview_score">
                <p>{{teamBlue.kills}} / {{teamBlue.deaths}} / {{teamBlue.assists}}</p>
            </div>

            <div class="team_overview_obj">
                <Popper placement="top" arrow hover>
                    <div class="team_overview_obj_item">
                        <img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/tower-100.png" alt="tower svg">
                        <p>{{this.matchData.info.teams[0].objectives.tower.kills}}</p>
                    </div>
                    <template #content>
                        <p>Towers destroyed</p>
                    </template>
                </Popper>

                <Popper placement="top" arrow hover>
                    <div class="team_overview_obj_item">
                        <img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/inhibitor-100.png" alt="inhibitor svg">
                        <p>{{this.matchData.info.teams[0].objectives.inhibitor.kills}}</p>
                    </div>
                    <template #content>
                        <p>Inhibitors destroyed</p>
                    </template>
                </Popper>
            </div>

            <div class="team_overview_monsters">
                <Popper placement="top" arrow hover>
                    <div class="team_overview_obj_item">
                        <img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/baron-100.png" alt="baron svg">
                        <p>{{this.matchData.info.teams[0].objectives.baron.kills}}</p>
                    </div>
                    <template #content>
                        <p>Barons killed</p>
                    </template>
                </Popper>
                <Popper placement="top" arrow hover>
                    <div class="team_overview_obj_item">
                        <img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/herald-100.png" alt="herald svg">
                        <p>{{this.matchData.info.teams[0].objectives.riftHerald.kills}}</p>
                    </div>
                    <template #content>
                        <p>Heralds killed</p>
                    </template>
                </Popper>
                <Popper placement="top" arrow hover>
                    <div class="team_overview_obj_item">
                        <img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/dragon-100.png" alt="dragon svg">
                        <p>{{this.matchData.info.teams[0].objectives.dragon.kills}}</p>
                    </div>
                    <template #content>
                        <p>Dragons killed</p>
                    </template>
                </Popper>
            </div>

            <Popper placement="top" arrow hover>
                <div class="team_overview_gold">
                    <img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/icon_gold.png" alt="gold">
                    <p>{{(teamBlue.gold/1000).toFixed(1)}}K</p>
                </div>
                <template #content>
                    <p>Total team gold</p>
                </template>
            </Popper>

        </div>

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

                    <div class="team_player_name">
                        <a :href="'/' +this.regionData + '/' + this.matchData.info.participants[index].summonerName" target="_blank">
                            <p>{{this.matchData.info.participants[index].summonerName}}</p>
                        </a>
                    </div>



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
                        <p><span>{{((this.matchData.info.participants[index].totalDamageDealtToChampions)/1000).toFixed(3)}}</span> <span>DMG</span></p>
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

        <div class="team_overview team_red_overview">
            <div v-if="this.matchData.info.teams[1].win" class="team_overview_result">
                <p class="win">Win</p>
                <p>(Red Team)</p>
            </div>
            <div v-else class="team_overview_result">
                <p class="lose">Defeat</p>
                <p>(Red Team)</p>
            </div>

            <div class="team_overview_score">
                <p>{{teamRed.kills}} / {{teamRed.deaths}} / {{teamRed.assists}}</p>
            </div>

            <div class="team_overview_obj">
                <Popper placement="top" arrow hover>
                    <div class="team_overview_obj_item">
                        <img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/tower-200.png" alt="tower svg">
                        <p>{{this.matchData.info.teams[1].objectives.tower.kills}}</p>
                    </div>
                    <template #content>
                        <p>Towers destroyed</p>
                    </template>
                </Popper>

                <Popper placement="top" arrow hover>
                    <div class="team_overview_obj_item">
                        <img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/inhibitor-200.png" alt="inhibitor svg">
                        <p>{{this.matchData.info.teams[1].objectives.inhibitor.kills}}</p>
                    </div>
                    <template #content>
                        <p>Inhibitors destroyed</p>
                    </template>
                </Popper>
            </div>

            <div class="team_overview_monsters">
                <Popper placement="top" arrow hover>
                    <div class="team_overview_obj_item">
                        <img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/baron-200.png" alt="baron svg">
                        <p>{{this.matchData.info.teams[1].objectives.baron.kills}}</p>
                    </div>
                    <template #content>
                        <p>Barons killed</p>
                    </template>
                </Popper>
                <Popper placement="top" arrow hover>
                    <div class="team_overview_obj_item">
                        <img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/herald-200.png" alt="herald svg">
                        <p>{{this.matchData.info.teams[1].objectives.riftHerald.kills}}</p>
                    </div>
                    <template #content>
                        <p>Heralds killed</p>
                    </template>
                </Popper>
                <Popper placement="top" arrow hover>
                    <div class="team_overview_obj_item">
                        <img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/dragon-200.png" alt="dragon svg">
                        <p>{{this.matchData.info.teams[1].objectives.dragon.kills}}</p>
                    </div>
                    <template #content>
                        <p>Dragons killed</p>
                    </template>
                </Popper>
            </div>

            <Popper placement="top" arrow hover>
                <div class="team_overview_gold">
                    <img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/icon_gold.png" alt="gold">
                    <p>{{(teamRed.gold/1000).toFixed(1)}}K</p>
                </div>
                <template #content>
                    <p>Total team gold</p>
                </template>
            </Popper>
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

                    <div class="team_player_name">
                        <a :href="'/' +this.regionData + '/' + this.matchData.info.participants[index].summonerName" target="_blank">
                        <p>{{this.matchData.info.participants[index].summonerName}}</p>
                        </a>
                    </div>


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
                        <p><span>{{((this.matchData.info.participants[index].totalDamageDealtToChampions)/1000).toFixed(3)}}</span> <span>DMG</span></p>
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

        <div class="team_bans">
            <div>
                <div v-for="(i,index) in this.matchData.info.teams[0].bans" :key="i">
                    <img style="filter: grayscale(100%);" :src="'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/' + this.matchData.info.teams[0].bans[index].championId + '.png'" alt="champ img"/>
                </div>
            </div>

            <p>: Bans :</p>

            <div>
                <div v-for="(i,index) in this.matchData.info.teams[1].bans" :key="i">
                    <img style="filter: grayscale(100%);" :src="'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/' + this.matchData.info.teams[1].bans[index].championId + '.png'" alt="champ img"/>
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
        regionData: String,
    },
    setup() {
        const teamBlue = reactive({
            kills:0,
            assists:0,
            deaths:0,
            gold:0,
        });
        const teamRed = reactive({
            kills:0,
            assists:0,
            deaths:0,
            gold:0,
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
                    teamBlue.assists += this.matchData.info.participants[i].assists;
                    teamBlue.deaths += this.matchData.info.participants[i].deaths;
                    teamBlue.gold += this.matchData.info.participants[i].goldEarned;
                } else {
                    teamRed.kills += this.matchData.info.participants[i].kills;
                    teamRed.assists += this.matchData.info.participants[i].assists;
                    teamRed.deaths += this.matchData.info.participants[i].deaths;
                    teamRed.gold += this.matchData.info.participants[i].goldEarned;
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
.win {
    color: var(--color-win);
    font-weight: bold;
    font-size: 1.4rem;
    margin-right: .5rem;
}
.lose {
    color: var(--color-lose);
    font-weight: bold;
    font-size: 1.4rem;
    margin-right: .5rem;
}
.team {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    width: 100%;
    @media screen and (max-width: 500px) {
        font-size: 1rem;
    }
    // white-space: nowrap;
        // overflow-x: scroll;
        // overflow-y: hidden;

    &_overview {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: bold;
        @media screen and (max-width: 500px) {
            font-size: 1rem;
        }
        &_result {
            display: flex;
            align-items: center;
            font-size: 1.4rem;
            @media screen and (max-width: 500px) {
                font-size: 1rem;
            }
            @media screen and (max-width: 400px) {
                flex-direction: column;
            }
        }

        &_obj {
            display: flex;
            align-items: center;

            &_item {
                display: flex;
                align-items: center;
                margin-right: .7rem;
                &>* {
                    margin-right: .3rem;
                }
            }
        }

        &_monsters {
            display: flex;
            align-items: center;
        }
        img {
            width: 2rem !important;
            height: 2rem !important;

            @media screen and (max-width: 500px) {
                width: 1.5rem !important;
                height: 1.5rem !important;
            }
        }

        &_gold {
            display: flex;
            align-items: center;

            img {
                width: max-content !important;
                object-fit: cover;
                margin-right: .5rem;
            }
        }
    }

    &_bans {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top: 4px solid rgba(0,0,0, 0.2);
        padding-top: 1rem;

        div {
            display: flex;
            &>*:not(:last-child) {
                margin-right: .5rem;
            }
        }

        @media screen and (max-width: 500px) {
            img {
                width: 2.5rem !important;
                height: 2.5rem !important;
            }
        }
    }


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
        width: 100% !important;

    }

    &_blue {
        border-bottom: 4px solid rgba(0,0,0, 0.2);
        // border-top: 2px solid rgba(0,0,0, 0.2);
    }

    &_player {
        width: 100% !important;
        display: grid;
        grid-template-columns: min-content min-content min-content 13% min-content 1fr 1fr min-content;
        align-items: center;
        justify-items: center;
        text-align: left;
        gap: 1rem;
        margin-bottom: 1rem;
        width: 100%;

        @media screen and (max-width: 600px) {
            grid-template-columns: min-content min-content min-content 13% 1fr 1fr 1fr;
            row-gap: .5rem;
        }
        @media screen and (max-width: 500px) {
            grid-template-columns: min-content min-content min-content 18% 1fr 1fr 1fr;
        }
        @media screen and (max-width: 400px) {
            grid-template-columns: min-content min-content min-content 18% 1fr 1fr 1fr;
        }

        // &>div {
        //     display: flex !important;
        // }
        transition: all .2s;
        border-bottom: 1px solid rgba(0,0,0,.1);

        &:hover {
            background-color: rgba(0,0,0,.1);
        }

        &_name {
            justify-self: flex-start;
            text-decoration: none;
            cursor: pointer;
            width: 100%;
            a {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-decoration: none;
                color: inherit;    
                p{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }                                                           
            }
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

        &_dmg {
            white-space: nowrap;

            p{
                @media screen and (max-width: 400px) {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
            }
        }

        &_score {
            display: flex;
            flex-direction: column;
            align-items: center;
            white-space: nowrap;

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
           display: grid;
        //    grid-template-columns: repeat(4,1fr);
            grid-template-columns: repeat(7,1fr);
           gap: .1rem;
           row-gap: 0;

           img {
               width: 2.7rem !important; 
               height: 2.7rem !important;
           }

            @media screen and (max-width: 650px) {
                grid-template-columns: repeat(4,1fr);
            }
            @media screen and (max-width: 600px) {
               grid-template-columns: repeat(7,1fr);
               grid-column: 1/-1;
               justify-self: flex-start;
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
            border: 1px solid white;
            font-family: inherit;
            color: white;
            padding: .4rem;
            cursor: pointer;

            @media screen and (max-width: 800px) {
                font-size: 1.2rem;
            }
 
        }
    }
}


</style>