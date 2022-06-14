import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { classNames } from '../../utils/helper';

type UserProps = {
  user: IUser;
  isDefaultUser: boolean;
};

const User = ({ user: { id, name }, isDefaultUser }: UserProps) => {
  let { pathname } = useLocation();

  return (
    <Link
      className={classNames(
        'w-full font-thin uppercase flex items-center p-4 my-2 transition-colors duration-200 justify-start',
        `/users/${id}` === pathname ||
          (['/', '/users', '/users/'].includes(pathname) && isDefaultUser)
          ? 'text-blue-500 bg-gradient-to-r from-white to-blue-100 border-r-4 border-blue-500'
          : 'text-gray-500 hover:text-blue-500',
      )}
      key={id}
      to={`/users/${id}`}>
      <span className="mx-4 text-sm font-normal">{name}</span>
    </Link>
  );
};

export default User;
