<template>
  <div>
      <p>overview</p>
      <p>{{this.matchData.info.gameName}}</p>
  </div>
</template>

<script>
export default {
    name: "overview",  
    props: {
        matchData: Object,
    },
}
</script>

<style>

</style>