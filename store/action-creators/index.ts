import {SearchCharacterNameAction} from "../actions/SearchCharacterNameAction";
import {Dispatch} from "redux";
import {
    ChangeSelectedCharacterActionTypes,
    CommentActionTypes,
    PageNumberActionTypes,
    SearchCharacterNameActionTypes,
    SelectedListActionTypes,
    UserListActionTypes
} from "../action-types";
import {PageNumberAction} from "../actions/PageNumberAction";
import {Character} from "../../models/Character";
import {ChangeSelectedCharacterAction} from "../actions/ChangeSelectedCharacterAction";
import {CommentAction} from "../actions/CommentAction";
import {CommentParams} from "../reducers/commentsReducer";
import {UserListParams} from "../reducers/userListsReducer";
import {UserListsAction} from "../actions/UserListsAction";
import {ChangeSelectedListAction} from "../actions/ChangeSelectedListAction";

export const searchCharacterByName = (searchName: string) => {
    return (dispatch: Dispatch<SearchCharacterNameAction>) => {
        dispatch({
            type: SearchCharacterNameActionTypes.FIND,
            payload: searchName
        })
    }
}

export const stopSearchCharacterByName = () => {
    return (dispatch: Dispatch<SearchCharacterNameAction>) => {
        dispatch({
            type: SearchCharacterNameActionTypes.STOP
        })
    }
}

export const clearSearchCharacterByName = () => {
    return (dispatch: Dispatch<SearchCharacterNameAction>) => {
        dispatch({
            type: SearchCharacterNameActionTypes.CLEAR
        })
    }
}

export const goToNextPage = () => {
    return (dispatch: Dispatch<PageNumberAction>) => {
        dispatch({
            type: PageNumberActionTypes.NEXT
        })
    }
}

export const goToPreviousPage = () => {
    return (dispatch: Dispatch<PageNumberAction>) => {
        dispatch({
            type: PageNumberActionTypes.PREVIOUS
        })
    }
}

export const setSelectedCharacter = (character: Character) => {
    console.log("SET SELECTED CHAR ACTION --- DATA: ")
    console.log(character);
    return (dispatch: Dispatch<ChangeSelectedCharacterAction>) => {
        dispatch({
            type: ChangeSelectedCharacterActionTypes.SET,
            payload: character
        })
    }
}

export const comment = (params: CommentParams) => {
    return (dispatch: Dispatch<CommentAction>) => {
        dispatch({
            type: CommentActionTypes.COMMENT,
            payload: params
        })
    }
}

export const addCharacterToList = (params: UserListParams) => {
    return (dispatch: Dispatch<UserListsAction>) => {
        dispatch({
            type: UserListActionTypes.ADD_CHARACTER,
            payload: params
        });
    }
}

export const removeCharacterFromList = (params: UserListParams) => {
    return (dispatch: Dispatch<UserListsAction>) => {
        dispatch({
            type: UserListActionTypes.REMOVE_CHARACTER,
            payload: params
        });
    }
}

export const addList = (listName: string) => {
    return (dispatch: Dispatch<UserListsAction>) => {
        dispatch({
            type: UserListActionTypes.ADD_LIST,
            payload: listName
        });
    }
}

export const removeList = (listName: string) => {
    return (dispatch: Dispatch<UserListsAction>) => {
        dispatch({
            type: UserListActionTypes.REMOVE_LIST,
            payload: listName
        });
    }
}

export const selectList = (listName: string) => {
    return (dispatch: Dispatch<ChangeSelectedListAction>) => {
        dispatch({
            type: SelectedListActionTypes.SELECT,
            payload: listName
        });
    }
}

export const clearList = () => {
    return (dispatch: Dispatch<ChangeSelectedListAction>) => {
        dispatch({
            type: SelectedListActionTypes.CLEAR
        });
    }
}