import ContractService from "../../service/contract/ContractService";
import getErrorMessage from "../../helpers/GetErrorMessage";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

class ContractController {

  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const { data } = req.body;
      const { token } = req.headers;
      
      const newContract = await ContractService.addNew(data, String(token));
      if(!newContract.contract) return res.status(StatusCodes.BAD_REQUEST).json({ message: newContract.message});

      return res.status(StatusCodes.OK).json(newContract.contract);
  
    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json({ Error: message });
    };
  };


  public async getAll(_req: Request, res: Response): Promise<Response> {
    try {
      const allContracts = await ContractService.readAll();
      return res.status(StatusCodes.OK).json(allContracts);

    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json({ Error: message });
    };
  };


  public async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const contract = await ContractService.readById(Number(id));

      if(!contract.contract) return res.status(StatusCodes.BAD_REQUEST).json({ message: contract.message });

      return res.status(StatusCodes.OK).json(contract.contract);
    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json({ Error: message });
    };
  };


  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { data } = req.body;
      const token = req.header;

      const contract = await ContractService.updateGeneralData(Number(id), data, String(token));
      if(!contract.contract) return res.status(StatusCodes.BAD_REQUEST).json({ message: contract.message });
      
      return res.status(StatusCodes.OK).json(contract.contract);

    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json({ Error: message });
    };
  };


  public async assignType(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { typeId } = req.body;
      const token = req.header

      const updatedContract = await ContractService.assignContractType(Number(id), Number(typeId), String(token));
      
      if(!updatedContract) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'not found' });

      return res.status(StatusCodes.OK).json(updatedContract);

    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json({ Error: message });
    };
  };


  public async removeType(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const token = req.header;
      
      const updatedContract = await ContractService.removeContractType(Number(id), String(token));
      if(!updatedContract) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'notfound' });
      
      return res.status(StatusCodes.OK).json(updatedContract);

    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json({ Error: message });
    };
  };


  public async remove(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const token = req.header;

      const deleted = await ContractService.deleteContract(Number(id), String(token));

      if(!deleted) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'not found' });

      return res.status(StatusCodes.OK).json({ message: 'deleted' });

    } catch (error) {
      const message = getErrorMessage(error);
      return res.status(StatusCodes.BAD_REQUEST).json({ Error: message });
    };
  };
};

export default new ContractController;
