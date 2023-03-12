import {SelectedListActionTypes} from "../action-types";

interface SelectAction {
    type: SelectedListActionTypes.SELECT,
    payload?: string;
}

interface ClearAction {
    type: SelectedListActionTypes.CLEAR
}

export type ChangeSelectedListAction = SelectAction | ClearAction;