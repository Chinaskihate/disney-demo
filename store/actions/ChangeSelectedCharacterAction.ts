import { ChangeSelectedCharacterActionTypes } from "../action-types";
import {Character} from "../../models/Character";

interface SetCharacterAction {
    type: ChangeSelectedCharacterActionTypes.SET,
    payload?: Character;
}

export type ChangeSelectedCharacterAction = SetCharacterAction;