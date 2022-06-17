import { v4 as uuid } from 'uuid';

export interface IUser {
  username: string;
  age: number;
  hobbies: string[];
}

export interface IUserDb extends IUser {
  id: string;
}

class UsersDb {
  private users: IUserDb[] = [];

  public addOne(user: IUser) {
    const newUser: IUserDb = { id: uuid(), ...user };
    this.users.push(newUser);
    return newUser;
  }

  public async findAll(): Promise<IUserDb[]> {
    return this.users;
  }

  public findOne(id: string): IUserDb | undefined {
    return this.users.find((user) => user.id === id);
  }

  public updateOne(user: IUser, id: string) {
    const index = this.users.findIndex((u) => u.id === id);
    const newUser: IUserDb = { id, ...user };
    this.users[index] = newUser;
    return newUser;
  }

  public deleteOne(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}

export default UsersDb;
