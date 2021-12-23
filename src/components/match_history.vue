<template>
  <div class="match">
    <div v-if="mainPlayer.poz != null" style="width: 100%">
      <div
        :class="match.info.participants[mainPlayer.poz].win ? 'win' : 'lose'"
        class="match_details"
      >
        <div class="match_details_time">
          <p>{{ mainPlayer.queue }}</p>
          <p v-if="match.info.participants[mainPlayer.poz].win">Win</p>
          <p v-else>Defeat</p>
          <p v-if="mainPlayer.gameDuration">{{ mainPlayer.gameDuration }}</p>
          <p>{{ mainPlayer.gameTimeAgo }} ago</p>
        </div>

        <div class="match_details_champ">
          <p>{{ match.info.participants[mainPlayer.poz].championName }}</p>
          <img
            :src="
              'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/' +
              match.info.participants[mainPlayer.poz].championId +
              '.png'
            "
            alt="champ img"
          />
        </div>

        <div class="match_details_spells">
          <Popper placement="top" arrow hover>
            <img
              :src="
                'http://ddragon.leagueoflegends.com/cdn/' +
                this.lol_version +
                '/img/spell/' +
                mainPlayer.spellD[0] +
                '.png'
              "
              alt="spell img"
              class="match_details_spells_spellD"
            />

            <template #content>
              <div style="max-width: 400px">
                <p class="spell_name">{{ mainPlayer.spellD[2] }}</p>
                {{ mainPlayer.spellD[1] }}
              </div>
            </template>
          </Popper>

          <Popper placement="top" arrow hover>
            <img
              :src="
                'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/' +
                mainPlayer.runePrimary[0]
              "
              alt="runes img"
              class="match_details_spells_runePrimary"
            />
            <template #content>
              <p class="spell_name">{{ mainPlayer.runePrimary[2] }}</p>
              <p
                style="max-width: 400px"
                v-html="mainPlayer.runePrimary[1]"
              ></p>
            </template>
          </Popper>

          <Popper placement="top" arrow hover>
            <img
              :src="
                'http://ddragon.leagueoflegends.com/cdn/' +
                this.lol_version +
                '/img/spell/' +
                mainPlayer.spellF[0] +
                '.png'
              "
              alt="spell img"
              class="match_details_spells_spellF"
            />

            <template #content>
              <div style="max-width: 400px">
                <p class="spell_name">{{ mainPlayer.spellF[2] }}</p>
                {{ mainPlayer.spellF[1] }}
              </div>
            </template>
          </Popper>

          <Popper placement="top" arrow hover>
            <img
              :src="
                'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/' +
                mainPlayer.runeSecondary[0]
              "
              alt="runes img"
              class="match_details_spells_runeSecondary"
            />
            <template #content>
              <p
                style="max-width: 400px"
                v-html="mainPlayer.runeSecondary[1]"
              ></p>
            </template>
          </Popper>
        </div>

        <div class="match_details_score">
          <p>
            {{ match.info.participants[mainPlayer.poz].kills }} /
            {{ match.info.participants[mainPlayer.poz].deaths }} /
            {{ match.info.participants[mainPlayer.poz].assists }}
          </p>
          <p>
            KDA:
            {{
              (
                (match.info.participants[mainPlayer.poz].kills +
                  match.info.participants[mainPlayer.poz].assists) /
                match.info.participants[mainPlayer.poz].deaths
              ).toFixed(2)
            }}
          </p>
        </div>

        <div class="match_details_level">
          <p>Level {{ match.info.participants[mainPlayer.poz].champLevel }}</p>
          <p>
            {{
              match.info.participants[mainPlayer.poz].totalMinionsKilled +
              match.info.participants[mainPlayer.poz].neutralMinionsKilled
            }}
            CS
          </p>
          <p>
            {{
              (
                (match.info.participants[mainPlayer.poz].totalMinionsKilled +
                  match.info.participants[mainPlayer.poz]
                    .neutralMinionsKilled) /
                (match.info.gameDuration / 60).toFixed(0)
              ).toFixed(1)
            }}
            CS/MIN
          </p>
          <p>{{ mainPlayer.kp }}% KP</p>
        </div>

        <div class="match_items_container">
          <div class="match_items">
            <div
              v-for="i in [
                'item0',
                'item1',
                'item2',
                'item3',
                'item4',
                'item5',
                'item6',
              ]"
              :key="i"
            >
              <div v-if="match.info.participants[mainPlayer.poz][i] == 0">
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
                      match.info.participants[mainPlayer.poz][i] +
                      '.png'
                    "
                    alt="item"
                  />
                  <template #content>
                    <div style="text-align: left">
                      <p class="spell_name">
                        {{
                          itemsJson.data[
                            match.info.participants[mainPlayer.poz][i] //se ia din json ul cu iteme, itemul cu id ul respectiv
                          ].name
                        }}
                      </p>
                      <p
                        style="max-width: 400px"
                        v-html="
                          itemsJson.data[
                            match.info.participants[mainPlayer.poz][i]
                          ].description
                        "
                      ></p>
                      <p class="spell_name">
                        Cost:
                        {{
                          itemsJson.data[
                            match.info.participants[mainPlayer.poz][i]
                          ].gold.total
                        }}
                      </p>
                    </div>
                  </template>
                </Popper>
              </div>
            </div>
          </div>
          <p class="match_items_vs">
            {{ match.info.participants[mainPlayer.poz].visionScore }} vision
            score
          </p>
        </div>

        <div class="match_participanti">
          <div v-for="(i, index) in this.match.info.participants" :key="i">
            <div v-if="index < 5" class="match_participanti_name">
              <img
                :src="
                  'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/' +
                  this.match.info.participants[index].championId +
                  '.png'
                "
                alt="champ img"
              />
              <a
                :href="
                  '/' +
                  this.region +
                  '/' +
                  this.match.info.participants[index].summonerName
                "
                ><p>
                  {{ this.match.info.participants[index].summonerName }}
                </p>
              </a>
            </div>
          </div>
        </div>

        <div class="match_participanti">
          <div v-for="(i, index) in this.match.info.participants" :key="i">
            <div v-if="index >= 5" class="match_participanti_name">
              <img
                :src="
                  'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/' +
                  this.match.info.participants[index].championId +
                  '.png'
                "
                alt="champ img"
              />
              <a
                :href="
                  '/' +
                  this.region +
                  '/' +
                  this.match.info.participants[index].summonerName
                "
                ><p>{{ this.match.info.participants[index].summonerName }}</p>
              </a>
            </div>
          </div>
        </div>

        <div
          class="match_btn"
          :class="
            match.info.participants[mainPlayer.poz].win ? 'win_btn' : 'lose_btn'
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            width="1em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              d="M16.59 8.59L12 13.17L7.41 8.59L6 10l6 6l6-6z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import Popper from "vue3-popper";

