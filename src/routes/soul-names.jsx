import { useMasa } from "@masa-finance/masa-react";
import { Button, Spin } from "antd";

export const SoulNames = () => {
  const { masa, soulnames, isSoulnamesLoading, reloadSoulnames } = useMasa();

  return (
    <div>
      <div className="credit-scores-header">
        <Button onClick={reloadSoulnames}>Reload Soul Names</Button>
      </div>
      {!isSoulnamesLoading && soulnames ? (
        soulnames.length > 0 ? (
          soulnames.map((soulName) => (
            <div
              key={soulName.tokenUri}
              style={{ display: "inline-block", margin: "2em" }}
            >
              <div>TokenId: {soulName.tokenDetails?.tokenId?.toString()}</div>
              <div>Name: {soulName.metadata.name}</div>

              <img
                alt={soulName.tokenDetails.sbtName}
                width={200}
                src={`https://arweave.net/${soulName.metadata.image
                  .replace("ar://", "")
                  .replace("https://arweave.net/", "")}`}
              />
            </div>
          ))
        ) : (
          <>no soul names on {masa.config.network}</>
        )
      ) : (
        <div className="loading-container">
          <Spin />
        </div>
      )}
    </div>
  );
};
