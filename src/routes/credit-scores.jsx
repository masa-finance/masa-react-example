import { useMasa } from "@masa-finance/masa-react";
import { Button, Spin, Table } from "antd";
import { useMemo } from "react";

export const CreditScores = () => {
  const { creditScores, isCreditScoresLoading, reloadCreditScores } = useMasa();

  const tableData = useMemo(() => {
    if (creditScores) {
      return creditScores.map((creditScore) => {
        return {
          score: creditScore.metadata.properties.value,
          rating: creditScore.metadata.properties.value_rating,
          tokenId: creditScore.metadata.properties.tokenId,
          identityId: creditScore.metadata.properties.identityId,
        };
      });
    }
  }, [creditScores]);

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
        <Button onClick={reloadCreditScores}>Reload Credit Scores</Button>
      </div>
      {!isCreditScoresLoading && creditScores ? (
        <Table dataSource={tableData} columns={columns} />
      ) : (
        <div className="loading-container">
          <Spin />
        </div>
      )}
    </div>
  );
};
