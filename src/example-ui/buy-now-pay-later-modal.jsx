import { useMasa } from "@masa-finance/masa-react";
import { Modal, Spin } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";

export const BuyNowPayLaterModal = ({
  isModalOpen,
  setModalClose,
  neededScore,
}) => {
  const { masa } = useMasa();
  const [creditScores, setCreditScores] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadCreditScores = useCallback(async () => {
    setLoading(true);
    setCreditScores(await masa?.creditScore.list());
    setLoading(false);
  }, [masa]);

  useEffect(() => {
    if (masa && isModalOpen) {
      void loadCreditScores();
    }
  }, [masa, isModalOpen, loadCreditScores]);

  const isCreditScoreEnough = useMemo(() => {
    if (creditScores?.length) {
      return creditScores[0].metadata.properties.value > neededScore;
    }
  }, [creditScores, neededScore]);

  return (
    <>
      <Modal
        title="Buy now pay later"
        open={isModalOpen}
        onOk={setModalClose}
        onCancel={setModalClose}
      >
        {loading ? (
          <Spin />
        ) : (
          <div>
            {isCreditScoreEnough
              ? "Pay later! we cover your payment for now"
              : "Your credit score is not enough for this NFT to pay later, would you want to try a different wallet"}
          </div>
        )}
      </Modal>
    </>
  );
};
