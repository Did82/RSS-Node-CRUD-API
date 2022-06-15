import { IUser } from '../users/usersModel';

const validateUser = (user: IUser): boolean => {
  if (!user.username || !user.age || !user.hobbies) {
    return false;
  }
  if (typeof user.username !== 'string' || typeof user.age !== 'number') {
    return false;
  }
  return !(!Array.isArray(user.hobbies) || !user.hobbies.every((hobby) => typeof hobby === 'string'));
};

export default validateUser;
