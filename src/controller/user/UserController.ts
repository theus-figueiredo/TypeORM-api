import UserService from "../../service/user/UserService";
import getErrorMessage from "../../helpers/GetErrorMessage";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";


class UserController {

  private notFound(res: Response): Response {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Not found' });
  };


  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const { data } = req.body;
      const newUser = await UserService.create(data);

      return res.status(StatusCodes.CREATED).json(newUser);

    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json({ Error: message });
    };
  };


  public async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const user = await UserService.readById(Number(id));

      if(!user) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Not found' });

      return res.status(StatusCodes.OK).json(user);

    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json({ Error: message });
    };
  };


  public async getAll(_req: Request, res: Response): Promise<Response> {
    try {
      const allUsers = await UserService.readAll();

      return res.status(StatusCodes.OK).json(allUsers);

    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json({ Error: message });
    };
  };


  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { data } = req.body;

      const updatedUser = await UserService.updateUserData(Number(id), data);
      if(!updatedUser) return this.notFound(res);

      return res.status(StatusCodes.OK).json(updatedUser);

    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json({ Error: message });
    };
  };


  public async assignRole(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { role } = req.body;

      const updatedUser = await UserService.assignRole(Number(id), role);
      if(!updatedUser) return this.notFound(res);

      return res.status(StatusCodes.OK).json(updatedUser);

    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json({ Error: message });
    };
  };


  public async removeRole(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const updatedUser = await UserService.removeRole(Number(id));
      if(!updatedUser) return this.notFound(res);

      return res.status(StatusCodes.OK).json(updatedUser);

    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json({ Error: message });
    };
  };


  public async addCostCenter(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { costCenters } = req.body;

      const updatedUser = await UserService.asignCostCenter(Number(id), costCenters);
      if(!updatedUser) return this.notFound(res);

      return res.status(StatusCodes.OK).json(updatedUser);

    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json({ Error: message });
    };
  };


  public async removeCostCenter(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { ids } = req.body;

      const updatedUser = await UserService.removeCostCenter(Number(id), ids);
      if(!updatedUser) return this.notFound(res);

      return res.status(StatusCodes.OK).json(updatedUser);

    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json({ Error: message });;
    };
  };


  public async removeAllCostCenters(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const updatedUser = await UserService.removeAllCostCenters(Number(id));
      if(!updatedUser) return this.notFound(res);

      return res.status(StatusCodes.OK).json(updatedUser);

    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json({ Error: message });
    };
  };


  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const deleted = await UserService.delete(Number(id));
      if(!deleted) return this.notFound(res);

      return res.status(StatusCodes.OK).json({ message: 'deleted' });

    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json({ Error: message });
    };
  };
}

export default new UserController();
