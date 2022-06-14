import { mergeTasks } from '../utils/helper';

export const getUserTasks = async (userId: number): Promise<ITask[]> => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/todos?userId=${userId}`,
  );

  const tasks: ITask[] = await response.json();
  const key = `task-${userId}`;

  const savedData = localStorage.getItem(key);

  if (savedData && Array.isArray(JSON.parse(savedData))) {
    const savedTasks = JSON.parse(savedData) as ITask[];

    return mergeTasks(tasks, savedTasks);
  }

  return tasks;
};

export const updateUserTask = async (userTask: ITask): Promise<ITask> => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/todos/${userTask.id}`,
    {
      method: 'PUT',
      body: JSON.stringify(userTask),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  );

  const task: ITask = await response.json();
  const key = `task-${task.userId}`;

  const savedData = localStorage.getItem(key);

  if (savedData && Array.isArray(JSON.parse(savedData))) {
    const savedTasks = JSON.parse(savedData);

    localStorage.setItem(key, JSON.stringify([...savedTasks, task]));
  } else {
    localStorage.setItem(key, JSON.stringify([task]));
  }

  return task;
};
