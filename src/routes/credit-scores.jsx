import { useMasa } from "@masa-finance/masa-react";
import { Button, Spin, Table } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";

export const CreditScores = () => {
  const { masa } = useMasa();
  const [creditScore, setCreditScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadCreditScores = useCallback(async () => {
    setLoading(true);
    setCreditScore(await masa?.creditScore.list());
    setLoading(false);
  }, [masa]);

  useEffect(() => {
    if (masa) {
      void loadCreditScores();
    }
  }, [masa, loadCreditScores]);

  const tableData = useMemo(() => {
    if (creditScore) {
      return creditScore.map((creditScore) => {
        return {
          score: creditScore.metadata.properties.value,
          rating: creditScore.metadata.properties.value_rating,
          tokenId: creditScore.metadata.properties.tokenId,
          identityId: creditScore.metadata.properties.identityId,
        };
      });
    }
  }, [creditScore]);

  const columns = [
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "tokenId",
      dataIndex: "tokenId",
      key: "tokenId",
    },
    {
      title: "identityId",
      dataIndex: "identityId",
      key: "identityId",
    },
  ];

  return (
    <div>
      <div className="credit-scores-header">
        <Button onClick={loadCreditScores}>Reload Credit Scores</Button>
      </div>
      {!loading && creditScore ? (
        <Table dataSource={tableData} columns={columns} />
      ) : (
        <div className="loading-container">
          <Spin />
        </div>
      )}
    </div>
  );
};
