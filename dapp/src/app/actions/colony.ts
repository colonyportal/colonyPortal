import { getDomainCount  } from "../integrations/colony";

export const FETCH_DOMAIN_COUNT = "GET_DOMAIN_COUNT";
export const SET_DOMAIN_COUNT = "SET_DOMAIN_COUNT ";

export const setDomainCount = (domainCount: number) => ({
  type: SET_DOMAIN_COUNT,
  domainCount
});

export const fetchDomainCount = (colonyAddress: string) => async (
  dispatch: any,
) => {
  const domainCount = await getDomainCount(colonyAddress)
  dispatch(setDomainCount(domainCount));
};
