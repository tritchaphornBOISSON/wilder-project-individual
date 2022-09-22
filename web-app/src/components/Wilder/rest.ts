import { HTTPVerb, query, WILDERS_PATH } from "../../services/rest";
import { WilderType } from "../../types";

export const deleteWilderRest = async (id: string): Promise<WilderType> => {
  return query(`${WILDERS_PATH}/${id}`, HTTPVerb.DELETE);
};
