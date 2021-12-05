import { IDENTITY_CONFIG } from "../../Helpers/AuthConfig";
import { UserManager, WebStorageStateStore, Log } from "oidc-client";
import { authority, client_id } from "../../Helpers/globalConfig";

export const hasRole = (user, role) => {
  return user?.profile?.role?.includes(role);
};

export default class AuthService {
  UserManager;

  constructor() {
    this.UserManager = new UserManager({
      ...IDENTITY_CONFIG,
      userStore: new WebStorageStateStore({ store: window.localStorage }),
      response_mode: "query",
    });
    // Logger
    Log.logger = console;
    Log.level = Log.DEBUG;
    this.UserManager.events.addUserLoaded((user) => {
      if (window.location.href.indexOf("signin-oidc") !== -1) {
        this.navigateToScreen();
      }
    });
    this.UserManager.events.addSilentRenewError((e) => {
      console.log("silent renew error", e.message);
    });

    this.UserManager.events.addAccessTokenExpired(() => {
      console.log("token expired");
      this.signinSilent();
    });
  }

  signinRedirectCallback = () => {
    this.UserManager.signinRedirectCallback().then((user) => {});
  };

  getUser = async () => {
    const user = await this.UserManager.getUser();

    // if (!user) {
    //   return await this.UserManager.signinRedirectCallback();
    // }

    return user;
  };

  parseJwt = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  };

  signinRedirect = () => {
    localStorage.setItem("redirectUri", window.location.pathname);
    this.UserManager.signinRedirect({});
  };

  navigateToScreen = () => {
    window.location.replace(localStorage.getItem("redirectUri") ?? "/");
  };

  isAuthenticated = () => {
    const oidcStorage = JSON.parse(
      localStorage.getItem(`oidc.user:${authority}:${client_id}`)
    );

    return !!oidcStorage && !!oidcStorage.access_token;
  };

  signinSilent = () => {
    this.UserManager.signinSilent()
      .then((user) => {
        console.log("signed in", user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  signinSilentCallback = () => {
    this.UserManager.signinSilentCallback();
  };

  createSigninRequest = () => {
    return this.UserManager.createSigninRequest();
  };

  logout = () => {
    this.UserManager.signoutRedirect({
      id_token_hint: localStorage.getItem("id_token"),
    });
    this.UserManager.clearStaleState();
  };

  signoutRedirectCallback = () => {
    this.UserManager.signoutRedirectCallback().then(() => {
      localStorage.clear();
      window.location.replace("/");
    });
    this.UserManager.clearStaleState();
  };
}
