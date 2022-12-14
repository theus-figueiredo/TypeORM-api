import ContractService from "../service/ContractService";
import { Request, Response } from "express";

class ContractController {
  public async updateContract(req: Request, res: Response): Promise<Response> {
    const { data } = req.body;
    const { id } = req.params;

    const updatedContract = await ContractService.updateGeneralData(Number(id), data);
    return res.status(200).json(updatedContract);
  };
};

export default new ContractController;
