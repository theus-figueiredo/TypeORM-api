import CostCenterService from "../../service/customer/CostCenterService";
import getErrorMessage from "../../helpers/GetErrorMessage";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";


class CostCenterController {


  public trhowNotFound(res: Response): Response {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Not Found'});
  };
  

  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const { data } = req.body;
      const newCostCenter = await CostCenterService.create(data);

      return res.status(StatusCodes.CREATED).json(newCostCenter);
    } catch (error) {
      const message = getErrorMessage(error)
      return res.status(StatusCodes.BAD_REQUEST).json({ Error: message });
    };
  };


  public async getAll(_req: Request, res: Response): Promise<Response> {
    try {
      const allCostCenters = await CostCenterService.readAll();
      return res.status(StatusCodes.OK).json(allCostCenters);
    } catch(error) {
      const message = getErrorMessage(error)
      return res.status(StatusCodes.BAD_REQUEST).json({ Error: message });
    };
  };


  public async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const costCenter = await CostCenterService.readById(Number(id));

      if(!costCenter) return this.trhowNotFound(res);

      return res.status(StatusCodes.OK).json(costCenter);
    } catch (error) {
      const message = getErrorMessage(error)
      return res.status(StatusCodes.BAD_REQUEST).json({ Error: message });
    };
  };


  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { data } = req.body;
      const { id } = req.params;
  
      const updatedCostCenter = await CostCenterService.updateData(Number(id), data);
      if(!updatedCostCenter) return this.trhowNotFound(res);

      return res.status(StatusCodes.OK).json(updatedCostCenter);

    } catch (error) {
      const message = getErrorMessage(error)
      return res.status(StatusCodes.BAD_REQUEST).json({ Error: message });
    };
  };


  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const delted = await CostCenterService.delete(Number(id));
      if(!delted) return this.trhowNotFound(res);

      return res.status(StatusCodes.OK).json({ message: 'deleted' });
    } catch (error) {
      const message = getErrorMessage(error)
      return res.status(StatusCodes.BAD_REQUEST).json({ Error: message });
    }
  }
};

export default new CostCenterController();
