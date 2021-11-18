<template>
  <div class="recent">
    <div>recent summary</div>
  </div>
</template>

<script>
export default {
  name: "recent_summary",
  props: {
    match: Object,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.recent {
  height: 20rem;
}
</style>
