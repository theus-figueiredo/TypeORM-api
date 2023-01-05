import LoginService from "../../service/user/LoginService";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import getErrorMessage from "../../helpers/GetErrorMessage";

class LoginController {
  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const { data } = req.body;
      console.log(data);
      const token = await LoginService.login(data);

      if(!token) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid data' });
      return res.status(StatusCodes.OK).json(token);
    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(message);
    };
  };
};

export default new LoginController();
