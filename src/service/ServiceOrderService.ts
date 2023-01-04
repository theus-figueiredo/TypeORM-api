import { ServiceOrder } from "../database/entity/ServiceOrder";
import { AppDataSource } from "../database/data-source";
import { CostCenter } from "../database/entity/CostCenter";
import { ServiceStatus } from "../database/entity/ServiceStatus";
import { ServiceCategory } from "../database/entity/ServiceCategorie";
import DateActions from "../helpers/DateActions";

const OSRepository = AppDataSource.getRepository(ServiceOrder);

interface IServiceOrder {
  id?: number
  identifier: string
  description: string
  requestedAt: string
  exectionValue: number
  chargedValue: number
  comments?: string
  costCenter: number
  status: number
  category: number[]
};

interface IDataToUpdate {
  identifier?: string
  description?: string
  executionValue?: number
  chargedValue?: number
  comments?: number
  requestedAt?: Date
}

class ServiceOrderServ {

  private isValidInput (value: string): value is keyof ServiceOrder {
    return value in ServiceOrder;
  };

  private async validateServiceOrder(id: number): Promise<ServiceOrder | null> {
    const serviceOrder = await OSRepository.findOne({ where: { id }, relations: ['costCenter', 'status', 'category']});
    if(!serviceOrder) return null;
    return serviceOrder;
  }


  private async validateCostCenter(id: number): Promise<null | CostCenter> {
    const CCrepository = AppDataSource.getRepository(CostCenter);
    const costCenter = await CCrepository.findOneBy({ id });

    if(!costCenter) return null;
    return costCenter;
  };


  private async validateCategory(ids: number[]): Promise<null |ServiceCategory[]> {
    const categoryRepository = AppDataSource.getRepository(ServiceCategory);
    const categoryArray = [] as ServiceCategory[];

    for(let index = 0 ; index < ids.length; index += 1) {
      const id = ids[index];
      const category = await categoryRepository.findOneBy({ id });

      if(!category) return null;
      categoryArray.push(category);
    };

    return categoryArray;
  };


  private async validateSingleCategory(id: number): Promise<ServiceCategory | null> {
    const categoryRepository = AppDataSource.getRepository(ServiceCategory);
    const category = await categoryRepository.findOneBy({id});

    if(!category) return null;
    
    return category;
  }


  private async validateStatus(id: number): Promise<null | ServiceStatus> {
    const statusRepository = AppDataSource.getRepository(ServiceStatus);
    const status = await statusRepository.findOneBy({ id });

    if(!status) return null;
    return status;
  };


  private async assignData(serviceOrder: ServiceOrder, data: IDataToUpdate): Promise<ServiceOrder | null> {
    for( let [key, value] of Object.entries(data)) {
      if(this.isValidInput(key))(serviceOrder as any)[key] = value
    };
    return serviceOrder
  };


  public async store(data: IServiceOrder): Promise<ServiceOrder | null> {
    const serviceOrder = new ServiceOrder();

    const categories = await this.validateCategory(data.category);
    const status = await this.validateStatus(data.status);
    const costCenter = await this.validateCostCenter(data.costCenter);

    if (!categories || !status || !costCenter) return null;

    serviceOrder.category = [...categories];
    serviceOrder.status = status;
    serviceOrder.costCenter = costCenter;
    serviceOrder.chargedValue = data.chargedValue;
    if(data.comments) serviceOrder.comments = data.comments;
    serviceOrder.description = data.description;
    serviceOrder.identifier = data.identifier;
    serviceOrder.exectutionValue = data.exectionValue;
    serviceOrder.requestedAt = data.requestedAt;


    serviceOrder.creationDate = DateActions.getDateAsString();
    await OSRepository.save(serviceOrder);
    return serviceOrder;
  };


  public async getAll(): Promise<ServiceOrder[]> {
    const allServiceOrders = await OSRepository.find({ relations: ['costCenter', 'status', 'category']});
    return allServiceOrders;
  };


  public async getById(id: number): Promise<ServiceOrder | null> {
    const serviceOrder = await OSRepository.findOne({ where: { id }, relations: ['costCenter', 'status', 'category']});
    if(!serviceOrder) return null;

    return serviceOrder;
  };


  public async updateGeneralData(id: number, data: IDataToUpdate): Promise<null | ServiceOrder> {
    const serviceOrder = await this.validateServiceOrder(id);
    if(!serviceOrder) return null;

    const updatedData = await this.assignData(serviceOrder, data);
    return updatedData;
  };

  public async updateStatus(id: number, newStatusId: number): Promise<ServiceOrder | null> {
    const serviceOrder = await this.validateServiceOrder(id);
    const newStatus = await this.validateStatus(newStatusId);

    if(!serviceOrder || !newStatus) return null;

    serviceOrder.status = newStatus;
    await OSRepository.save(serviceOrder);
    return serviceOrder;
  };


  public async addNewCategory(id: number, categoryId: number): Promise <ServiceOrder | null> {
    const serviceOrder = await this.validateServiceOrder(id);
    const newCategory = await this.validateSingleCategory(categoryId);

    if(!serviceOrder || !newCategory) return null;

    serviceOrder.category?.push(newCategory);
    await OSRepository.save(serviceOrder);
    return serviceOrder;
  };


  public async removeCategory(id: number, categoryId: number): Promise<ServiceOrder | null> {
    const serviceOrder = await this.validateServiceOrder(id);
    const category = await this.validateSingleCategory(categoryId);

    if(!serviceOrder || !category) return null;

    const index = serviceOrder.category?.indexOf(category);
    if(index) serviceOrder.category?.splice(index, 1);
    await OSRepository.save(serviceOrder);
    return serviceOrder;
  };


  public async updateCostCenter(id: number, costCenterId: number): Promise<ServiceOrder | null> {
    const serviceOrder = await this.validateServiceOrder(id);
    const costCenter = await this.validateCostCenter(costCenterId);

    if(!serviceOrder || !costCenter) return null;

    serviceOrder.costCenter = costCenter;
    await OSRepository.save(serviceOrder);
    return serviceOrder;
  };


  public async delete(id: number): Promise<Boolean> {
    const serviceOrder = await this.validateServiceOrder(id);
    if(!serviceOrder) return false;
    await OSRepository.delete({ id });
    return true;
  };
};

export default new ServiceOrderServ();