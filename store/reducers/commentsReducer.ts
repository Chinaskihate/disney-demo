import {CommentActionTypes} from "../action-types";
import {CommentAction} from "../actions/CommentAction";

export interface CommentParams {
    id: number,
    data: string
}

const initialState: Array<CommentParams> = [];

export const commentsReducer = (state: Array<CommentParams> = initialState, action: CommentAction) => {
    switch (action.type) {
        case CommentActionTypes.COMMENT:
            const index = state.findIndex(p => p.id === action.payload?.id);
            const entity = {
                id: action.payload?.id,
                data: action.payload?.data
            } as CommentParams;
            if (index === -1) {
                return [...state, entity];
            } else {
                return [
                    ...state.slice(0, index),
                    entity,
                    ...state.slice(index + 1)
                ];
            }
        default:
            return state;
    }
}