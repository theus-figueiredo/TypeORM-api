import { ContractType } from "../database/entity/ContractType";
import { AppDataSource } from "../database/data-source";

const contractTypeRepo = AppDataSource.getRepository(ContractType);

interface ContractTypeDTO {
  type?: ContractType
  found: boolean
};


class ContractTypeService {
  public async addNew(type: string): Promise<ContractType> {
    const newCType = new ContractType();
    newCType.type = type;

    await contractTypeRepo.save(newCType);
    return newCType;
  };


  public async readById(id: number): Promise<ContractTypeDTO> {
    const cType = await contractTypeRepo.findOneBy({ id });

    if(cType) return { type: cType, found: true }
    return { found: false };
  };


  public async readAll(): Promise<ContractType[]> {
    const allContractTypes = await contractTypeRepo.find();
    return allContractTypes;
  };


  public async update(id: number, newType: string): Promise<ContractTypeDTO> {
    const contractTypeToUpdate = await contractTypeRepo.findOneBy({ id });
    
    if(contractTypeToUpdate) {
      contractTypeToUpdate.type = newType;
      await contractTypeRepo.save(contractTypeToUpdate);
      return { type: contractTypeToUpdate, found: true };
    };

    return { found: false };
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
