import React, { useCallback, useMemo } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { useMasa } from "@masa-finance/masa-react";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const masaOptions = {
  scope: ["identity", "credit-score"],
};

export const ExampleLayout = ({ children }) => {
  const { connect, isLoggedIn, walletAddress, masa, identity } = useMasa();
  const navigate = useNavigate();

  const menuItems = useMemo(() => {
    if (isLoggedIn) {
      return [
        {
          key: "credit-scores",
          icon: <div>💵</div>,
          label: "Credit Scores",
        },
        {
          key: "masa-green",
          icon: <div>🟢</div>,
          label: "Masa Green",
        },
        {
          key: "soul-names",
          icon: <div>👻</div>,
          label: "Soul Names",
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
  }, [isLoggedIn]);

  const handleConnect = useCallback(() => {
    connect(masaOptions);
  }, [connect]);

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
          <div>
            <div style={{ lineHeight: "3em" }}>
              <Button type="primary" onClick={handleConnect}>
                {isLoggedIn
                  ? `${walletAddress} (${masa.config.network})`
                  : "Connect your wallet"}
              </Button>
            </div>
            <div style={{ lineHeight: "2em" }}>
              Identity ID: {identity?.identityId?.toString() || ""}
            </div>
          </div>
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
