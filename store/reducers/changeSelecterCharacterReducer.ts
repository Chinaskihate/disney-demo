import {ChangeSelectedCharacterActionTypes} from "../action-types";
import {Character} from "../../models/Character";
import {ChangeSelectedCharacterAction} from "../actions/ChangeSelectedCharacterAction";

const initialState : Character = {} as Character;

export const changeSelecterCharacterReducer = (state: Character = initialState, action: ChangeSelectedCharacterAction) => {
    switch (action.type) {
        case ChangeSelectedCharacterActionTypes.SET:
            return action.payload;
        default:
            return state;
    }
}