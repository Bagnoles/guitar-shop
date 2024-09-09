import { SortDirection, SortType } from "../modules/guitar/guitar.const.js";

export type RequestQuery = {
    limit?: number;
    page?: number;
    sort?: SortType;
    sortDirection?: SortDirection;
}