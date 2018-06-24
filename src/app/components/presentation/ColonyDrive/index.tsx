import * as React from "react";

type Props = {
  
};

const Drive: React.SFC<Props> = () => {
  return (
    <>
      <h1>Colony Drive (Coming Soon)</h1>
      <ul>
        <li>Decentralized file storage (ideally with permissions, we have an idea)</li>
        <li>Collaboration supported via versioning, locking, and ID mapping</li>
        <li>Ensure the Colony's files are always kept online</li>
      </ul>
    </>
  );
};

export default Drive;
