import { v4 as uuid } from 'uuid';

export interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

class UsersDb {
  private users: IUser[] = [];

  public addOne(user: IUser) {
    const newUser = { id: uuid(), ...user };
    this.users.push(newUser);
  }
  public async findAll(): Promise<IUser[]> {
    return this.users;
  }
  public findOne(id: string): IUser {
    return this.users.find((user) => user.id === id);
  }
  public updateOne(user: IUser) {
    const index = this.users.findIndex((u) => u.id === user.id);
    this.users[index] = { ...this.users[index], ...user };
  }
  public deleteOne(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}

export default UsersDb;
