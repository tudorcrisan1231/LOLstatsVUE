<template>
<div class="live">
    <div v-if="data.live">
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
                            <p>{{data.live.participants[index].summonerName}}</p>
                        </div>

                        <div class="live_list_spells">
                            <Popper placement="top" arrow hover>
                                <img
                                :src="
                                    'http://ddragon.leagueoflegends.com/cdn/' +
                                    this.lol_version +
                                    '/img/spell/' +
                                    'SummonerFlash' +
                                    '.png'
                                "
                                alt="spell img"
                                class="match_details_spells_spellD"
                                />

                                <template #content>
                                <!-- <div style="max-width: 400px">
                                    <p class="spell_name">{{ mainPlayer.spellD[2] }}</p>
                                    {{ mainPlayer.spellD[1] }}
                                </div> -->
                                <div>salut</div>
                                </template>
                            </Popper>
                        </div>
                    </div>



                </div>
            </div>

            <div class="live_list_red">
                <div v-for="(i,index) in data.live.participants" :key="i">
                    <div v-if="index >= 5" class="live_list_player">
                        <img
                            :src="
                            'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/' +
                            data.live.participants[index].championId +
                            '.png'
                            "
                            alt="champ img"
                        />
                        <p>{{data.live.participants[index].summonerName}}</p>
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
    },
    setup() {
        const data = reactive({
            live:'',
        });

        async function getLiveData() {
            await axios(
                `http://localhost:3000/spectator-v4/${this.regionLive}/${this.accountIdLive.id}`
            ) // match history
            .then((res) => {
                data.live = res.data;
                console.log(res.data);
            });
        }
        
        return{
            data,
            getLiveData
        }
    },
    mounted() {
        this.getLiveData();
    }
}
</script>

<style lang="scss" scoped>
    .live {


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
                display: flex;
                align-items: center;

                img {
                    width: 4rem;
                    height: 4rem;
                    margin-right: .5rem;
                    margin-left: .2rem;
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