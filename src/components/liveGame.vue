<template>
<div class="live">
    <div v-if="data.live">
        <div>{{this.regionLive}} {{this.accountIdLive.id}} {{data.live}}</div>
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
export default {
    name:'liveGame',
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

        &_notfound {
            padding: .5rem;

            span {
                color: var(--color-win);
            }
        }
    }

</style>