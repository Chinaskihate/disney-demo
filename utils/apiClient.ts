import axios from "axios";
import {GetAllResponse} from "./responses/getAllResponse";
import {GetByNameResponse} from "./responses/getByNameResponse";

const config = require("../config/config.json");

export class ApiClient {
    public async searchAllAsync(page: number): Promise<GetAllResponse> {
        try {
            const response = await axios.get<GetAllResponse>(
                this.getAllUrl() + page
            );
            return response.data;
        } catch (error) {
            console.error(error);
        }
        return {} as GetAllResponse;
    }

    public async searchCharacterAsync(name: string): Promise<GetByNameResponse> {
        try {
            const response = await axios.get<GetByNameResponse>(
                this.getSearchUrl() + name
            );
            return response.data;
        } catch (error) {
            console.error(error);
        }
        return {} as GetByNameResponse;
    }

    public getAllUrl(): string {
        return config["ALL_URL"];
    }

    public getSearchUrl(): string {
        return config["BY_NAME_URL"];
    }
}