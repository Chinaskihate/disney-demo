import {UserListActionTypes} from "../action-types";
import {UserListParams} from "../reducers/userListsReducer";

interface AddCharacterToListAction {
    type: UserListActionTypes.ADD_CHARACTER,
    payload?: UserListParams;
}

interface RemoveCharacterFromListAction {
    type: UserListActionTypes.REMOVE_CHARACTER,
    payload?: UserListParams;
}

interface AddListAction {
    type: UserListActionTypes.ADD_LIST,
    payload?: string;
}

interface RemoveListAction {
    type: UserListActionTypes.REMOVE_LIST,
    payload?: string;
}


export type UserListsAction =
    AddCharacterToListAction
    | RemoveCharacterFromListAction
    | AddListAction
    | RemoveListAction;