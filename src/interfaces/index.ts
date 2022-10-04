import { ActionConstent } from "constants/store";

export interface ActionType {
  type: ActionConstent;
  payload?: any;
}

export interface Articles {
  id: string;
  title: string;
  author: string;
  createdAt: string;
}

export interface InitialStateType {
    articles: Articles[];
}
