import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getUsers } from '../../api/users';
import NotFound from '../NotFound';
import TaskList from '../TaskList';
import UserList from '../UsersList';

const App = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const defaultUserId = users?.[0]?.id;

  const fetchUsers = async () => {
    try {
      const allUsers = await getUsers();

      setUsers(allUsers);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="bg-gray-100 rounded-2xl h-screen flex flex-col w-full p-4">
      <header className="w-full flex justify-center bg-white items-center h-16 rounded-2xl mb-4 p-4">
        <div className="font-bold text-4xl">Onboarding Tasks</div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 space-y-4 lg:space-y-0 lg:space-x-4">
        <UserList
          users={users}
          isLoading={isLoading}
          defaultUserId={defaultUserId}
        />
        <div className="col-span-1 lg:col-span-4">
          <Routes>
            <Route path="/">
              <Route
                index
                element={<TaskList defaultUserId={defaultUserId} />}
              />
              <Route
                path="users"
                element={<TaskList defaultUserId={defaultUserId} />}>
                <Route path=":userId" element={<TaskList />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
