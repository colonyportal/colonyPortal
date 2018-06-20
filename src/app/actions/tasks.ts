import { createAction } from 'redux-actions';
// import { create } from 'domain';
import { createColonyTask } from 'integrations/createTask';

export namespace TasksActions {
  export enum Type {
    LOAD_TASKS = 'LOAD_TASKS',
    CREATE_COLONY_TASK = 'CREATE_COLONY_TASK',
  }

  export const loadTasks = createAction(Type.LOAD_TASKS);
}

export const onClickCreateColonyTask = (taskAttributes: any) => async (
  dispatch: any
) => {
  console.log('------')
  console.log('dispatching')
  console.log('------')
  await createColonyTask(taskAttributes);
};

export type TasksActions = Omit<typeof TasksActions, 'Type'>;
