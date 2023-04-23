window.addEventListener("DOMContentLoaded", (event) => {
    auth0.createAuth0Client({
        domain: "code-collab.auth0.com",
        clientId: "SzAQ0PlLeflcLFhYWzwKXrJP3CXQ74pR",
        authorizationParams: {
          redirect_uri: window.location.origin,
          audience: 'https://sports-by-ai.web.app',
        }
      }).then(async (auth0Client) => {
        
        //const something = await auth0Client.handleRedirectCallback();
        const isAuthenticated = await auth0Client.isAuthenticated();
        const userProfile = await auth0Client.getUser();
        const userToken = await auth0Client.getTokenSilently();
        console.log(userToken);
      
        // Assumes an element with id "profile" in the DOM
        const profileElement = document.getElementById("profile");
      
        if (isAuthenticated) {
        /*  profileElement.style.display = "block";
          profileElement.innerHTML = `
                  <p>${userProfile.name}</p>
                  <img src="${userProfile.picture}" />
                `; */
        } else {
        //  profileElement.style.display = "none";
        }
      });
  });
