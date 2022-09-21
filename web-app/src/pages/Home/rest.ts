import { HTTPVerb, query, WILDERS_PATH } from "../../services/rest";
import { WilderType } from "../../types";

export const fetchWildersRest = async (): Promise<WilderType[]> => {
  return query(WILDERS_PATH, HTTPVerb.GET);
};
