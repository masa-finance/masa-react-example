import { Col, Row } from "antd";
import { useState } from "react";
import { BuyNowPayLaterModal } from "../example-ui/buy-now-pay-later-modal";
import { FakeNFT } from "../example-ui/fake-nft";

export const BuyNowPayLaterExample = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" span={6}>
          <FakeNFT open={() => setModalOpen(true)}/>
        </Col>
        <Col className="gutter-row" span={6}>
          <FakeNFT open={() => setModalOpen(true)}/>
        </Col>
        <Col className="gutter-row" span={6}>
          <FakeNFT open={() => setModalOpen(true)}/>
        </Col>
        <Col className="gutter-row" span={6}>
          <FakeNFT open={() => setModalOpen(true)}/>
        </Col>
        <Col className="gutter-row" span={6}>
          <FakeNFT open={() => setModalOpen(true)}/>
        </Col>
      </Row>

      <BuyNowPayLaterModal
        isModalOpen={modalOpen}
        neededScore={800}
        setModalClose={() => {
          setModalOpen(false);
        }}
      />
    </>
  );
};
