import { HTTPVerb, query, WILDERS_PATH } from "../../services/rest";
import { WilderType } from "../../types";

export const createWilder = async (
  firstName: string,
  lastName: string
): Promise<WilderType> => {
  return query(WILDERS_PATH, HTTPVerb.POST, { firstName, lastName });
};
