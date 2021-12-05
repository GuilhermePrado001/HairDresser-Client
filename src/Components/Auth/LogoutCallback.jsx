import { Spin } from "antd";
import React from "react";
import { AuthConsumer } from "../../Context/AuthContext";

export const LogoutCallback = () => (
  <AuthConsumer>
    {({ signoutRedirectCallback }) => {
      signoutRedirectCallback();
      return (
        <div className="loading">
          <Spin size="large" />
        </div>
      );
    }}
  </AuthConsumer>
);
