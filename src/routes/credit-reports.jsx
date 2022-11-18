import { useMasa } from "@masa-finance/masa-react";
import { Button, Spin, Table } from "antd";
import { useEffect, useMemo, useState } from "react";

export const CreditReports = () => {
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
    if (masa) {
      loadCreditReports();
    }
  }, [masa]);

  const tableData = useMemo(() => {
    if (creditReports) {
      return creditReports.map((cr) => {
        return {
          score: cr.metadata.properties.value,
          rating: cr.metadata.properties.value_rating,
          tokenId: cr.metadata.properties.tokenId,
          identityId: cr.metadata.properties.identityId,
        };
      });
    }
  }, [creditReports]);

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
      <div className="credit-reports-header">
        <Button onClick={loadCreditReports}>Reload Credit Reports</Button>
      </div>
      {!loading && creditReports ? (
        <Table dataSource={tableData} columns={columns} />
      ) : (
        <div className="loading-container">
          <Spin />
        </div>
      )}
    </div>
  );
};
