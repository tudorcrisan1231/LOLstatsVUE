const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();
const axios = require("axios");

const api_key = process.env.API_KEY;

//  CHAMPION-V3   rotatia campionilor free
app.get("/champion-v3", async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  let query = request.query; //parametrii request ului, in cazul acesta doar api_key ul
  query.appid = api_key;

  console.log(query);

  axios(
    `https://eun1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${api_key}`
  ).then((res) => {
    response.send(res.data);
  });
});

//  SUMMONER-V4    statusurile contului ID, accountID, puuid, lvl, iconID  dupa numele contului
app.get("/summoner-v4/:region/:name", async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");

  const name = request.params.name;
  const region = request.params.region;

  axios(
    `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${api_key}`
  ).then((res) => {
    response.send(res.data);
    console.log(res.data);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
