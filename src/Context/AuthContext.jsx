import React, { Component } from "react";
import AuthService from "../Services/Auth/AuthService";

export const AuthContext = React.createContext({
  getUser: () => ({}),
  signinRedirectCallback: () => ({}),
  logout: () => ({}),
  signoutRedirectCallback: () => ({}),
  isAuthenticated: () => ({}),
  signinRedirect: () => ({}),
  signinSilentCallback: () => ({}),
  createSigninRequest: () => ({}),
});

export const AuthConsumer = AuthContext.Consumer;

export class AuthProvider extends Component {
  authService;
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }

  render() {
    return (
      <AuthContext.Provider value={this.authService}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
