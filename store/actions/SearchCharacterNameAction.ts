import { SearchCharacterNameActionTypes } from "../action-types";

interface FindAction {
    type: SearchCharacterNameActionTypes.FIND,
    payload?: string;
}

interface StopAction {
    type: SearchCharacterNameActionTypes.STOP
}

interface ClearAction {
    type: SearchCharacterNameActionTypes.CLEAR
}

export type SearchCharacterNameAction = FindAction | StopAction | ClearAction;