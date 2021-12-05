import { Spin } from "antd";
import React from "react";
import { AuthConsumer } from "../../Context/AuthContext";
export const SilentRenew = () => (
  <AuthConsumer>
    {({ signinSilentCallback }) => {
      signinSilentCallback();
      return (
        <div className="loading">
          <Spin size="large" />
        </div>
      );
    }}
  </AuthConsumer>
);
