import { User } from '../database/entity/User';
import { AppDataSource } from '../database/data-source';
import { StringifyOptions } from 'querystring';

const userRepository = AppDataSource.getRepository(User);

// class UserService {
//   public async addNew(firstName: string, lastName: string, email: string, password: string, role: number, )
// }