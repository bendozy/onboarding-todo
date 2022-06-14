export const classNames = (...classes: string[]): string =>
  classes.filter(Boolean).join(' ');

export const mergeTasks = (tasks: ITask[], savedTasks: ITask[]): ITask[] => {
  const taskIdAndIndexMap: Record<number, number> = {};
  const mergedTasks = [...tasks];

  tasks.forEach((task, index) => (taskIdAndIndexMap[task.id] = index));

  savedTasks.forEach((task) => {
    mergedTasks[taskIdAndIndexMap[task.id]] = task;
  });

  return mergedTasks;
};
