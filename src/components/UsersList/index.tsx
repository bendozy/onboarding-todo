import React, { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import Spinner from '../Spinner';
import User from '../User';

type UserListProps = {
  users: IUser[];
  isLoading: boolean;
  defaultUserId?: number;
};

const UserList = ({ users, isLoading, defaultUserId }: UserListProps) => {
  let navigate = useNavigate();

  const handleChange = (event: ChangeEvent) =>
    navigate(`/users/${(event.target as HTMLInputElement).value}`);

  return (
    <div className="bg-white h-full rounded-2xl pb-12 col-span-1">
      <div className="flex items-start p-4 lg:pl-8  lg:pb-0 font-semibold">
        Users
      </div>

      {isLoading && <Spinner />}

      {!isLoading && (
        <>
          <div className="md:hidden px-4">
            <select
              id="tabs"
              name="tabs"
              className=" w-full text-base border border-gray-300 h-10 rounded-md"
              defaultValue={defaultUserId}
              onChange={handleChange}>
              {users.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <nav className="mt-6 hidden lg:block">
            {users.map((user) => (
              <User
                key={user.id}
                user={user}
                isDefaultUser={user.id === defaultUserId}
              />
            ))}
          </nav>
        </>
      )}
    </div>
  );
};

export default UserList;
