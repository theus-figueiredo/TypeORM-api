import { CostCenter } from "../database/entity/CostCenter";
import { AppDataSource } from "../database/data-source";

const costCenterRepository = AppDataSource.getRepository(CostCenter);

interface ICostCenterUpdate {
  name?: string
  monthlyBudget?: number
};

interface ICostCenter {
  name: string,
  monthlyBudget: number
}


class CostCenterService {

  private isValidInput(value: string): value is keyof CostCenter {
    return value in CostCenter;
  };

  public async create(data: ICostCenter): Promise<CostCenter> {
    const newCostCenter = new CostCenter();

    newCostCenter.name = data.name;
    newCostCenter.monthlyBudget = data.monthlyBudget;

    await costCenterRepository.save(newCostCenter);
    return newCostCenter;
  };


  public async readAll(): Promise<CostCenter[]> {
    const allCostCenters = await costCenterRepository.find({ relations: ['user'] });
    return allCostCenters;
  };


  public async readById(id: number): Promise<CostCenter | boolean> {
    const costCenter = await costCenterRepository.findOne({ where: { id }, relations: ['user'] });
    if (!costCenter) return false;

    return costCenter;
  };


  public async updateData(id: number, data: ICostCenterUpdate): Promise<CostCenter | boolean> {
    const costCenter = await costCenterRepository.findOneBy({ id });
    if(!costCenter) return false;

    for(const[key, value] of Object.entries(data)) {
      if(this.isValidInput(key)) (costCenter as any)[key] = value
    };

    await costCenterRepository.save(costCenter);
    return costCenter;
  };


  public async delete(id: number): Promise<boolean> {
    const costCenter = await costCenterRepository.findOneBy({ id });
    if(!costCenter) return false;

    await costCenterRepository.delete({ id });
    return true;
  };
};

export default new CostCenterService();
