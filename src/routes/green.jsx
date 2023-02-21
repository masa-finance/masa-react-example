import { useMasa } from "@masa-finance/masa-react";
import { Button, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";

export const Green = () => {
  const { masa } = useMasa();
  const [greens, setGreens] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadGreens = useCallback(async () => {
    setLoading(true);
    setGreens(await masa?.green.list());
    setLoading(false);
  }, [masa]);

  useEffect(() => {
    console.log({ greens });
  }, [greens]);

  useEffect(() => {
    if (masa) {
      void loadGreens();
    }
  }, [masa, loadGreens]);

  return (
    <div>
      <div className="credit-scores-header">
        <Button onClick={loadGreens}>Reload Greens</Button>
      </div>
      {!loading && greens ? (
        greens.length > 0 ? (
          greens.map((green) => (
            <>
              <div>TokenId: {green.tokenId.toString()}</div>
              <div>TokenId: {green.tokenUri}</div>
            </>
          ))
        ) : (
          <>no greens on {masa.config.network}</>
        )
      ) : (
        <div className="loading-container">
          <Spin />
        </div>
      )}
    </div>
  );
};
