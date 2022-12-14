import { AppDataSource } from '../database/data-source';
import { CostCenter } from '../database/entity/CostCenter';
import { Role } from '../database/entity/Role';
import { User } from '../database/entity/User';


const userRepository = AppDataSource.getRepository(User);
const costCenterRepository = AppDataSource.getRepository(CostCenter);
const roleRepository = AppDataSource.getRepository(Role);

interface IUser {
  id?: number
  firstName: string
  lastName: string
  email: string
  password: string
  role?: Role
  costCenter?: CostCenter[]
};

class UserService {

  private isValidInput(value: string): value is keyof User {
    return value in User;
  };

  private async validateUser(id: number): Promise<User | null> {
    const user = await userRepository.findOneBy({ id });
    if(!user) return null;
    return user;
  }

  private async validateRole(id: number): Promise<Role | null> {
    const role = await roleRepository.findOneBy({ id });
    if(!role) return null;
    return role;
  };


  private async validateAllCostCenters(ids: number[]): Promise<CostCenter[] | null> {
    const costCenters = [];

    for(const id in ids) {
      const costCenter = await costCenterRepository.findOneBy({ id: Number(id) });
      if(!costCenter) return null

      costCenters.push(costCenter);
    };

    return costCenters;
  };


  public async create(data: IUser): Promise<User> {
    const newUser = new User();

    for (let [key, value] of Object.entries(data)) {
      if (this.isValidInput(key)) {
        (newUser as any)[key] = value;
      };
    };

    await userRepository.save(newUser);
    return newUser;
  };


  public async readAll(): Promise<User[]> {
    const allUsers = await userRepository.find();
    return allUsers;
  };


  public async readById(id: number): Promise<User | null> {
    const user = await userRepository.findOneBy({ id });
    if(!user) return null;

    return user;
  };


  public async updateUserData(id: number, data: IUser): Promise<User | null> {
    const user = await userRepository.findOneBy({ id });
    if(!user) return null;

    for(let [key, newValue] of Object.entries(data)) {
      if(this.isValidInput(key)) {
        (user as any)[key] = newValue;
      };
    };

    await userRepository.save(user);
    return user;
  };


  public async delete(id: number): Promise<boolean> {
    const user = await userRepository.findOneBy({ id });
    if(!user) return false;

    await userRepository.delete({ id });
    return true;
  };


  public async assignRole(userId: number, roleId: number): Promise<User | null> {
    const user = await userRepository.findOneBy({ id: userId });
    if(!user) return null;

    const role = await roleRepository.findOneBy({ id: roleId });
    if(!role) return null;

    user.role = role;
    await userRepository.save(user);
    return user;
  };


  public async removeRole(userId: number): Promise<User | null> {
    const user = await this.validateUser(userId);
    if(!user) return null;

    user.role = null;
    await userRepository.save(user);
    return user;
  };


  public async asignCostCenter(userId: number, costCenterIds: number[]): Promise<User | null> {
    const user = await this.validateUser(userId);
    if(!user) return null;

    const costCenters = await this.validateAllCostCenters(costCenterIds);
    if(!costCenters) return null;

    user.costCenter = [...costCenters]
    await userRepository.save(user);
    return user;
  };


  public async removeCostCenter(userId: number, costCenterIds: number[]): Promise<User | null> {
    const user = await this.validateUser(userId);
    if(!user) return null;

    const costCenters = await this.validateAllCostCenters(costCenterIds);
    if(!costCenters) return null;

    const filteredArray = user.costCenter?.filter((element) => !costCenters.includes(element));

    user.costCenter = filteredArray || null;
    await userRepository.save(user);

    return user;
  };


  public async removeAllCostCenters(userId: number): Promise<User | null> {
    const user = await this.validateUser(userId);
    if(!user) return null;

    user.costCenter = null;
    await userRepository.save(user);
    return user;
  };
};

export default new UserService();
