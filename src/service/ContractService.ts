import { Contract } from "../database/entity/Contract";
import { ContractType } from "../database/entity/ContractType";
import { AppDataSource } from "../database/data-source";
import { Customer } from "../database/entity/Customer";

const contractRepository = AppDataSource.getRepository(Contract);
const customerRepository = AppDataSource.getRepository(Customer);
const contractTypeRopository = AppDataSource.getRepository(ContractType);

interface IContract {
  id?: number
  status: string
  startDate: Date
  budget: number
  endDate?: Date
  description: string
  expectedEndDate: Date
  contractType: number
  customer: number
};

interface IContractDTO {
  contract?: Contract
  couldExecute: boolean
  message?: string
}


interface IContractUpdate {
  status?: string
  startDate?: Date
  budget?: number
  endDate?: Date
  expectedEndDate?: Date
  description?: string
  contractType?: number
  customer?: number
};


class ContractService {

  private async validateContract(id: number): Promise<Contract | null>
  {
    const contract = await contractRepository.findOne({ where: { id }, relations: ['contractType'] });
    if (!contract) return null;
    return contract;
  };


  private isValidInput(value: string): value is keyof Contract {
    return value in Contract;
  };

  private async validateContractType(id: number): Promise<ContractType | null>
  {
    const contractType = await contractTypeRopository.findOneBy({ id });
    if(!contractType) return null;
    return contractType;
  };


  public async addNew(data: IContract): Promise<IContractDTO> {
    let contractType;
  
    if (data.contractType || data.customer) {
      contractType = await contractTypeRopository.findOneBy({ id: data.contractType });

      if(!contractType) return { couldExecute: false, message: 'invalid contract type' };
    };

    const newContract = new Contract();
    newContract.status = data.status;
    newContract.startDate = data.startDate || new Date();
    newContract.expectedEndDate = data.expectedEndDate || new Date();
    newContract.budget = data.budget;
    newContract.contractType = contractType || null;
    newContract.description = data.description;

    if(data.endDate) newContract.endDate = data.endDate;

    await contractRepository.save(newContract);
    return { couldExecute: true, contract: newContract };
  };


  public async readAll(): Promise <Contract[]> {
    const allContracts = await contractRepository.find({ relations: ['contractType']});
    return allContracts;
  };

  
  public async readById(id: number): Promise<IContractDTO> {
    const contract = await contractRepository.findOne({ where: { id }, relations:['contractType'] });
    
    if(!contract) return { couldExecute: false, message: 'not found' };

    return { contract, couldExecute: true };
  };


  public async updateGeneralData(id: number, data: IContractUpdate): Promise<IContractDTO> {
    const contract = await contractRepository.findOne({ where: { id }, relations:['contractType'] });
    if(!contract) return { couldExecute: false, message: 'contract not found' };

    for(const [key, newValue] of Object.entries(data)) {
      if(this.isValidInput(key)) (contract as any)[key] = newValue;
    };

    await contractRepository.save(contract);
    return { couldExecute: true, contract};
  };


  public async assignContractType(id: number, typeId: number): Promise<Contract | null>
  {
    const contract = await this.validateContract(id);
    if(!contract) return null;

    const newContractType = await this.validateContractType(typeId);
    if(!newContractType) return null;
    
    contract.contractType = newContractType
    await contractRepository.save(contract);
    return contract;
  };


  public async removeContract(id: number): Promise <Contract | null>
  {
    const contract = await this.validateContract(id);
    if(!contract) return null;

    contract.contractType = null;

    await contractRepository.save(contract);
    return contract;
  };


  public async deleteContract(id: number): Promise<boolean>
  {
    const contract = await this.validateContract(id);
    if(!contract) return false;

    await contractRepository.delete({ id });
    return true;
  };
};

export default new ContractService();
