import playerData from "../data/playerData.json" assert { type: "json" }
const firstInputEvent = new Event('input', {
    'bubbles': true,
    'cancelable': true
});

window.addEventListener("DOMContentLoaded", (event) => {

    auth0.createAuth0Client({
        domain: "code-collab.auth0.com",
        clientId: "SzAQ0PlLeflcLFhYWzwKXrJP3CXQ74pR",
        authorizationParams: {
          redirect_uri: window.location.origin,
          audience: 'https://sports-by-ai.web.app',
        }
      }).then(async (auth0Client) => {
          

          // Assumes an element with id "profile" in the DOM
          const profileElement = document.getElementById("profile");
        const isAuthenticated = await auth0Client.isAuthenticated();
          if (isAuthenticated) {
            const params = new Proxy(new URLSearchParams(window.location.search), {
              get: (searchParams, prop) => searchParams.get(prop),
          });
          
        } else {
            window.location.replace(
                "https://sports-by-ai.web.app/auth.html"
              );
        }

        
        const userProfile = await auth0Client.getUser();
        const userToken = await auth0Client.getTokenSilently();
        console.log(isAuthenticated);
      
        const searchOptions = {
            includeScore: true
        }
        
        const playerKeys = Object.keys(playerData);
        const fuse = new Fuse(playerKeys, searchOptions);
        
        

        
        function displayPlayerData(data) {
                
            // Define DOM stuff
            // Basic player info
            const playerHeadShotImage = document.getElementById("playerImg");
            const playerNameText = document.getElementById("playerName");
            const playerTeamText = document.getElementById("playerTeam");
            const playerCityText = document.getElementById("playerCity");
            // Player Stats
            const avgPtsTextDiv = document.getElementById("avgPtsText");
            const avgRebTextDiv = document.getElementById("avgRebText");
            const avgAstTextDiv = document.getElementById("avgAstText");
            // MISC Player Info DIVS
            const playerPositionNameSpan = document.getElementById("positionNameSpan");
            const playerCollegeNameSpan = document.getElementById("playerCollegeNameSpan");
            // Define actual data vars <3
        
            const playerInfo = data['playerInfo'];
            const playerStats = data['playerStats'];
            const playerPhoto = data['playerPhoto'];
        
        
            // Set Player image
            playerHeadShotImage.setAttribute("src", playerPhoto);
        
            // Set player and team names
            playerNameText.innerText = playerInfo['CommonPlayerInfo']['DISPLAY_FIRST_LAST'];
            playerTeamText.innerText = playerInfo['CommonPlayerInfo']['TEAM_NAME'];
            playerCityText.innerText = playerInfo['CommonPlayerInfo']['TEAM_CITY'];
        
            // Set stats in table 
            avgPtsTextDiv.innerText = playerInfo['PlayerHeadlineStats']['PTS'];
            avgRebTextDiv.innerText = playerInfo['PlayerHeadlineStats']['REB'];
            avgAstTextDiv.innerText = playerInfo['PlayerHeadlineStats']['AST'];
        
            // Set misc player info in spans
        
            playerPositionNameSpan.innerText = playerInfo['CommonPlayerInfo']['POSITION'];
            playerCollegeNameSpan.innerText = playerInfo['CommonPlayerInfo']['SCHOOL'];
        
        
        
        }
        
        async function getData(url = "", playerId, teamId) {
            document.getElementById("playerImg").setAttribute("src", "./images/Basketball.gif")
            const playerData = JSON.stringify({PlayerID: playerId, TeamID: teamId});
            console.log(playerData);
            const response = await fetch(url, {
                method: "POST", 
                mode: "cors", 
                cache: "no-cache", 
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}`
                },
                body: playerData,
            });
            return response.json();
        }
        
        
        
        function doGetData(evt){
            const playerId = evt.currentTarget.playerId;
            const teamId = evt.currentTarget.teamId;
            
            getData("https://us-central1-sports-by-ai.cloudfunctions.net/getPlayerInfo", playerId, teamId).then((data) => {
                // print out that thang  
                console.log(data); 
                // do the things
                displayPlayerData(data);
            });
        }
        
        const outputDisplayList = document.getElementById("outputDisplayList");
        const searchBar = document.getElementById("searchBar");
        searchBar.addEventListener("input", searchForPlayer);
        

        searchBar.value = "Jayson Tatum";
        searchBar.dispatchEvent(firstInputEvent);
        
        function searchForPlayer(e) {
            outputDisplayList.innerHTML = '';
            const searchInput = e.target.value;
            const result = fuse.search(searchInput).slice(0,11);
            result.forEach(element => {
                let li = document.createElement("li");
                let a = document.createElement("p");
                let playerID = playerData[element.item].PlayerID;
                let teamID = playerData[element.item].TeamID;
                a.addEventListener("click", doGetData, false);
                a.playerId = playerID;
                a.teamId = teamID;
                a.innerHTML = element.item;
                li.appendChild(a);
                outputDisplayList.appendChild(li);
            });
        }
      });
  });
  


window.addEventListener("DOMContentLoaded", (event) => {

});

