import {SelectedListActionTypes} from "../action-types";
import {ChangeSelectedListAction} from "../actions/ChangeSelectedListAction";

const initialState : string | null = null;

export const selectedListReducer = (state: string | null = initialState, action: ChangeSelectedListAction) => {
    switch (action.type) {
        case SelectedListActionTypes.SELECT:
            return action.payload;
        case SelectedListActionTypes.CLEAR:
            return null;
        default:
            return state;
    }
}