<template>
  <div id="nav">
    <router-link to="/"></router-link>
    <!--<router-link to="/about"></router-link>-->

    <router-view />
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
html {
  font-size: 62.5%;
  scroll-behavior: smooth;
  overflow-x: hidden;

  @media screen and (max-width: 75em) {
    font-size: 56.25%;
  }

  @media screen and (max-width: 56.25em) {
    font-size: 50%;
  }

  @media screen and (max-width: 37.5em) {
    font-size: 50%;
  }

  @media screen and (min-width: 121.875em) {
    font-size: 65%;
  }
}
body {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  line-height: 1.7;
  overflow-x: hidden;
  box-sizing: border-box;
  color: #fffffe;
}
* {
  margin: 0;
  padding: 0;
}

*,
*::after,
*::before {
  box-sizing: inherit;
}
</style>
