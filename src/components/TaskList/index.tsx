import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getUserTasks, updateUserTask } from '../../api/tasks';
import Spinner from '../Spinner';
import Task from '../Task';

type TaskListProps = {
  defaultUserId?: number;
};

const TaskList = ({ defaultUserId }: TaskListProps) => {
  const [isTaskLoading, setIsTaskLoading] = useState<boolean>(true);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const params = useParams<{ userId: string }>();

  const userId: number | null = useMemo(() => {
    if (params?.userId && !isNaN(parseInt(params.userId, 10))) {
      return parseInt(params.userId, 10);
    } else if (!params?.userId && defaultUserId) {
      return defaultUserId;
    } else {
      return null;
    }
  }, [params?.userId, defaultUserId]);

  const fetchUserTasks = async (userId: number) => {
    try {
      const userTasks = await getUserTasks(userId);

      setTasks(userTasks);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTaskLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserTasks(userId);
    }
  }, [userId]);

  const handleCompleteTask = async (task: ITask) => {
    const updatedTask = await updateUserTask({ ...task, completed: true });

    setTasks((previousTasks) =>
      previousTasks.map((currentTask) => {
        if (currentTask.id === updatedTask.id) {
          return updatedTask;
        }

        return currentTask;
      }),
    );
  };

  return (
    <div className="rounded-2xl bg-white">
      <p className="font-bold text-3xl p-4 text-black">Task List</p>

      {isTaskLoading && <Spinner />}

      {!isTaskLoading && (
        <ul>
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onComplete={
                task.completed ? undefined : () => handleCompleteTask(task)
              }
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
