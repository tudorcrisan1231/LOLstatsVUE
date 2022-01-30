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

//LEAGUE-V4    date despre rank dupa summoner id

app.get("/league-v4/:region/:summonerID", async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");

  const summonerID = request.params.summonerID;
  const region = request.params.region;
  //console.log(summonerID);

  axios(
    `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerID}?api_key=${api_key}`
  ).then((res) => {
    response.send(res.data);
    console.log(res.data);
  });
});

//MATCH-V5    match history (match id)

app.get("/match-history-v5/:region/:puuid", async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");

  const puuid = request.params.puuid;
  const region = request.params.region;
  //console.log(summonerID);

  axios(
    `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${api_key}`
  ).then((res) => {
    response.send(res.data);
    //console.log(res.data);
  });
});

//MATCH-V5    match data (by match id)

app.get("/match-data-v5/:region/:matchID", async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");

  const matchID = request.params.matchID;
  const region = request.params.region;
  //console.log(summonerID);

  axios(
    `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=${api_key}`
  ).then((res) => {
    response.send(res.data);
    //console.log(res.data);
  });
});




//SPECTATOR-V4   live game data


app.get("/spectator-v4/:region/:summonerID", async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");

  const summonerID = request.params.summonerID;
  const region = request.params.region;
  //console.log(summonerID);

  axios(
    `https://${region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerID}?api_key=${api_key}`
  ).then((res) => {
    response.send(res.data);
    //console.log(res.data);
  });
});


//MATCH-V5 TIMELINE
app.get("/timeline/:region/:gameID", async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");

  const gameID = request.params.gameID;
  const region = request.params.region;
  //console.log(gameID);

  axios(
    `https://${region}.api.riotgames.com/lol/match/v5/matches/${gameID}/timeline?api_key=${api_key}`
  ).then((res) => {
    response.send(res.data);
    //console.log(res.data);
  });
});

//

//CHAMPION-MASTERY-V4 champs points
app.get("/champs_points/:region/:summonerID", async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");

  const summonerID = request.params.summonerID;
  const region = request.params.region;
  //console.log(gameID);

  axios(
    `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerID}?api_key=${api_key}`
  ).then((res) => {
    response.send(res.data);
    //console.log(res.data);
  });
});

//

//Champs data from ID (communitydragon)
app.get("/champ_data/:champID", async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");

  const champID = request.params.champID;
  //console.log(gameID);

  axios(
    `http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champions/${champID}.json`
  ).then((res) => {
    response.send(res.data);
    //console.log(res.data);
  });
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
