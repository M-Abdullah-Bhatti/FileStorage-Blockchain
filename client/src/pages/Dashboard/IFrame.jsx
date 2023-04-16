import React from "react";

import { useParams } from "react-router-dom";
const IFrame = () => {
  const { decrypted } = useParams();
  return (
    <iframe
      title="My Content"
      src={`https://gateway.pinata.cloud/ipfs/${decrypted}`}
      style={{ width: "100%", height: "100vh", border: "none" }}
    ></iframe>
  );
};

export default IFrame;
