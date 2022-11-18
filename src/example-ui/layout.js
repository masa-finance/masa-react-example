import React, { useCallback, useMemo, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { useMasa } from "@masa-finance/masa-react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const masaOptions = {
  scope: ["identity", "credit-report"],
};
export const ExampleLayout = ({ children }) => {
  const { masa, connect, loggedIn, walletAddress } = useMasa();
  const navigate = useNavigate();
  const menuItems = useMemo(() => {
    if (loggedIn) {
      return [
        {
          key: "credit-scores",
          icon: <div>💵</div>,
          label: "Credit Scores",
        },
        {
          key: "buy-now-pay-later",
          icon: <div>🚀</div>,
          label: "Buy now pay later",
        },
      ];
    } else {
      return [
        {
          key: "1",
          icon: <UserOutlined />,
          label: "nav 1",
        },
      ];
    }
  }, [masa, loggedIn]);

  const handleConnect = useCallback(() => {
    connect(masaOptions);
  }, [connect, masaOptions]);

  return (
    <Layout className="masa-layout">
      <Sider trigger={null} collapsible collapsed={false}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onSelect={({ key }) => navigate(key)}
          items={menuItems}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background site-layout-header">
          <div>Masa Example</div>

          <Button type="primary" onClick={handleConnect}>
            {loggedIn ? walletAddress : "Connect your wallet"}
          </Button>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
