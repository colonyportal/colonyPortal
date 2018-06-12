import * as React from "react";
import { SFC } from "react";

type Props = {
  count: number;
  setAddress: (address: string) => any;
  getCount: () => any;
};

export const ColonyTest: SFC<Props> = ({ count, setAddress, getCount }) => (
  <div>
    <h1>Count is: ${count}</h1>
    <button onClick={() => setAddress("")}> setAddress </button>
    <button onClick={() => getCount()}> setAddress </button>
  </div>
);
