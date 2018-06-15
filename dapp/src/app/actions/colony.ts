import { getDomainCount  } from "../integrations/colony";

export const SET_COLONY_ADDRESS = "SET_COLONY_ADDRESS";
export const FETCH_DOMAIN_COUNT = "GET_DOMAIN_COUNT";
export const SET_DOMAIN_COUNT = "SET_DOMAIN_COUNT ";

export const setColonyAddress = (address: string) => ({
  type: SET_COLONY_ADDRESS,
  address
});

export const setDomainCount = (domainCount: number) => ({
  type: SET_DOMAIN_COUNT,
  domainCount
});

export const fetchDomainCount = () => async (
  dispatch: any,
  getState: () => any
) => {
  const domainCount = await getDomainCount(getState().colony.colonyAddress)
  dispatch(setDomainCount(domainCount));
};
