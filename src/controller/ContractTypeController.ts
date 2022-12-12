import ContratcTypeService from "../service/ContratcTypeService";
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

class ContractTypeController {
  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const { type } = req.body;

      const newContractType = await ContratcTypeService.addNew(type);
      return res.status(StatusCodes.CREATED).json(newContractType);
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ Error: err });
    };
  };


  public async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const contractType = await ContratcTypeService.readById(Number(id));

      if(contractType.found) {
        return res.status(StatusCodes.OK).json(contractType.type);
      };

      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'not found'});
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ Error: err });
    }
  };

  
  public async getAll(_req: Request, res: Response): Promise<Response> {
    try {
      const allContractTypes = await ContratcTypeService.readAll();

      return res.status(StatusCodes.OK).json(allContractTypes);
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ Error: err });
    };
  };

  
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { type } = req.body;
      const updatedContractType = await ContratcTypeService.update(Number(id), type);

      if(updatedContractType.found) return res.status(StatusCodes.OK).json(updatedContractType.type);

      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'not found'});

    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ Error: err });
    };
  };


  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const deleted = await ContratcTypeService.remove(Number(id));

      if(deleted) return res.status(StatusCodes.OK).json({ message: 'deleted' });

      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'not found' });
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ Error: err });
    };
  };
};

export default new ContractTypeController();
