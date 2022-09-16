import { query, WILDERS_PATH } from "../../services/rest"

export const createWilder = async (firstName, lastName) => {
    return query(WILDERS_PATH, 'POST', { firstName, lastName });
}