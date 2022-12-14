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
  contractTypeId: number
  customerId: number
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
};

class ContractService {

  private isValidInput(value: string): value is keyof Contract {
    return value in Contract;
  };

  public async addNew(data: IContract): Promise<IContractDTO> {
    const contractType = await contractTypeRopository.findOneBy({ id: data.contractTypeId });
    const customer = await customerRepository.findOneBy({ id: data.customerId });
    
    if(!contractType) return { couldExecute: false, message: 'invalid contract type' };
    if(!customer) return { couldExecute: false, message: 'invalid customer data' };

    const newContract = new Contract();
    newContract.status = data.status;
    newContract.startDate = data.startDate;
    newContract.expectedEndDate = data.expectedEndDate;
    newContract.budget = data.budget;
    newContract.customer = customer;
    newContract.contractType = contractType;
    newContract.description = data.description;

    if(data.endDate) newContract.endDate = data.endDate;

    await contractRepository.save(newContract);
    return { couldExecute: true, contract: newContract };
  };


  public async readAll(): Promise <Contract[]> {
    const allContracts = await contractRepository.find();
    return allContracts;
  };

  
  public async readById(id: number): Promise<IContractDTO> {
    const contract = await contractRepository.findOneBy({ id });
    
    if(!contract) return { couldExecute: false, message: 'not found' };

    return { contract, couldExecute: true };
  };


  ///Refatorar para remover o as any!!!!!!!
  public async updateGeneralData(id: number, data: IContractUpdate): Promise<IContractDTO> {
    const contract = await contractRepository.findOneBy({ id });
    if(!contract) return { couldExecute: false, message: 'contract not found' };

    for(const [key, newValue] of Object.entries(data)) {
      if(this.isValidInput(key)) {
        (contract as any)[key] = newValue;
      }
    };

    await contractRepository.save(contract);
    return { couldExecute: true, contract};
  };
};

export default new ContractService();
