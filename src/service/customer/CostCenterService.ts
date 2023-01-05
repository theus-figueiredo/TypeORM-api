import { CostCenter } from "../../database/entity/CostCenter";
import { AppDataSource } from "../../database/data-source";
import UserService from "../user/UserService";

const costCenterRepository = AppDataSource.getRepository(CostCenter);

interface ICostCenterUpdate {
  name?: string
  monthlyBudget?: number
};

interface ICostCenter {
  name: string,
  monthlyBudget: number
};


class CostCenterService {

  private isValidInput(value: string): value is keyof CostCenter {
    return value in CostCenter;
  };

  private validatePermission(token: string): Boolean {
    const canProceed = UserService.validateRolePermission(token, 'admin');
    return canProceed;
  }

  public async create(data: ICostCenter, token: string): Promise<CostCenter | null> {
    const canProceed = this.validatePermission(token);
    if(!canProceed) return null;

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


  public async updateData(id: number, data: ICostCenterUpdate, token: string): Promise<CostCenter | null> {
    const canProceed = this.validatePermission(token);
    if(!canProceed) return null;

    const costCenter = await costCenterRepository.findOneBy({ id });
    if(!costCenter) return null;

    for(const[key, value] of Object.entries(data)) {
      if(this.isValidInput(key)) (costCenter as any)[key] = value
    };

    await costCenterRepository.save(costCenter);
    return costCenter;
  };


  public async delete(id: number, token: string): Promise<boolean> {
    const canProceed = this.validatePermission(token);
    if(!canProceed) return false;

    const costCenter = await costCenterRepository.findOneBy({ id });
    if(!costCenter) return false;

    await costCenterRepository.delete({ id });
    return true;
  };
};

export default new CostCenterService();
