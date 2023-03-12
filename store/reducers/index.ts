import { combineReducers } from "redux";
import {searchCharacterNameReducer} from "./searchCharacterNameReducer";
import {pageNumberReducer} from "./pageNumberReducer";
import {changeSelecterCharacterReducer} from "./changeSelecterCharacterReducer";
import {commentsReducer} from "./commentsReducer";
import {userListsReducer} from "./userListsReducer";
import {selectedListReducer} from "./selectedListReducer";

export const rootReducer = combineReducers({
    searchCharacter: searchCharacterNameReducer,
    pageNumber: pageNumberReducer,
    character: changeSelecterCharacterReducer,
    comments: commentsReducer,
    userLists: userListsReducer,
    selectedList: selectedListReducer
})

export type RootState = ReturnType<typeof rootReducer>;