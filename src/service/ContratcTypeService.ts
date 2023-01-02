import { ContractType } from "../database/entity/ContractType";
import { AppDataSource } from "../database/data-source";

const contractTypeRepo = AppDataSource.getRepository(ContractType);

class ContractTypeService {
  public async addNew(type: string): Promise<ContractType> {
    const newCType = new ContractType();
    newCType.type = type;

    await contractTypeRepo.save(newCType);
    return newCType;
  };


  public async readById(id: number): Promise<ContractType | null> {
    const cType = await contractTypeRepo.findOneBy({ id });

    if(!cType) return null
    return cType
  };


  public async readAll(): Promise<ContractType[]> {
    const allContractTypes = await contractTypeRepo.find();
    return allContractTypes;
  };


  public async update(id: number, newType: string): Promise<ContractType | null> {
    const contractType = await contractTypeRepo.findOneBy({ id });
    
    if(!contractType) return null;

    contractType.type = newType;
    await contractTypeRepo.save(contractType);
    return contractType;
  };


  public async remove(id: number): Promise<Boolean> {
    const cTypeToDelete = await contractTypeRepo.findOneBy({ id });

    if(cTypeToDelete) {
      await contractTypeRepo.delete({ id });
      return true;
    };

    return false;
  };
};

export default new ContractTypeService();
