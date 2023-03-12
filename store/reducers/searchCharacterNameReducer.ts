import {SearchCharacterNameAction} from "../actions/SearchCharacterNameAction";
import {SearchCharacterNameActionTypes} from "../action-types";

export type SearchCharacterParams = {
    name: string,
    isSearched: boolean
};

const initialState : SearchCharacterParams = {
    name: '',
    isSearched: false
};

export const searchCharacterNameReducer = (state: SearchCharacterParams = initialState, action: SearchCharacterNameAction) => {
    switch (action.type) {
        case SearchCharacterNameActionTypes.FIND:
            return {
                name: action.payload!,
                isSearched: false
            } as SearchCharacterParams;
        case SearchCharacterNameActionTypes.STOP:
            return  {
                name: state.name,
                isSearched: true
            } as SearchCharacterParams;
        case SearchCharacterNameActionTypes.CLEAR:
            return initialState;
        default:
            return state;
    }
}