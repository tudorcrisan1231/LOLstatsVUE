<template>
  <div class="ranks">
    <div>
      <div class="ranks_rank" v-if="this.rank_solo">
        <div class="ranks_rank_img">
          <img
            :src="require('../assets/' + this.rank_solo.tier + '.png')"
            alt=""
          />
        </div>
        <div class="ranks_rank_text">
          <h3 class="ranks_rank_title">Ranked SOLO/DUO</h3>
          <p style="color: rgb(32, 178, 170)">
            {{ this.rank_solo.tier }} {{ this.rank_solo.rank }}
          </p>
          <p>
            {{ this.rank_solo.leaguePoints }}LP /
            <span class="ranks_rank_color"
              >{{ this.rank_solo.wins }}W {{ this.rank_solo.losses }}L</span
            >
          </p>
          <p class="ranks_rank_color">
            Win ratio:
            {{
              (
                (parseInt(this.rank_solo.wins) /
                  (parseInt(this.rank_solo.wins) +
                    parseInt(this.rank_solo.losses))) *
                100
              ).toFixed(0)
            }}%
          </p>
        </div>
      </div>
      <div v-else>
        <div class="ranks_rank">
          <div class="ranks_rank_img">
            <img src="../assets/unranked.png" alt="unranked" />
          </div>
          <div class="ranks_rank_text">
            <h3 class="ranks_rank_title">Ranked SOLO/DUO</h3>
            <p style="color: rgb(32, 178, 170)">UNRANKED</p>
          </div>
        </div>
      </div>

      <div class="ranks_rank" v-if="this.rank_flex">
        <div class="ranks_rank_img">
          <img
            :src="require('../assets/' + this.rank_flex.tier + '.png')"
            alt=""
          />
        </div>
        <div class="ranks_rank_text">
          <h3 class="ranks_rank_title">Ranked FLEX</h3>
          <p style="color: rgb(32, 178, 170)">
            {{ this.rank_flex.tier }} {{ this.rank_flex.rank }}
          </p>
          <p>
            {{ this.rank_flex.leaguePoints }}LP /
            <span class="ranks_rank_color"
              >{{ this.rank_flex.wins }}W {{ this.rank_flex.losses }}L</span
            >
          </p>
          <p class="ranks_rank_color">
            Win ratio:
            {{
              (
                (parseInt(this.rank_flex.wins) /
                  (parseInt(this.rank_flex.wins) +
                    parseInt(this.rank_flex.losses))) *
                100
              ).toFixed(0)
            }}%
          </p>
        </div>
      </div>
      <div v-else>
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
  </div>
</template>

<script>
export default {
  name: "ranks",
  props: {
    rank_solo: Object,
    rank_flex: Object,
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
