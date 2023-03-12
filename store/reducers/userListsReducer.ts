import {UserListActionTypes} from "../action-types";
import {Character} from "../../models/Character";
import {UserListsAction} from "../actions/UserListsAction";

export interface UserListParams {
    listName: string,
    character: Character
}

interface UserList {
    listName: string,
    characters: Character[]
}

const initialState: Array<UserList> = [];

export const userListsReducer = (state: Array<UserList> = initialState, action: UserListsAction) => {
    let listIndex: number;
    switch (action.type) {
        case UserListActionTypes.ADD_CHARACTER:
        case UserListActionTypes.REMOVE_CHARACTER:
            listIndex = state.findIndex(p => p.listName === action.payload?.listName)
            break;
        case UserListActionTypes.ADD_LIST:
        case UserListActionTypes.REMOVE_LIST:
            listIndex = state.findIndex(p => p.listName === action.payload);
            break;
    }
    let list: Character[];
    let charIndex: number;
    switch (action.type) {
        case UserListActionTypes.ADD_CHARACTER:
            if (listIndex === -1) {
                return [...state, {
                    listName: action.payload?.listName,
                    characters: [action.payload?.character]
                } as UserList];
            }
            list = state[listIndex].characters;
            charIndex = list.findIndex(c => c._id === action.payload?.character._id);
            if (charIndex !== -1) {
                return;
            }
            return [
                ...state.slice(0, listIndex),
                {
                    listName: action.payload?.listName,
                    characters: [
                        ...list,
                        action.payload?.character,
                    ]
                } as UserList,
                ...state.slice(listIndex + 1)
            ];
        case UserListActionTypes.REMOVE_CHARACTER:
            if (listIndex === -1) {
                return state;
            }
            list = state[listIndex].characters;
            charIndex = list.findIndex(c => c._id === action.payload?.character._id);
            if (charIndex === -1) {
                return;
            }
            return [
                ...state.slice(0, listIndex),
                {
                    listName: action.payload?.listName,
                    characters: [
                        ...list.slice(0, charIndex),
                        ...list.slice(charIndex + 1)
                    ]
                } as UserList,
                ...state.slice(listIndex + 1)
            ];
        case UserListActionTypes.ADD_LIST:
            if (listIndex !== -1) {
                return state;
            }
            return [...state, {listName: action.payload, characters: []} as UserList];
        case UserListActionTypes.REMOVE_LIST:
            if (listIndex === -1) {
                return state;
            }
            return [...state.slice(0, listIndex), ...state.slice(listIndex + 1)];
        default:
            return state;
    }
}