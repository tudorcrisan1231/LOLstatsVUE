<template>
  <div class="ranks" v-if="ranks">
    <div
      v-if="
        ranks.length == 2 &&
        ranks[0].queueType == 'RANKED_SOLO_5x5' &&
        ranks[1].queueType == 'RANKED_FLEX_SR'
      "
    >
      <div class="ranks_rank" v-if="ranks[0]">
        <div class="ranks_rank_img">
          <img :src="require('../assets/' + ranks[0].tier + '.png')" alt="" />
        </div>
        <div class="ranks_rank_text">
          <h3 class="ranks_rank_title">Ranked SOLO/DUO</h3>
          <p style="color: rgb(32, 178, 170)">
            {{ ranks[0].tier }} {{ ranks[0].rank }}
          </p>
          <p>
            {{ ranks[0].leaguePoints }}LP /
            <span class="ranks_rank_color"
              >{{ ranks[0].wins }}W {{ ranks[0].losses }}L</span
            >
          </p>
          <p class="ranks_rank_color">
            Win ratio:
            {{
              (
                (parseInt(ranks[0].wins) /
                  (parseInt(ranks[0].wins) + parseInt(ranks[0].losses))) *
                100
              ).toFixed(0)
            }}%
          </p>
        </div>
      </div>
      <div class="ranks_rank">
        <div class="ranks_rank_img">
          <img :src="require('../assets/' + ranks[1].tier + '.png')" alt="" />
        </div>
        <div class="ranks_rank_text">
          <h3 class="ranks_rank_title">Ranked FLEX</h3>
          <p style="color: rgb(32, 178, 170)">
            {{ ranks[1].tier }} {{ ranks[1].rank }}
          </p>
          <p>
            {{ ranks[1].leaguePoints }}LP /
            <span class="ranks_rank_color"
              >{{ ranks[1].wins }}W {{ ranks[1].losses }}L</span
            >
          </p>
          <p class="ranks_rank_color">
            Win ratio:
            {{
              (
                (parseInt(ranks[1].wins) /
                  (parseInt(ranks[1].wins) + parseInt(ranks[1].losses))) *
                100
              ).toFixed(0)
            }}%
          </p>
        </div>
      </div>
    </div>

    <div
      v-else-if="
        ranks.length == 2 &&
        ranks[1].queueType == 'RANKED_SOLO_5x5' &&
        ranks[0].queueType == 'RANKED_FLEX_SR'
      "
    >
      <div class="ranks_rank">
        <div class="ranks_rank_img">
          <img :src="require('../assets/' + ranks[1].tier + '.png')" alt="" />
        </div>
        <div class="ranks_rank_text">
          <h3 class="ranks_rank_title">Ranked SOLO/DUO</h3>
          <p style="color: rgb(32, 178, 170)">
            {{ ranks[1].tier }} {{ ranks[1].rank }}
          </p>
          <p>
            {{ ranks[1].leaguePoints }}LP /
            <span class="ranks_rank_color"
              >{{ ranks[1].wins }}W {{ ranks[1].losses }}L</span
            >
          </p>
          <p class="ranks_rank_color">
            Win ratio:
            {{
              (
                (parseInt(ranks[1].wins) /
                  (parseInt(ranks[1].wins) + parseInt(ranks[1].losses))) *
                100
              ).toFixed(0)
            }}%
          </p>
        </div>
      </div>
      <div class="ranks_rank" v-if="ranks[0]">
        <div class="ranks_rank_img">
          <img :src="require('../assets/' + ranks[0].tier + '.png')" alt="" />
        </div>
        <div class="ranks_rank_text">
          <h3 class="ranks_rank_title">Ranked FLEX</h3>
          <p style="color: rgb(32, 178, 170)">
            {{ ranks[0].tier }} {{ ranks[0].rank }}
          </p>
          <p>
            {{ ranks[0].leaguePoints }}LP /
            <span class="ranks_rank_color"
              >{{ ranks[0].wins }}W {{ ranks[0].losses }}L</span
            >
          </p>
          <p class="ranks_rank_color">
            Win ratio:
            {{
              (
                (parseInt(ranks[0].wins) /
                  (parseInt(ranks[0].wins) + parseInt(ranks[0].losses))) *
                100
              ).toFixed(0)
            }}%
          </p>
        </div>
      </div>
    </div>

    <div
      v-else-if="ranks.length == 1 && ranks[0].queueType == 'RANKED_SOLO_5x5'"
    >
      <div class="ranks_rank" v-if="ranks[0]">
        <div class="ranks_rank_img">
          <img :src="require('../assets/' + ranks[0].tier + '.png')" alt="" />
        </div>
        <div class="ranks_rank_text">
          <h3 class="ranks_rank_title">Ranked SOLO/DUO</h3>
          <p style="color: rgb(32, 178, 170)">
            {{ ranks[0].tier }} {{ ranks[0].rank }}
          </p>
          <p>
            {{ ranks[0].leaguePoints }}LP /
            <span class="ranks_rank_color"
              >{{ ranks[0].wins }}W {{ ranks[0].losses }}L</span
            >
          </p>
          <p class="ranks_rank_color">
            Win ratio:
            {{
              (
                (parseInt(ranks[0].wins) /
                  (parseInt(ranks[0].wins) + parseInt(ranks[0].losses))) *
                100
              ).toFixed(0)
            }}%
          </p>
        </div>
      </div>
      <div class="ranks_rank">
        <div class="ranks_rank_img">
          <img src="../assets/unranked.png" alt="unranked" />
        </div>
        <div class="ranks_rank_text">
          <h3 class="ranks_rank_title">Ranked FLEX</h3>
          <p style="color: rgb(32, 178, 170)">UNRANKED</p>
        </div>
      </div>
    </div>

    <div
      v-else-if="ranks.length == 1 && ranks[0].queueType == 'RANKED_FLEX_SR'"
    >
      <div class="ranks_rank">
        <div class="ranks_rank_img">
          <img src="../assets/unranked.png" alt="unranked" />
        </div>
        <div class="ranks_rank_text">
          <h3 class="ranks_rank_title">Ranked SOLO/DUO</h3>
          <p style="color: rgb(32, 178, 170)">UNRANKED</p>
        </div>
      </div>
      <div class="ranks_rank" v-if="ranks[0]">
        <div class="ranks_rank_img">
          <img :src="require('../assets/' + ranks[0].tier + '.png')" alt="" />
        </div>
        <div class="ranks_rank_text">
          <h3 class="ranks_rank_title">Ranked FLEX</h3>
          <p style="color: rgb(32, 178, 170)">
            {{ ranks[0].tier }} {{ ranks[0].rank }}
          </p>
          <p>
            {{ ranks[0].leaguePoints }}LP /
            <span class="ranks_rank_color"
              >{{ ranks[0].wins }}W {{ ranks[0].losses }}L</span
            >
          </p>
          <p class="ranks_rank_color">
            Win ratio:
            {{
              (
                (parseInt(ranks[0].wins) /
                  (parseInt(ranks[0].wins) + parseInt(ranks[0].losses))) *
                100
              ).toFixed(0)
            }}%
          </p>
        </div>
      </div>
    </div>

    <div v-else-if="ranks.length == 0">
      <div class="ranks_rank">
        <div class="ranks_rank_img">
          <img src="../assets/unranked.png" alt="unranked" />
        </div>
        <div class="ranks_rank_text">
          <h3 class="ranks_rank_title">Ranked SOLO/DUO</h3>
          <p style="color: rgb(32, 178, 170)">UNRANKED</p>
        </div>
      </div>
      <div class="ranks_rank">
        <div class="ranks_rank_img">
          <img src="../assets/unranked.png" alt="unranked" />
        </div>
        <div class="ranks_rank_text">
          <h3 class="ranks_rank_title">Ranked FLEX</h3>
          <p style="color: rgb(32, 178, 170)">UNRANKED</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ranks",
  props: {
    ranks: Object,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.ranks {
  margin-top: 2rem;
  background-color: #242629;
  border: 1px solid rgba(#72757e, 0.2);
  font-size: 1.4rem;
  padding: 1rem 0 1rem 0;

  & > * {
    & > *:not(:last-child) {
      margin-bottom: 1rem;
      border-bottom: 1px solid rgba(#72757e, 0.2);
      padding-bottom: 1rem;
    }
  }

  &_rank {
    display: flex;
    align-items: center;
    padding-left: 1rem;

    &_img {
      margin-right: 1rem;
      img {
        width: 9rem;
        height: 8rem;
        object-fit: cover;
      }
    }

    &_title {
      font-size: 1.5rem;
      color: gray;
    }
    &_color {
      color: gray;
    }
  }
}
</style>
