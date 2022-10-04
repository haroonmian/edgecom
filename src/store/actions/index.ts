import { ActionConstent} from "constants/store";
import { Articles } from "interfaces";


export const setArticles = (payload: Articles[]) => {
    return { type: ActionConstent.SET_ARTICLES, payload }
}