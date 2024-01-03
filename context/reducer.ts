import { PostProps } from '../components/Post';

interface Filter {
  filter: null | string;
  filteredList: PostProps[];
};

export interface TODOSState {
  todos: PostProps[];
  filter: null | string;
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
  payload: Filter;
};

export type Action = SetFilter | SetPosts;

export const actionCreators = {
  setPosts: (todos: PostProps[]): SetPosts => ({
    type: ActionsTypes.SET_TODOS,
    payload: todos
  }),
  setFilter: (filter: Filter): SetFilter => ({
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
        const { filter, filteredList } = action.payload
        return { ...state, filter: filter, filterResult: filteredList }
      }
      default: {
        return state;
      }
    }
  }
