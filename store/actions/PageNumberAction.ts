import { PageNumberActionTypes } from "../action-types";

interface NextAction {
    type: PageNumberActionTypes.NEXT,
    payload?: string;
}

interface PreviousAction {
    type: PageNumberActionTypes.PREVIOUS
}

export type PageNumberAction = NextAction | PreviousAction;