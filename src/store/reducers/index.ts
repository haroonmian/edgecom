import { InitialStateType, ActionType } from "interfaces";
import { ActionConstent } from "constants/store";

const reducer = (state: InitialStateType, actions: ActionType): InitialStateType => {
  switch (actions.type) {
    case ActionConstent.SET_ARTICLES:
      return {
        ...state,
        articles: actions.payload
      };
    default:
      return state;
  }
};

export default reducer;
