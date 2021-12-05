const getEndpoints = () => {
  console.log("URL" + baseUrl);

  switch (baseUrl) {
    case "http://localhost:8080":
      return {
        backEndUrl: "http://haircut.brazilsouth.azurecontainer.io",
        identityUrl: "https://haircut.azurewebsites.net",
      };
    default:
      return {
        backEndUrl: "http://haircut.brazilsouth.azurecontainer.io",
        identityUrl: "https://haircut.azurewebsites.net",
      };
  }
};

const getOidcConfig = () => {
  switch (baseUrl) {
    case "http://localhost:8080":
      return {
        authority: "https://haircut.azurewebsites.net",
        client_id: "hairApp",
        redirect_uri: "http://localhost:8080/signin-oidc",
        scope: "openid profile roles isAdmin",
        post_logout_redirect_uri: "http://localhost:8080/logout/callback",
        silent_redirect_uri: "http://localhost:8080/silentrenew",
      };
    default:
      break;
  }
};

export const baseUrl = `${window.location.protocol}//${window.location.host}`;
export const backEndUrl = getEndpoints().backEndUrl;
export const identityUrl = getEndpoints().identityUrl;
export const authority = getOidcConfig().authority;
export const client_id = getOidcConfig().client_id;
export const redirect_uri = getOidcConfig().redirect_uri;
export const scope = getOidcConfig().scope;
export const post_logout_redirect_uri =
  getOidcConfig().post_logout_redirect_uri;
export const silent_redirect_uri = getOidcConfig().silent_redirect_uri;
