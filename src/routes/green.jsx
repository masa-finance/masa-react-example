import { useMasa } from "@masa-finance/masa-react";
import { Button, Spin } from "antd";

export const Green = () => {
  const { masa, greens, isGreensLoading, reloadGreens } = useMasa();

  return (
    <div>
      <div className="credit-scores-header">
        <Button onClick={reloadGreens}>Reload Greens</Button>
      </div>
      {!isGreensLoading && greens ? (
        greens.length > 0 ? (
          greens.map((green) => (
            <div key={green.tokenId.toString()}>
              <div>TokenId: {green.tokenId.toString()}</div>
              <div>TokenId: {green.tokenUri}</div>
            </div>
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
