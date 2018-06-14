import { createAction } from 'redux-actions';

export namespace LoginActions {
  export enum Type {
    SET_USER_AS_LOGGED_IN = 'SET_USER_AS_LOGGED_IN',
  }

  export const addTodo = createAction(Type.SET_USER_AS_LOGGED_IN);
}

export type LoginActions = Omit<typeof LoginActions, 'Type'>;
