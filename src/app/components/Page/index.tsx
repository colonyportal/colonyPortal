import * as React from "react";
import Nav from "../Nav";

type Props = {
  colonyAddress: string;
};

const Page: React.SFC<Props> = (props: any) => (
  <>
    <Nav colonyAddress={props.colonyAddress} />
    <div className="mx-auto" style={{ maxWidth: "2000px" }}>
      {props.children}
    </div>
  </>
);

export default Page;
