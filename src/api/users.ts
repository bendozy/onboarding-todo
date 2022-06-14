export const getUsers = async (): Promise<IUser[]> => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users`);

  const users: IUser[] = await response.json();

  return users;
};
