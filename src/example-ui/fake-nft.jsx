import { ShoppingCartOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";

const { Meta } = Card;

export const FakeNFT = ({ open }) => {
  return (
    <Card
      style={{ width: 300 }}
      cover={
        <img
          alt="example"
          src="https://cdn-images-1.medium.com/max/1200/1*ZCRZwfOyGAxtB74CIwhqHg.png"
        />
      }
      actions={[
        <ShoppingCartOutlined key="buy-now-pay-later" onClick={() => open()}/>,
      ]}
    >
      <Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random"/>}
        title="Author"
        description="NFT Description"
      />
    </Card>
  );
};
