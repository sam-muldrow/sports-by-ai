window.addEventListener("DOMContentLoaded", (event) => {
    auth0.createAuth0Client({
        domain: "code-collab.auth0.com",
        clientId: "SzAQ0PlLeflcLFhYWzwKXrJP3CXQ74pR",
        authorizationParams: {
          redirect_uri: window.location.origin
        }
      }).then(async (auth0Client) => {
        // Assumes a button with id "login" in the DOM
        const loginButton = document.getElementById("login");
      
        loginButton.addEventListener("click", (e) => {
          e.preventDefault();
          auth0Client.loginWithRedirect();
        });
      
        if (location.search.includes("state=") && 
            (location.search.includes("code=") || 
            location.search.includes("error="))) {
          await auth0Client.handleRedirectCallback();
          window.history.replaceState({}, document.title, "/");
        }
      });
  });
