import ContractService from "../service/ContractService";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

class ContractController {
  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const { data } = req.body;
      
      const newContract = await ContractService.addNew(data);
      if(!newContract.contract) return res.status(StatusCodes.BAD_REQUEST).json({ message: newContract.message});

      return res.status(StatusCodes.OK).json(newContract.contract);
  
    } catch (error) {
      let message;
      if(error instanceof Error) message = error.message;
      else message = String(error);

      return res.status(StatusCodes.BAD_REQUEST).json({ message });
    };
  };


  public async getAll(_req: Request, res: Response): Promise<Response>
  {
    try {
      const allContracts = await ContractService.readAll();
      return res.status(StatusCodes.OK).json(allContracts);

    } catch (error) {
      let message;
      if(error instanceof Error) message = error.message;
      else message = String(error);

      return res.status(StatusCodes.BAD_REQUEST).json({ message });
    };
  };


  public async getById(req: Request, res: Response): Promise<Response>
  {
    try 
    {
      const { id } = req.params;
      const contract = await ContractService.readById(Number(id));

      if(!contract.contract) return res.status(StatusCodes.BAD_REQUEST).json({ message: contract.message });

      return res.status(StatusCodes.OK).json(contract.contract);
    } catch (error) {
      let message;
      if(error instanceof Error) message = error.message;
      else message = String(error);

      return res.status(StatusCodes.BAD_REQUEST).json({ message });
    };
  };


  public async update(req: Request, res: Response): Promise<Response>
  {
    try
    {
      const { id } = req.params;
      const { data } = req.body;

      const contract = await ContractService.updateGeneralData(Number(id), data);
      if(!contract.contract) return res.status(StatusCodes.BAD_REQUEST).json({ message: contract.message });
      
      return res.status(StatusCodes.OK).json(contract.contract);

    } catch (error) {
      let message;
      if(error instanceof Error) message = error.message;
      else message = String(error);

      return res.status(StatusCodes.BAD_REQUEST).json({ message });
    };
  };


  public async assignType(req: Request, res: Response): Promise<Response>
  {
    try {
      const { id } = req.params;
      const { typeId } = req.body;

      const updatedContract = await ContractService.assignContractType(Number(id), Number(typeId));
      
      if(!updatedContract) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'not found' });

      return res.status(StatusCodes.OK).json(updatedContract);

    } catch (error) {
      let message;
      if(error instanceof Error) message = error.message;
      else message = String(error);

      return res.status(StatusCodes.BAD_REQUEST).json({ message });
    };
  };


  public async removeType(req: Request, res: Response): Promise<Response>
  {
    try {
      const { id } = req.params
      
      const updatedContract = await ContractService.removeContract(Number(id));
      if(!updatedContract) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'notfound' });
      
      return res.status(StatusCodes.OK).json(updatedContract);

    } catch (error) {
      let message;
      if(error instanceof Error) message = error.message;
      else message = String(error);

      return res.status(StatusCodes.BAD_REQUEST).json({ message });
    };
  };


  public async remove(req: Request, res: Response): Promise<Response>
  {
    try {
      const { id } = req.params;
      const deleted = await ContractService.deleteContract(Number(id));

      if(!deleted) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'not found' });

      return res.status(StatusCodes.OK).json({ message: 'deleted' });

    } catch (error) {
      let message;
      if(error instanceof Error) message = error.message;
      else message = String(error);

      return res.status(StatusCodes.BAD_REQUEST).json({ message })
    };
  };
};

export default new ContractController;
