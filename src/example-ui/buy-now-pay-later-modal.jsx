import { useMasa } from "@masa-finance/masa-react";
import { Modal, Spin } from "antd";
import { useEffect, useMemo, useState } from "react";

export const BuyNowPayLaterModal = ({
  isModalOpen,
  setModalClose,
  neededScore,
}) => {
  const { masa } = useMasa();
  const [creditReports, setCreditReports] = useState(null);
  const [loading, setLoading] = useState(false);
  const loadCreditReports = async () => {
    setLoading(true);
    const cr = await masa?.creditScore.list();
    if (cr.length) {
      setCreditReports(cr);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (masa && isModalOpen) {
      loadCreditReports();
    }
  }, [masa, isModalOpen]);

  const isCreditReportEnough = useMemo(() => {
    if (creditReports?.length) {
      return creditReports[0].metadata.properties.value > neededScore;
    }
  }, [creditReports, neededScore]);

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
            {isCreditReportEnough
              ? "Pay later! we cover your payment for now"
              : "Your credit score is not enough for this NFT to pay later, would you want to try a different wallet"}
          </div>
        )}
      </Modal>
    </>
  );
};
