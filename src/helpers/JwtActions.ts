import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

// interface IUserJWT {
//   user:{
//     id?: number
//     firstName: string
//     lastName: string
//     email: string


//   }
// }

// class JwtActions {
//   public generateToken(user: object): string {
//     const secretKey = String(process.env.JWT_SECRET);
//     const token = jwt.sign(user, secretKey, { algorithm: 'HS256', expiresIn: '5m'});
//     return token;
//   };

//   public authenticateUser(token: string): IUserJWT
// };

// export default new JwtActions();
