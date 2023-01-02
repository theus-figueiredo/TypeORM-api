import ContratcTypeService from "../service/ContratcTypeService";
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

class ContractTypeController {

  private throwError(res: Response, error: unknown): Response {
    let message;
    if(error instanceof Error) message = error.message;
    else message = String(message);

    return res.status(StatusCodes.BAD_REQUEST).json({ message });
  };


  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const { type } = req.body;

      const newContractType = await ContratcTypeService.addNew(type);
      return res.status(StatusCodes.CREATED).json(newContractType);
    } catch (error) {
      return this.throwError(res, error);
    };
  };


  public async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const contractType = await ContratcTypeService.readById(Number(id));

      if(!contractType) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Not found' });
      };

      return res.status(StatusCodes.OK).json(contractType);

    } catch (error) {
      return this.throwError(res, error);
    }
  };

  
  public async getAll(_req: Request, res: Response): Promise<Response> {
    try {
      const allContractTypes = await ContratcTypeService.readAll();

      return res.status(StatusCodes.OK).json(allContractTypes);
    } catch (error) {
      return this.throwError(res, error);
    };
  };

  
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { type } = req.body;
      const updatedContractType = await ContratcTypeService.update(Number(id), type);

      if(!updatedContractType) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'not found'});
      return res.status(StatusCodes.OK).json(updatedContractType);

    } catch (error) {
      return this.throwError(res, error);
    };
  };


  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const deleted = await ContratcTypeService.remove(Number(id));

      if(deleted) return res.status(StatusCodes.OK).json({ message: 'deleted' });

      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'not found' });
    } catch (error) {
      return this.throwError(res, error);
    };
  };
};

export default new ContractTypeController();
