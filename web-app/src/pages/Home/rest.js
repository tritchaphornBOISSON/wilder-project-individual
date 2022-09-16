import { query, WILDERS_PATH } from '../../services/rest';

export const fetchWildersRest = async () => {
    return query(WILDERS_PATH, 'GET');
}