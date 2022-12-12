import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import RoleService from "../service/RoleService";

class RoleController {
  public async add(req: Request, res: Response): Promise<Response> {
    try {
      const { role } = req.body;

      const newRole = await RoleService.store(role);
      return res.status(StatusCodes.CREATED).json(newRole);
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({Error: err});
    };
  };

  
  public async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const role = await RoleService.read(Number(id));

      if(role.found) return res.status(StatusCodes.OK).json(role.role);
      
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'role not found' });
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ Error: err });
    };
  };

  
  public async getAll(_req: Request, res: Response): Promise<Response> {
    try {
      const allRoles = await RoleService.readAll();

      return res.status(StatusCodes.OK).json(allRoles);
    } catch(err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ Error: err });
    };
  };


  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { role } = req.body;
      const updatedRole = await RoleService.update(Number(id), role);

      if(updatedRole.found) return res.status(StatusCodes.OK).json(updatedRole.role);

      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'role not found' });
    } catch(err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ Error: err });
    };
  };


  public async remove(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const wasDeleted = await RoleService.delete(Number(id));

      if(wasDeleted) return res.status(StatusCodes.OK);
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'role not found' });
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ Error: err });
    };
  };
};


export default new RoleController();
