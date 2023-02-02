import JwtActions from "../../helpers/JwtActions";
import { User } from "../../database/entity/User";
import { AppDataSource } from "../../database/data-source";
import md5 from "md5";
import { IUserJWT } from "../../helpers/JwtActions";
import { CostCenter } from "../../database/entity/CostCenter";

interface ILoginData {
  email: string
  password: string
};

const userRepository = AppDataSource.getRepository(User);

class LoginService {
  private async validateUserExists(email: string, password: string): Promise<User | null> {
    const hashedPass = md5(password);
    const user = await userRepository.findOne({ where: { email, password: hashedPass }, relations: ['role', 'costCenter'] });
    if (!user) return null;
    return user;
  };


  public async login(data: ILoginData): Promise<string | null> {
    const { email, password } = data;
    const user = await this.validateUserExists(email, password);
    if(!user) return null;

    const costCenters = [] as Number[];
    user.costCenter?.forEach((costCenter) => costCenters.push(costCenter.id));

    const userData = {
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role?.role,
        costCenter: costCenters
      }
    };

    const token = JwtActions.generateToken(userData as IUserJWT);
    return token;
  };
};

export default new LoginService();
