<template>
  <div class="match">
    <div v-if="mainPlayer.poz != null">
      <div
        :class="match.info.participants[mainPlayer.poz].win ? 'win' : 'lose'"
      >
        <p>{{ match.info.participants[mainPlayer.poz].championName }}</p>
        <p>{{ mainPlayer.queue }}</p>
        <p v-if="match.info.participants[mainPlayer.poz].win">Win</p>
        <p v-else>Defeat</p>
        <p v-if="mainPlayer.gameDuration">{{ mainPlayer.gameDuration }}</p>
        <p>{{ mainPlayer.gameTimeAgo }} ago</p>

        <img
          :src="
            'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/' +
            match.info.participants[mainPlayer.poz].championId +
            '.png'
          "
          alt="champ img"
        />

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
  },
  setup() {
    const mainPlayer = reactive({
      poz: null, //pozitia in array a player ului cautat
      queue: null, //queue ul fiecarui meci
      gameDuration: null,
      gameTimeAgo: null,
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

    return {
      mainPlayer,
      getMainPlayer,
      getTime,
      msToTime,
    };
  },
  mounted() {
    this.getMainPlayer();
    this.getTime();
    this.msToTime(new Date().getTime() - this.match.info.gameEndTimestamp);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.match {
  padding: 0.5rem 1rem 0.5rem 1rem;

  &_items {
    display: flex;
  }
}
.win {
  background-image: linear-gradient(
    to left,
    rgba(32, 178, 170, 0.7),
    rgba(32, 178, 170, 0.1)
  );
  border-left: 1px solid rgb(32, 178, 170);
  height: auto;
  padding: 0.5rem;
}
.lose {
  background-image: linear-gradient(
    to left,
    rgba(240, 128, 128, 0.7),
    rgba(240, 128, 128, 0.1)
  );
  border-left: 1px solid rgb(240, 128, 128);
  height: auto;
  padding: 0.5rem;
}
</style>
