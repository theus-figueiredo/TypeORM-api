import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export interface IUserJWT {
  data: {
    id: number
    firstName: string
    lastName: string
    email: string
    role: string
  }
}

class JwtActions {
  public generateToken(user: IUserJWT): string {
    const secretKey = String(process.env.JWT_SECRET);
    const token = jwt.sign(user, secretKey, { algorithm: 'HS256', expiresIn: '7d'});
    console.log(token);
    return token;
  };

  public authenticateUser(token: string): IUserJWT {
    const secretKey = String(process.env.JWT_SECRET);
    const user  = jwt.verify(token, secretKey);
    return user as IUserJWT;
  }
};

export default new JwtActions();
