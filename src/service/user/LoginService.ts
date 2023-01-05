import JwtActions from "../../helpers/JwtActions";
import { User } from "../../database/entity/User";
import { AppDataSource } from "../../database/data-source";
import md5 from "md5";
import { IUserJWT } from "../../helpers/JwtActions";

interface ILoginData {
  email: string
  password: string
};

const userRepository = AppDataSource.getRepository(User);

class LoginService {
  private async validateUserExists(email: string, password: string): Promise<User | null> {
    const hashedPass = md5(password);
    const user = await userRepository.findOne({ where: { email, password: hashedPass } });
    if (!user) return null;
    return user;
  };


  public async login(data: ILoginData): Promise<string | null> {
    const user = await this.validateUserExists(data.email, data.password);
    if(!user) return null;

    const userData = {
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role?.role
      }
    };

    const token = JwtActions.generateToken(userData as IUserJWT);
    return token;
  };
};

export default new LoginService();
