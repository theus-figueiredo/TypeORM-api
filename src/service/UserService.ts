import md5 from 'md5';
import { AppDataSource } from '../database/data-source';
import { CostCenter } from '../database/entity/CostCenter';
import { Role } from '../database/entity/Role';
import { User } from '../database/entity/User';
import _ from 'lodash';


const userRepository = AppDataSource.getRepository(User);
const costCenterRepository = AppDataSource.getRepository(CostCenter);
const roleRepository = AppDataSource.getRepository(Role);

interface IUser {
  id?: number
  firstName: string
  lastName: string
  email: string
  password?: string
  role?: Role | null
  costCenter?: CostCenter[] | null
};


interface IUserCreate {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};


class UserService {

  private isValidInput(value: string): value is keyof User {
    return value in User;
  };

  private async validateUser(id: number): Promise<User | null> {
    const user = await userRepository.findOne({ where: { id }, relations: ['role', 'costCenter'] });
    if(!user) return null;
    return user;
  }

  private async validateRole(id: number): Promise<Role | null> {
    const role = await roleRepository.findOneBy({ id });
    if(!role) return null;
    return role;
  };


  public async create(data: IUserCreate): Promise<IUser> {
    const newUser = new User();

    newUser.firstName = data.firstName;
    newUser.lastName = data.lastName;
    newUser.email = data.email;
    newUser.password = md5(data.password);
    newUser.role = null;
    newUser.costCenter = null;

    await userRepository.save(newUser);
    return _.omit(newUser, ['password']);
  };


  public async readAll(): Promise<IUser[]> {
    const allUsers = await userRepository.find({ relations: ['role', 'costCenter'] }) as IUser[];
    return allUsers.map((user) => {
      delete user.password;
      return user;
    }); 
  };


  public async readById(id: number): Promise<IUser | null> {
    const user = await userRepository.findOne({ where: { id }, relations: ['role', 'costCenter'] }) as IUser;
    if(!user) return null;

    return _.omit(user, ['password']);
  };


  public async updateUserData(id: number, data: IUser): Promise<IUser | null> {
    const user = await userRepository.findOneBy({ id });
    if(!user) return null;

    for(let [key, newValue] of Object.entries(data)) {
      if(key !== 'password' && key !== 'role' && key !== 'costCenter') {
        if(this.isValidInput(key)) (user as any)[key] = newValue;
      };
    };

    await userRepository.save(user);
    return _.omit(user, ['password']);
  };


  public async delete(id: number): Promise<boolean> {
    const user = await userRepository.findOneBy({ id });
    if(!user) return false;

    await userRepository.delete({ id });
    return true;
  };


  public async assignRole(userId: number, roleId: number): Promise<IUser | null> {
    const user = await userRepository.findOneBy({ id: userId });
    if(!user) return null;

    const role = await roleRepository.findOneBy({ id: roleId });
    if(!role) return null;

    user.role = role;
    await userRepository.save(user);
    return _.omit(user, ['password']);
  };


  public async removeRole(userId: number): Promise<IUser | null> {
    const user = await this.validateUser(userId);
    if(!user) return null;

    user.role = null;
    await userRepository.save(user);
    return _.omit(user, ['password']);
  };


  public async asignCostCenter(userId: number, costCenterIds: number[]): Promise<IUser | null> {
    const user = await this.validateUser(userId);
    if(!user) return null;

    costCenterIds.forEach(async (id) => {
      const costCenter = await costCenterRepository.findOneBy({ id });
      if(!costCenter) return null;
      user.costCenter?.push(costCenter);
    });

    await userRepository.save(user);
    return _.omit(user, ['password']);
  };


  public async removeCostCenter(userId: number, costCenterIds: number[]): Promise<IUser | null> {
    const user = await this.validateUser(userId);
    if(!user) return null;

    costCenterIds.forEach(async (id) => {
      const costCenter = await costCenterRepository.findOneBy({ id });
      if(!costCenter) return null;
      const index = user.costCenter?.indexOf(costCenter);
      if(index) user.costCenter?.splice(index, 1);
    });

    await userRepository.save(user);

    return _.omit(user, ['password']);
  };


  public async removeAllCostCenters(userId: number): Promise<IUser | null> {
    const user = await this.validateUser(userId);
    if(!user) return null;

    user.costCenter = [];
    await userRepository.save(user);
    return _.omit(user, ['password']);;
  };


  public async updatePassword(id: number, newPassword: string): Promise<boolean> {
    const user = await this.validateUser(id);
    if(!user) return false;

    user.password = md5(newPassword);
    await userRepository.save(user);
    return true;
  };
};

export default new UserService();
