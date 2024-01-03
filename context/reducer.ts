import { PostProps } from '../components/Post';
type filterType = null | string;

export interface TODOSState {
  todos: PostProps[];
  filter: filterType;
  filterResult: PostProps[];
};

export const INITIAL_STATE: TODOSState = {
  todos: [],
  filter: null,
  filterResult: []
};

export enum ActionsTypes {
  SET_TODOS = 'SET_TODOS',
  SET_FILTER = 'SET_FILTER'
};

interface SetPosts {
  type: ActionsTypes.SET_TODOS;
  payload: PostProps[];
};

interface SetFilter {
  type: ActionsTypes.SET_FILTER;
  payload: filterType;
};

export type Action = SetFilter | SetPosts;

export const actionCreators = {
  setPosts: (todos: PostProps[]): SetPosts => ({
    type: ActionsTypes.SET_TODOS,
    payload: todos
  }),
  setFilter: (filter: filterType): SetFilter => ({
    type: ActionsTypes.SET_FILTER,
    payload: filter
  })
};

export const reducer = (
    state: TODOSState,
    action: Action
  ): TODOSState => {
    switch (action.type) {
      case ActionsTypes.SET_TODOS: {
        return { ...state, todos: action.payload }
      }
      case ActionsTypes.SET_FILTER: {
        return { ...state, filter: action.payload }
      }
      default: {
        return state;
      }
    }
  }
