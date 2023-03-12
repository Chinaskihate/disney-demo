import {PageNumberActionTypes} from "../action-types";
import {PageNumberAction} from "../actions/PageNumberAction";

const initialState = 1;

export const pageNumberReducer = (state: number = initialState, action: PageNumberAction) => {
    switch (action.type) {
        case PageNumberActionTypes.NEXT:
            return state + 1;
        case PageNumberActionTypes.PREVIOUS:
            return state === 1 ? state : state - 1;
        default:
            return state;
    }
}