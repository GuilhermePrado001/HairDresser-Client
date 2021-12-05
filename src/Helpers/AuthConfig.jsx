import {
  authority,
  client_id,
  redirect_uri,
  post_logout_redirect_uri,
  silent_redirect_uri,
  scope,
} from "./globalConfig";

export const IDENTITY_CONFIG = {
  authority: authority, //(string): The URL of the OIDC provider.
  client_id: client_id, //(string): Your client application's identifier as registered with the OIDC provider.
  redirect_uri: redirect_uri, //The URI of your client application to receive a response from the OIDC provider.
  loadUserInfo: true, //(boolean, default: true): Flag to control if additional identity data is loaded from the user info endpoint in order to populate the user's profile.
  response_type: "code", //(string, default: 'id_token'): The type of response desired from the OIDC provider.
  scope: scope, //(string, default: 'openid'): The scope being requested from the OIDC provider.
  post_logout_redirect_uri: post_logout_redirect_uri,
  automaticSilentRenew: true,
  silent_redirect_uri: silent_redirect_uri,
  //userStore: new WebStorageStateStore({ store: window.localStorage })
};
