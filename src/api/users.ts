export const getUsers = async (): Promise<IUser[]> => {
  const response = await fetch('http://jsonplaceholder.typicode.com/users');

  const users: IUser[] = await response.json();

  return users;
};
