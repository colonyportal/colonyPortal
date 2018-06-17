import { TasksActions } from 'app/actions/tasks';

const initialState = {
  tasks: [],
};

//TODO: this should be replaced by talking to Colony and get all tasks
const fakeColonyTasks = {
  'front-end': [
    {
      cancelled: false,
      domainId: 1,
      finalized: true,
      id: 1,
      skillId: 42,
      specificationHash: '2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b',
    },
    {
      cancelled: false,
      domainId: 1,
      finalized: false,
      id: 2,
      skillId: 42,
      specificationHash: '2cc80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b',
    },
  ],
  'back-end': [
    {
      cancelled: false,
      domainId: 2,
      finalized: true,
      id: 3,
      skillId: 24,
      specificationHash: '2dd80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b',
    },
    {
      cancelled: false,
      domainId: 2,
      finalized: false,
      id: 4,
      skillId: 24,
      specificationHash: '2ee80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b',
    },
  ],
  'wireframe': [],
  'ux analytic': [],
}

export const tasksReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case TasksActions.Type.LOAD_TASKS:
      return Object.assign({}, state, { tasks: fakeColonyTasks });
    default:
      return state;
  }
};
