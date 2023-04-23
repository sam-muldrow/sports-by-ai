const functions = require("firebase-functions");
const nba = require('nba-api-client');
const { auth } = require("express-oauth2-jwt-bearer");
const cors = require('cors')({origin: true});

const jwtCheck = auth({
    audience: 'https://sports-by-ai.web.app',
    issuerBaseURL: 'https://code-collab.auth0.com/',
    tokenSigningAlg: 'RS256'
});


exports.getPlayerInfo = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        jwtCheck(req, res, async() => {
            res.set('Access-Control-Allow-Origin', '*');
            // Get player id from request body
            functions.logger.log(req.body);
            let jsonBody = req.body;
            functions.logger.log("Hello from info. Here's an object:", jsonBody);
            const playerId = jsonBody["PlayerID"];
            const teamId = jsonBody["TeamID"];
            functions.logger.log("Hello from info. Here's an string:", teamId);
            //const playerId = '1628369';
            // initialize response object
            let responseObject = {};
            // Grab info from the API
            const playerInfo = await nba.playerInfo({PlayerID: playerId});
            const playerStats = await nba.playerCareerStats({PlayerID: playerId});
            const playerPhoto = await nba.getPlayerHeadshotURL({PlayerID: playerId, TeamID: teamId});
        
            // 
            responseObject['playerInfo'] = playerInfo;
            responseObject['playerStats'] = playerStats;
            responseObject['playerPhoto'] = playerPhoto;
    
            // Send data to user
            res.json(responseObject);
        });
    });
});