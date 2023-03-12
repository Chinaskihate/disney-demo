import {CommentActionTypes} from "../action-types";
import {CommentParams} from "../reducers/commentsReducer";

interface CommentInterface {
    type: CommentActionTypes.COMMENT,
    payload?: CommentParams;
}

export type CommentAction = CommentInterface;