export default {
  name: "matchData",
  components: {
    Popper,
  },
  props: {
    match: Object, //datele despre meci (un singur meci)
    summonersPuuid: String, //puuid ul player ului cautat
    region: String, //regiunea
    queueJson: Array, // un json cu toate queurile
    spellsJson: Object, //un json cu toate spell urile
    runesJson: Object, // un json cu toate runele
    itemsJson: Object, // un json cu toate itemele
  },
  setup() {
    const mainPlayer = reactive({
      poz: null, //pozitia in array a player ului cautat
      queue: null, //queue ul fiecarui meci
      gameDuration: null,
      gameTimeAgo: null,
      kp: 0,
      spellD: [], // pe pozitia 0 am spellu ul in sine, pe poz 1 am descrierea, pe poz 2 am numele
      spellF: [],
      runePrimary: [], // pe pozitia 0 am runa in sine, pe poz 1 am descrierea, pe poz 2 am numele
      runeSecondary: [],
    });

    // const items = reactive({
    //   item1:null,
    //   item2:null,
    //   item3:null,
    //   item4:null,
    //   item5:null,
    //   item6:null,
    // });

    function getMainPlayer() {
      for (let i = 0; i < this.match.metadata.participants.length; i++) {
        //pozitia in array ul cu meci al player ului cautat
        if (this.summonersPuuid == this.match.metadata.participants[i]) {
          mainPlayer.poz = i;
        }
      }
      for (let i = 0; i < this.queueJson.length; i++) {
        //gasirea queului

        if (this.queueJson[i].queueId == this.match.info.queueId) {
          let res = this.queueJson[i].description.split(" ");
          res.pop();
          mainPlayer.queue = res.join(" ");
        }
      }

      //gasirea Spell urilor (main player)

      const spells = Object.entries(this.spellsJson.data);

      for (let i = 0; i < spells.length; i++) {
        if (
          spells[i][1].key ==
          this.match.info.participants[mainPlayer.poz].summoner1Id
        ) {
          mainPlayer.spellD[0] = spells[i][1].id;
          mainPlayer.spellD[1] = spells[i][1].description;
          mainPlayer.spellD[2] = spells[i][1].name;
        }
      }

      for (let j = 0; j < spells.length; j++) {
        if (
          spells[j][1].key ==
          this.match.info.participants[mainPlayer.poz].summoner2Id
        ) {
          mainPlayer.spellF[0] = spells[j][1].id;
          mainPlayer.spellF[1] = spells[j][1].description;
          mainPlayer.spellF[2] = spells[j][1].name;
        }
      }

      //gasirea Runelor pricipale (main player)

      for (let i = 0; i < this.runesJson.length; i++) {
        for (let j = 0; j < this.runesJson[i].slots[0].runes.length; j++) {
          if (
            this.runesJson[i].slots[0].runes[j].id ==
            this.match.info.participants[mainPlayer.poz].perks.styles[0]
              .selections[0].perk
          ) {
            mainPlayer.runePrimary[0] =
              this.runesJson[i].slots[0].runes[j].icon.toLowerCase();
            mainPlayer.runePrimary[1] =
              this.runesJson[i].slots[0].runes[j].longDesc;
            mainPlayer.runePrimary[2] =
              this.runesJson[i].slots[0].runes[j].name;
          }
        }
      }

      for (let i = 0; i < this.runesJson.length; i++) {
        if (
          this.runesJson[i].id ==
          this.match.info.participants[mainPlayer.poz].perks.styles[1].style
        ) {
          mainPlayer.runeSecondary[0] = this.runesJson[i].icon.toLowerCase();
          mainPlayer.runeSecondary[1] = this.runesJson[i].name;
        }
      }

      //gasirea itemelor (main player)

      // for(let i = 0; i< this.itemsJson.data.length; i++) {
      // if()
      // }
    }

    function getTime() {
      //sec to min:sec

      const sec = parseInt(this.match.info.gameDuration, 10); // convert value to number if it's string
      let hours = Math.floor(sec / 3600); // get hours
      let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
      let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
      // add 0 if value < 10; Example: 2 => 02
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      mainPlayer.gameDuration = `${minutes}min ${seconds}s`;
    }

    function msToTime(duration) {
      // ms to ANYTIME
      var //seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
        days = Math.floor(duration / (24 * 60 * 60 * 1000));

      //hours = (hours < 10) ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      //seconds = (seconds < 10) ? "0" + seconds : seconds;

      if (duration < 3600000) {
        mainPlayer.gameTimeAgo = minutes + " minutes";
      } else if (duration <= 86399999) {
        mainPlayer.gameTimeAgo =
          hours + " hours" /* + minutes + ":" + seconds*/;
      } else {
        if (duration > 86399999 && duration <= 172799999) {
          mainPlayer.gameTimeAgo = days + " day";
        } else {
          mainPlayer.gameTimeAgo = days + " days";
        }
      }
    }

    function kp() {
      let teamkills = 0;
      for (let i = 0; i < this.match.info.participants.length; i++) {
        if (
          this.match.info.participants[mainPlayer.poz].teamId ==
          this.match.info.participants[i].teamId
        ) {
          teamkills += this.match.info.participants[i].kills;
        }
      }
      mainPlayer.kp = (
        ((this.match.info.participants[mainPlayer.poz].kills +
          this.match.info.participants[mainPlayer.poz].assists) /
          teamkills) *
        100
      ).toFixed(0);
    }

    return {
      mainPlayer,
      getMainPlayer,
      getTime,
      msToTime,
      kp,
    };
  },
  mounted() {
    this.getMainPlayer();
    this.getTime();
    this.msToTime(new Date().getTime() - this.match.info.gameEndTimestamp);

    this.kp();
  },
};
</script>


<style scoped lang="scss">
@import "../styles/match_details.scss"; // search_page styles
</style>
