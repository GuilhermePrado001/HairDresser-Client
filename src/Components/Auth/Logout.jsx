import { Spin } from "antd";
import React from "react";
import { AuthConsumer } from "../../Context/AuthContext";

export const Logout = () => (
  <AuthConsumer>
    {({ logout }) => {
      logout();
      return (
        <div className="loading">
          <Spin size="large" />
        </div>
      );
    }}
  </AuthConsumer>
);
