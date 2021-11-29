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
          <img
            :src="
              'http://ddragon.leagueoflegends.com/cdn/11.23.1/img/spell/' +
              mainPlayer.spellD +
              '.png'
            "
            alt="spell img"
          />
          <img
            :src="
              'http://ddragon.leagueoflegends.com/cdn/11.23.1/img/spell/' +
              mainPlayer.spellF +
              '.png'
            "
            alt="spell img"
          />
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
                <img
                  src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/gp_ui_placeholder.png"
                  alt="placeholder"
                />
              </div>
              <div v-else>
                <img
                  :src="
                    'http://ddragon.leagueoflegends.com/cdn/11.23.1/img/item/' +
                    match.info.participants[mainPlayer.poz][i] +
                    '.png'
                  "
                  alt="item"
                />
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
              <p>{{ this.match.info.participants[index].summonerName }}</p>
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
              <p>{{ this.match.info.participants[index].summonerName }}</p>
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

export default {
  name: "matchData",
  props: {
    match: Object, //datele despre meci (un singur meci)
    summonersPuuid: String, //puuid ul player ului cautat
    queueJson: Array, // un json cu toate queurile
    spellsJson: Object, //un json cu toate spell urile
    runesJson: Object, // un json cu toate runele
  },
  setup() {
    const mainPlayer = reactive({
      poz: null, //pozitia in array a player ului cautat
      queue: null, //queue ul fiecarui meci
      gameDuration: null,
      gameTimeAgo: null,
      kp: 0,
      spellD: null,
      spellF: null,
      runePrimary: null,
      runeSecondary: null,
    });

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
          mainPlayer.spellD = spells[i][1].id;
        }
      }

      for (let j = 0; j < spells.length; j++) {
        if (
          spells[j][1].key ==
          this.match.info.participants[mainPlayer.poz].summoner2Id
        ) {
          mainPlayer.spellF = spells[j][1].id;
        }
      }

      //gasirea Runelor pricipale (main player)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/match_details.scss"; // search_page styles
</style>
