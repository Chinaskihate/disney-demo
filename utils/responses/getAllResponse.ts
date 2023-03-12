import {Character} from "../../models/Character";

export interface GetAllResponse {
    data: Character[];
    count: number;
    totalPages: number;
    previousPage: string;
    nextPage: string;
}