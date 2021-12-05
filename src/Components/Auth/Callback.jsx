import { Spin } from "antd";
import React from "react";
import { AuthConsumer } from "../../Context/AuthContext";

export const Callback = () => (
  <AuthConsumer>
    {({ signinRedirectCallback }) => {
      signinRedirectCallback();
      return (
        <div className="loading">
          <Spin size="large" />
        </div>
      );
    }}
  </AuthConsumer>
);
