import {Character} from "../../models/Character";

export interface GetByNameResponse {
    data: Character[];
    count: number;
}