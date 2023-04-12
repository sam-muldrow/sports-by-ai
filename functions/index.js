const functions = require("firebase-functions");
const nba = require('nba-api-client');


exports.getPlayerInfo = functions.https.onRequest(async (req, res) => {
    // Get player id from request body
    const playerId = req.body.PlayerID
    // initialize response object
    let responseObject = {};

    // Grab info from the API
    const playerInfo = await nba.infographicFanduelPlayer({PlayerID: playerId});
    const playerStats = await nba.playerStats({PlayerID: playerId});
    const playerPhoto = await nba.getPlayerHeadshotURL({PlayerID: playerId});

    responseObject['playerInfo'] = playerInfo;
    responseObject['playerStats'] = playerStats;
    responseObject['playerPhoto'] = playerPhoto;

    // Send object back to user
    res.json(responseObject);
});