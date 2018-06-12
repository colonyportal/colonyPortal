import * as React from "react";
import { SFC } from "react";

type Props = {
  count: number;
  setAddress: (address: string) => any;
  getCount: () => any;
};

export const ColonyTest: SFC<Props> = ({ count, setAddress, getCount }) => (
  <div>
    <h1>Count is: {count}</h1>
    <button onClick={() => setAddress("0x902967A776b4b1aB5Ad479763e0d0EBF7A86B61B")}> setAddress </button>
    <button onClick={() => getCount()}> getCount </button>
  </div>
);
